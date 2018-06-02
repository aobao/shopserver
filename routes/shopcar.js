var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */
router.post('/my',function(req,res){
    let user=req.body.user;
    // console.log(user);
    sql(`select * from shopcar where cid='${user}'`,function(err,data){
        //  if(err) throw err;
         res.json(data);
    })
})
router.post('/order',function(req,res){
    let user=req.body.user;
    var id=0;
    sql(`select id from user where name='${user}'`,function(err,data){
        id=data[0].id;
        sql(`select * from shopcar where cid='${user}'`,function(err,data){
            res.json(data);  
       })
    })
    // console.log(id)
   
})
router.post('/myorder',function(req,res){
    let user=req.body.data;
    // sql(`select id from user where name='${user}'`,function(err,data){
        sql(`select * from shopcar where cid='${user}' `,function(err,data){
            res.json(data);  
       })
    // })
    // console.log(id)
   
})
router.post('/addshop',function(req,res){
    let id=req.body.id;
    let amount=req.body.amount;
    let user=req.body.user;
    
    sql(`select * from product where id='${id}'`,function(err,data){
        let arr=data[0];
        let price=arr.price,
            shopname=arr.name,
            img=arr.img;
        sql(`insert into shopcar(price,amount,img,shopname,cid) values('${price}','${amount}','${img}','${shopname}','${user}')`,function(err,result){
            if(result.affectedRows==1){
                res.send('ok');
            }else{
                res.send('error');
            }
        })                  
    })
})
router.post('/update',function(req,res){
    let arr=JSON.parse(req.body.data);
    // console.log(arr);
    arr.forEach(val => {
        sql(`update shopcar set amount='${val.amount}',flag='${val.flag}' where id='${val.id}'`,function(err,row){
          
        })
    });
    res.send('ok')
})
router.get('/', function(req, res, next) {
    sql('select * from shopcar',function (err,resp) {
        res.send(resp)
    });
});

module.exports = router;