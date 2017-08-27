var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();
var findOrCreate = require('mongoose-findorcreate')

var Student=require('./../models/student');
var Influencer=require('./../models/influencer');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/student',function(req,res) {
    Student.findOrCreate({"email":req.body.email},{"password":req.body.password},
        function(err,user){
        if(err){return err;}
        if(user){res.send(user);}
        }
    );


});

router.post('/influencer',function(req,res) {


    Influencer.findOrCreate({"email":req.body.email},{"password":req.body.password},
        function(err,user){
            if(err){return err;}
            if(user){res.send(user);}
        }
    );

});


    //dummy email check nikhil051097@gmail.com





module.exports = router;
