const express = require('express');
const router = express.Router();
const User = require('../../models/user');
router.get('/', function(req, res){
    console.log('a');
    res.send(`success`)
});

module.exports = router;