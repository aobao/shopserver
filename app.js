var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser=require('body-parser')
var multer=require('multer')
var session=require('express-session')
var svg=require('svg-captcha')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var product = require('./routes/product');
var comment = require('./routes/comment');
var shopcar = require('./routes/shopcar');
var address=require('./routes/address');
var book=require('./routes/book')

var app = express();

// view engine setup

// app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))


app.use('/api/amdin', indexRouter);
app.use('/api/poduct', product);
app.use('/api/comment',comment);
app.use('/api/shopcar', shopcar);
app.use('/api/address', address);
app.use('/api/book',book);
app.use('/api/user',usersRouter);
var upload = multer({ dest: 'uploads/' })
app.use('/api/upload',upload.array('/product'),function(req,res,next){
  console.log(req.files);
})
app.get('/api/test',function(req,res){
  res.send('nde');
  console.log(1);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
let port=8000;
app.listen(port,function(){
  console.log('ok port 8000');
})
