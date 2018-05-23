var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET users listing. */
router.get('/', function(req, res, next) {
    sql('select * from user',function (err,resp) {
        res.send(resp)
    });
});

module.exports = router;
