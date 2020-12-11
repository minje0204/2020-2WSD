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



module.exports = router;