const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Stock = require('../../models/stock');
const bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
router.post('/register',function(req,res) {
    hasher({password: req.body.password}, (err, pass, salt, hash) => {
        const user = new User({
            userid: req.body.userid,
            password: hash,
            salt: salt,
            cash:req.body.cash,
        });
        user.save((err) => {
            if (err) {
                res.send(err)
            } else {
                res.json({success: true, msg: `회원가입 완료!`})
            }
        });
    });
});
router.post('/checkid',function(req,res) {
    User.findOne({userid:req.body.userid},function(err,data)
    {
        if(err){res.send(err);}
        else{
            if(data.length!=0){
                return res.json({success:false,msg:`중복된 ID입니다`});
            }
            else{
                return res.json({success:true,msg:`사용할 수 있는 ID입니다.`});
            }
        }
    })
});

router.post('/login', function(req, res){

    User.findOne({userid : req.body.userid}, function(err, user){
        if(err)throw err;
        if(!user)return res.json({success:false,msg:`ID를 확인해주십시오.`});

        hasher({password: req.body.password,salt:user.salt}, (err, pass, salt, hash) => {
        if (hash===user.password)
            {
                req.session.userid = user.userid;
                req.session.islogin = true;
                console.log(req.session);
                req.session.save(() => {
                    res.json({success: true, user:req.session.userid,msg: `${req.session.userid}님 환영합니다!`});
                })
            }
        else return res.json({success:false,msg:`잘못된 비밀번호입니다.`});
        });
    })
})

router.post('/logout', function(req, res){
    User.findOne({userid : req.body.userid}, function(err, user){
        if(err)  return res.send(err)
        if(!user) return res.send('해당하는 ID가 없습니다.')
        else {
            req.session.destroy(); // /login에서 만들어진 SessionID를 DB와 쿠키에서 삭제
            res.send('로그아웃 되었습니다. 세션을 확인하세요')
        }
    })
})
router.get('/read', function (req, res, next) {
    User.find({}, (err, userlist) => {
            res.json({userlist: userlist});
    })

});
module.exports = router;

