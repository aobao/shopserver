var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */

router.post('/login',function(req,res) {
    console.log(1);
    res.send("ok")
});
router.post('/isg', function(req,res) {
    res.send("ok")
});
router.get('/', function(req,res) {
    res.send("ok,/")
});
module.exports = router;
