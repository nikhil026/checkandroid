var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');
var connection=mongoose.connect('mongodb://localhost:3435/loginsystem');
var app = express();
// const nodemailer=require('nodemailer');
// const sendmail = require('sendmail')({
//     logger: {
//         debug: console.log,
//         info: console.info,
//         warn: console.warn,
//         error: console.error
//     },
//     silent: false,
//     dkim: { // Default: False
//         privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
//         keySelector: 'mydomainkey'
//     },
//     devPort: 1025 // Default: False
//     devHost: 'localhost' // Default: localhost
// })
















// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var scholarship= require('./routes/scholarship');
var blog=require('./routes/blog');
var login=require('./routes/login');
var check=require('./routes/check');
var signup=require('./routes/signup');





app.use('/', index);
app.use('/blog',blog);
app.use('/scholarship',scholarship);
app.use('/login',login);
app.use('/signup',signup);
app.use('/check',check);


module.exports = app;
