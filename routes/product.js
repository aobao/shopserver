var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')

/* GET home page. */
router.get('/', function(req, res, next) {
    sql('select * from product',function(err,data){
        res.send(data);
    })
});
router.post('/add',function(req,res){
   let data=req.body,
       title=data.title,
       name=data.name,
       con=data.con,
       econ=data.econ,
       img=data.img,
       offprice=data.offprice,
       price=data.price,
       amount=data.amount,
       degra=data.degra,
       sap=data.sap,
       type=data.type;
    sql(`insert into product(title,name,con,econ,img,offprice,price,amount,degra,sap,type) 
    values('${title}','${name}','${con}','${econ}','${img}','${offprice}','${price}','${amount}','${degra}','${sap}','${type}')`,function(err,mes){
        if(err) throw err;
        if(mes.affectedRows){
            let id=String(mes.insertId);
            res.send(id);
        }else{
            res.send('0')
        }
    })   
   
})
router.post('/edit',function(req,res){
    let data=req.body,
        id=data.id,
        title=data.title,
        name=data.name,
        con=data.con,
        econ=data.econ,
        img=data.img,
        offprice=data.offprice,
        price=data.price,
        amount=data.amount,
        degra=data.degra,
        sap=data.sap,
        type=data.type;
     sql(`update product set title='${title}',name='${name}',con='${con}',econ='${econ}',img='${img}',offprice='${offprice}',price=${price},amount='${amount}',degra='${degra}',sap='${sap}',type='${type}' where id=${id}`,function(err,mes){
         if(err) throw err;
         if(mes.affectedRows){
             res.send('1')
         }else{
             res.send('0')
         }
     })   
 })
router.get('/delete',function(req,res){
    let id=req.query.id;
    sql(`delete from product where id=${id}`,function(err,data){
        if(err) throw err;
        if(data.affectedRows){
            res.send('1');
        } else{
            res.send('0');
        }
    })
})
module.exports = router;