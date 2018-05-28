var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();
var sql=require('../libs/sql')


//判断登录
router.post('/', function(req, res) {
    let user=req.body.user;
    let pass=req.body.pass;
    let code=req.body.code;

    if (code.toUpperCase() != req.session.code.toUpperCase()) {
        res.send("验证码不正确!")
        return;
    }
    sql(`select * from admin where name="${user}"`,function (err,data) {
        if (data.length == 0) {
            res.send("账号不正确!");
            return;
        } else {
            if (data[0].pass != pass) {
                res.send("密码不正确!")
                return;
            } else {
                req.session.login = "yes";
                res.send("ok")
            }
        }
    })
});
//验证码
router.get('/captcha', function (req, res) {
    var code = svgCaptcha.createMathExpr({
        // size: 4,
        ignoreChars: '0o1li',
        noise: 1,
        color: true,
        background: '#77a7bf'
    });
    req.session.code = code.text;
    res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
    res.status(200).send(code.data);
});

router.get("/pass",function (req,res) {
    sql("select * from admin ",function (err,data) {
        res.send(data)
    })
})
router.post("/checkpass",function (req,res) {
    let oldpass=req.body.oldpass;
    let newpass=req.body.newpass;
    sql(`update admin set pass=${newpass} where pass=${oldpass}`,function (err,data) {
        if(data.affectedRows=="1"){
            res.send("ok")
        }else{
            res.send("no")
        }
    })
})



module.exports = router;


// router.post("/check", function (req, res) {
//     let code = req.body.code;
//     let user = req.body.user;
//     let pass = req.body.pass;
//     if (code.toUpperCase() != req.session.code.toUpperCase()) {
//         res.send("验证码不正确!")
//         return;
//     }
//     query(`select * from user where user="${user}"`, function (err, data) {
//         if (err) {
//             throw err;
//             return;
//         } else {
//             if (data.length == 0) {
//                 res.send("账号不正确!");
//                 return;
//             } else {
//                 if (data[0].pass != pass) {
//                     res.send("密码不正确!")
//                     return;
//                 } else {
//                     req.session.login = "yes";
//                     req.session.user = user;
//                     res.redirect("/users/")
//                 }
//             }
//         }
//     })
// })