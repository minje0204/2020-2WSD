const express = require('express');
const router = express.Router();
const Stock = require('../../models/stock');
const User = require('../../models/user');

router.post('/create',function(req,res) {
    console.log(req.body);
    let cash,profit=0,profitPct=0; //잔고,수익,수익%
    let newcash=-1;
    let q=0;
    let d=1;
    User.findOne({userid:req.body.userid}).then((user1)=> {
        if(req.body.cash){ //예수금 추가
        newcash+=(req.body.cash+user1.cash+1);console.log(`a:${newcash}`);}
        if(!req.body.cash&&user1.cash-(req.body.buyprice*req.body.buynum)<0){
            d=0;
            return res.json({msg:`돈이 부족합니다.`,cash:user1.cash})
        }

    if(d){
            Stock.findOne({userid:req.body.userid}).then((stock)=> {
        if (!stock) {
            const stock = new Stock({
                userid: req.body.userid,
                stocklist: [{stockname: req.body.buyname, stocknum: req.body.buynum, stockprice: req.body.buyprice}],
            });
            stock.save((err) => {
            });

        }else if(!stock.stocklist.length){
            console.log(stock.sotcklist);
            stock.stocklist=[{stockname: req.body.buyname, stocknum: req.body.buynum, stockprice: req.body.buyprice}];
            stock.save();
        }
        else if(!req.body.cash){  //이미 주식 리스트가 있는경우
            console.log("c");
            stock.stocklist.forEach(function (stock1, idx, list) {
                    if (stock1.stockname == req.body.buyname) {
                        q=1;
                        let orgSTprice, orgSTum, buySTprice, buySTnum;
                        orgSTprice = stock.stocklist[idx].stockprice;
                        orgSTum =  stock.stocklist[idx].stocknum;
                        buySTprice = req.body.buyprice;
                        buySTnum = req.body.buynum;
                        stock.stocklist[idx].stockprice = ((orgSTprice * orgSTum) + (buySTnum * buySTprice)) / (orgSTum + buySTnum)  //매수후 평단계산
                        stock.stocklist[idx].stocknum += req.body.buynum;
                    }
                    if (stock1.stockname == req.body.sellname) {
                        q=1;
                        profit = (req.body.sellprice - stock.stocklist[idx].stockprice) * req.body.sellnum;
                        profit=profit.toPrecision(3)
                        profitPct = (profit / (stock.stocklist[idx].stockprice * req.body.sellnum)) * 100;    //수익 % 계산
                       let orgSTprice, orgSTum, sellSTprice, sellSTnum;
                        orgSTprice = stock.stocklist[idx].stockprice;
                        orgSTum = stock.stocklist[idx].stocknum;
                        sellSTprice = req.body.sellprice;
                        sellSTnum = req.body.sellnum;

                        if (orgSTum == sellSTnum) {  //남아있는 주식 수를 모두 매도했을때 그 종목 제거
                            console.log(stock.stocklist[idx]);
                            stock.stocklist[idx].remove();
                            //if(!stock.stocklist.length)Stock.deleteOne({userid:req.body.userid},function(err){if(err)throw err;});
                        }
                        else {
                        //    stock.stocklist[idx].stockprice = ((orgSTprice * orgSTum) - (sellSTnum * sellSTprice)) / (orgSTum - sellSTnum) //매도후 평단 계산
                            stock.stocklist[idx].stocknum -= req.body.sellnum;
                        }
                    }
                }
            )
            if(!q)stock.stocklist.push({stockname: req.body.buyname, stocknum: req.body.buynum, stockprice: req.body.buyprice});
            stock.save((err) => {
            });

        }

    })
    console.log(`b:${newcash}`);
        User.findOne({userid:req.body.userid}).then((user)=> {
            if(profit===0){}
            else user.profit.push(profitPct);

            if(newcash>0){
            cash = newcash;}
            else cash=user.cash;
            console.log(`before:${cash}`);
            cash -= (req.body.buynum * req.body.buyprice);
            cash += (req.body.sellnum * req.body.sellprice);

            console.log(`after:${cash}`);
            user.cash = cash;
            console.log(`save:${cash}`);

            user.save();
            res.json({profit:profit,msg:'처리완료',cash:cash});
        })
    }
    })
});

router.get('/read/@:id', function (req, res, next) {
    Stock.findOne({userid:req.params.id}, (err, stock) => {

        User.findOne({userid:req.params.id}, (err, user) => {
            if(!stock){return res.json({success:false,cash:user.cash})}
            res.json({ success:true,stocklist: stock.stocklist,profit:user.profit,cash:user.cash });
        }
    );
    });
});

module.exports = router;

