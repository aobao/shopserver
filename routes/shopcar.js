var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */
router.get('/', function(req, res, next) {
    sql('select * from shopcar',function (err,resp) {
        res.send(resp)
    });
});

module.exports = router;