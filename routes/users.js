var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',function(req,res){
    var CLIENT_ID="587018207580-o4r1iq6nj80d5tcg7sr94t0i3nasu7v7.apps.googleusercontent.com";
    var token=req.body.token;
    var client = new auth.OAuth2(CLIENT_ID, '', '');
    client.verifyIdToken(
        token,
        CLIENT_ID,
        function(e, login) {
            console.log(e);
            var payload = login.getPayload();
            var userid = payload['sub'];
            console.log(JSON.stringify(payload, undefined, 2))
        });

    res.send(req.body);
});

module.exports = router;
