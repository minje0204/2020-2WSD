const express = require('express');
const router = express.Router();
const Stock = require('../../models/stock');
const User = require('../../models/user');

router.post('/create',function(req,res) {
    console.log(req.body);
    let cash,profit,profitPct=0; //잔고,수익,수익%
    Stock.findOne({userid:req.body.userid}).then((stock)=> {
        if (!stock) {
            const stock = new Stock({
                userid: req.body.userid,
                stocklist: [{stockname: req.body.buyname, stocknum: req.body.buynum, stockprice: req.body.buyprice}],
            });
            stock.save((err) => {
            });
            res.send({msg:'갱신완료'});
        } else {  //이미 주식 리스트가 있는경우

            stock.stocklist.forEach(function (stock1, idx, list) {
                    if (stock1.stockname == req.body.buyname) {
                        let orgSTprice, orgSTum, buySTprice, buySTnum;
                        orgSTprice = stock.stocklist[idx].stockprice;
                        orgSTum =  stock.stocklist[idx].stocknum;
                        buySTprice = req.body.buyprice;
                        buySTnum = req.body.buynum;
                        stock.stocklist[idx].stockprice = ((orgSTprice * orgSTum) + (buySTnum * buySTprice)) / (orgSTum + buySTnum)  //매수후 평단계산
                        stock.stocklist[idx].stocknum += req.body.buynum;
                    }
                    if (stock1.stockname == req.body.sellname) {
                        profit = (req.body.sellprice - stock.stocklist[idx].stockprice) * req.body.sellnum;
                        profitPct = (profit / (stock.stocklist[idx].stockprice * req.body.sellnum)) * 100;    //수익 % 계산
                       let orgSTprice, orgSTum, sellSTprice, sellSTnum;
                        orgSTprice = stock.stocklist[idx].stockprice;
                        orgSTum = stock.stocklist[idx].stocknum;
                        sellSTprice = req.body.sellprice;
                        sellSTnum = req.body.sellnum;

                        if (orgSTum == sellSTnum) {  //남아있는 주식 수를 모두 매도했을때 그 종목 제거
                            stock.stocklist[idx].remove();
                            if(!stock.stocklist.length)Stock.deleteOne({userid:req.body.userid},function(err){if(err)throw err;});
                        }
                        else {
                        //    stock.stocklist[idx].stockprice = ((orgSTprice * orgSTum) - (sellSTnum * sellSTprice)) / (orgSTum - sellSTnum) //매도후 평단 계산
                            stock.stocklist[idx].stocknum -= req.body.sellnum;
                        }

                    }
                }
            )
            stock.save((err) => {
            });
            res.json({profit:profit});
        }

    })

        User.findOne({userid:req.body.userid}).then((user)=> {
            if (profit > 0) user.profit.push(profitPct);
            cash = user.cash;
            cash -= (req.body.sellnum * req.body.sellprice);
            user.cash = cash;
            user.save()
        })
});

router.get('/read/@:id', function (req, res, next) {
    Stock.findOne({userid:req.params.id}, (err, stock) => {
        if(!stock){return res.json({success:false})}
        User.findOne({userid:req.params.id}, (err, user) => {
        res.json({ success:true,stocklist: stock.stocklist,profit:user.profit });
        }
    );
    });
});

module.exports = router;

