var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */
router.get('/', function(req, res) {
    sql("select * from comment",function (err,data) {
         res.send(data);
    })
});
router.get('/del', function(req, res) {
    let id=req.query.id
    sql(`delete from comment where id=${id}`,function (err,data) {
        if(data.affectedRows){
            res.send("ok");
        }else{
            res.send("on");
        }
    })
});

module.exports = router;