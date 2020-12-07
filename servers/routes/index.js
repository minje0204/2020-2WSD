const express = require('express');
const router = express.Router();
const User = require('../../models/user');
router.get('/', (req, res)=>res.send(`success`));
router.post('/register',function(req,res) {
    const user = new User({
        userid: req.body.user.userid,
        password: req.body.user.password
    });
    user.save((err) => {
        res.redirect('http://localhost:3000');
    });
});
module.exports = router;