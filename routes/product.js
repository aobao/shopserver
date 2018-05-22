var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(1)
     sql('select * from comment',function(err,data){
         console.log(56);
     })
});

module.exports = router;