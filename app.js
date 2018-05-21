var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser=require('body-parser')
var multer=require('multer')
var session=require('express-session')
var svg=require('svg-captcha')


var indexRouter = require('./routes/admin/index');
var usersRouter = require('./routes/admin/users');
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


app.use('/amdin', indexRouter);
app.use('/admin', usersRouter);

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
