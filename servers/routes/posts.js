const express = require('express');
const router = express.Router();
const Stock = require('../../models/stock');

router.get('/', function(req, res){
    Stock.find({}).then((stocks) => {
        res.json({ stocks: stocks });
    }).catch((err) => {
        console.log(err);
    });
});
router.post('/comment/@:id', function(req, res){
   Stock.findOne({userid:req.params.id}).then((stock)=> {
        console.log(req.body);
        stock.commentlist.push({
            comment: req.body.comment,
            date: `${req.body.year}-${req.body.month+1}-${req.body.date}`,
            writer: req.body.writer
        })
        stock.save((err) => {
            });
            res.send({msg:'추가완료'});
        })
});
router.get('/comment/read/@:id', function(req, res){
    Stock.findOne({userid:req.params.id}).then((stock)=> {
        res.json({commentlist:stock.commentlist,msg:'갱신완료'});
    })
});
module.exports = router;