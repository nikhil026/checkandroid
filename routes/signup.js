var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();


var Student=require('./../models/student');
var Influencer=require('./../models/influencer');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/student',function(req,res) {
    var obj = {
        email: req.body.email,
        password: req.body.password
    };
    var student=new Student(obj);
    student.save(function(err,data){
        if(err){ console.log(err);}
        if(data){ console.log(data);
        res.send(data);}
    });

});

router.post('/influencer',function(req,res) {
    var obj = {
        email: req.body.email,
        password: req.body.password
    };
    var influencer=new Influencer(obj);
    influencer.save(function(err,data){
        if(err){ console.log(err);}
        if(data){ console.log(data);
            res.send(data);}
    });

});


    //dummy email check nikhil051097@gmail.com





module.exports = router;
