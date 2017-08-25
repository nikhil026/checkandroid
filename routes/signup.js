var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();


var Student=require('./../models/student');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/',function(req,res) {
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


    //dummy email check nikhil051097@gmail.com





module.exports = router;
