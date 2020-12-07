const express = require('express');
const router = express.Router();
const User = require('../../models/user');
router.post('/register',function(req,res) {
    if(req.body.userid.length < 1) {
        return res.json('ID를 입력하세요'
        );
    }
    if(req.body.password.length < 1) {
        return res.json('비밀번호를 입력하세요'
        );
    }
    const user = new User({
        userid: req.body.userid,
        password: req.body.password
    });
    user.save((err) => {
        if(err){
            res.send(err)
        }
        else{
            res.json(`success`)
        }
    });
});
router.post('/checkid',function(req,res) {
    User.find({userid:req.body.userid},function(err,data)
    {
        if(err){res.send(err);}
        else{
            if(data.length!=0){
                return res.json(`중복된 ID입니다.`);
            }
            else{
                return res.json(`사용가능한 ID입니다.`);
            }
        }
    })
});
module.exports = router;

