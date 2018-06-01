var express = require('express');
var router = express.Router();
var sql=require('../libs/sql')
var multer=require('multer')
var os=require('os')
var fs=require('fs')
/* GET home page. */

var upload=multer({dest:os.tmpdir()})
router.post('/upload',upload.single('file'),function(req,res,next){
    res.send(req.file.path);
})
router.post('/add',function(req,res){
   let data=req.body,
       title=data.title,
       name=data.name,
       con=data.con,
       econ=data.econ,
       offprice=data.offprice,
       price=data.price,
       amount=data.amount,
       degra=data.degra,
       sap=data.sap,
       type=data.type;
  let img=JSON.parse(data.img);
//   console.log(img);
  let str=[];
  img.forEach(val=>{
      if(val.response){
          let newpath='/'+Date.now()+val.name;
          fs.renameSync(val.response,'./public/img'+newpath);
          str.push({name:val.name,url:'/api'+newpath})
      }else{
          str.push({name:val.name,url:'/api'+val.url});
      }
  })
  img=JSON.stringify(str);  
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
        offprice=data.offprice,
        price=data.price,
        amount=data.amount,
        degra=data.degra,
        sap=data.sap,
        type=data.type;
  let  img=JSON.parse(data.img);
  let str=[];
  img.forEach(val=>{
      if(val.response){
          let newpath='/'+Date.now()+val.name;
          fs.renameSync(val.response,'./public/img'+newpath);
          str.push({name:val.name,url:'/api'+newpath})
      }else{
          str.push({name:val.name,url:val.url});
      }
  })
  img=JSON.stringify(str);   
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
});

router.get('/allproduct',function(req,res){
    sql(`select * from product where id>0`,function(err,data){
        res.json(data);
    })
})
router.get('/detail',function(req,res){
   let id=req.query.id;
   sql(`select * from product where id=${id}`,function(err,data){
       if(err) throw err;
       res.json(data);
   })
})
router.post('/baby',function(req,res){
    let data=req.body.data;
    console.log(1);
    console.log(data);
    res.send('1')
})
router.get('/', function(req, res, next) {
    sql(`select * from product `,function(err,data){
        res.send(data);
    })
});
module.exports = router;