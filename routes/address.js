var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */
router.post('/', function(req, res) {
    let user=req.body.user;
    sql(`select id from user where name='${user}'`,function(a,row){
        sql(`select * from address where pid='${row[0].id}'`,function (err,data) {
            res.send(data);
        })
    })
    
});

router.get('/del', function(req, res) {
    let id=req.query.id
    sql(`delete from address where id=${id}`,function (err,data) {
        if(data.affectedRows){
            res.send("ok");
        }else{
            res.send("on");
        }
    })
});

router.post("/addindex",function (req,res) {
    let name=req.body.name
    let phone=req.body.phone
    let area=req.body.area
    let dareas=req.body.dareas
    let coding=req.body.coding
    let user=req.body.user
    sql(`select id from user where name='${user}'`,function(a,row){
       
    sql(`insert into address (name,phone,area,dareas,coding,pid) values ("${name}","${phone}","${area}","${dareas}","${coding}","${row[0].id}")`,function (err,data) {
        if(data.affectedRows){
            let ids=data.insertId
            res.send(`${ids}`)
            return
        }else{
            res.send("on")
            return
        }
    })
 })
})

module.exports = router;