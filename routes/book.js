var express = require('express');
var router = express.Router();
var sql=require('../libs/sql');

/* GET home page. */
router.get('/', function(req, res, next) {
    sql('select * from book',(err,resp)=>{
        let arr=[];
        resp.forEach(function (val,index) {
            let obj={};
            obj.id=val.id;
            obj.logistics=val.logistics;
            obj.status=val.status;
            obj.time=val.time;
            obj.uid=val.uid;
            arr.push(obj);
        });
        res.send(arr);
    });
});

router.get('/info', function(req, res, next) {
    let id=req.query.id;
    sql(`Select * from addendum inner join product where addendum.gid=product.id&&addendum.bid=${id};`,(err,resp)=>{
        let arr=[];
        resp.forEach(function (val,index) {
            let obj={};
            obj.id=val.gid;
            obj.count=val.count;
            val.price=val.offprice?val.offprice:val.price;
            obj.price=val.price;
            obj.sum=val.count*val.price;
            arr.push(obj);
        });
        res.send(arr);
    });
});

router.post('/edit',function (req,res) {
    let id=req.body.id;
    let logistics=req.body.logistics;
    let status=req.body.status;
    sql(`update book set logistics='${logistics}',status='${status}' where id=${id}`,function (err,resp) {
        if (resp.changedRows==1){
            res.send('ok');
        }else {
            res.send('err');
        }
    });
});

module.exports = router;