var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */

router.get('/', function(req,res) {
    res.send("ok,/")
});
router.post('/login',function(req,res) {
   let user=req.body.user
   let pass=req.body.pass
    sql(`select * from user where name='${user}'`,function (err,data) {
        if(data.length){
            if(pass==data[0].pass){
                res.send("ok");
            }else{
                res.send("no");
            }
        }else{
            res.send("no");
            return;
        }
    })
});
router.post('/isg', function(req,res) {
    let user=req.body.user
    let pass=req.body.pass
    sql(`insert into user (name,pass) values ("${user}","${pass}")`,function (err,data) {
        if(data.affectedRows){
            res.send("ok")
            return
        }else{
            res.send("no")
            return
        }
    })
});

module.exports = router;
