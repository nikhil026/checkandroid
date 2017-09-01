var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();
var connection=mongoose.connect('mongodb://localhost/loginsystem');

var Student=require('./../models/student');
var Influencer=require('./../models/influencer');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/student',function(req,res){
   var email=req.body.email;
   var password=req.body.password;
    var query = {$and:[{email:{$regex: req.body.email, $options: 'i'}},{password:{$regex: req.body.password, $options: 'i'}}]}

    Student.findOne(query,function(err,data){
        if(err){console.log(err)}
        else {console.log(data)
        res.send(data)}
    });
        });
router.post('/influencer',function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var query = {$and:[{email:{$regex: req.body.email, $options: 'i'}},{password:{$regex: req.body.password, $options: 'i'}}]}

    Influencer.findOne(query,function(err,data){
        if(err){console.log(err)}
        else {console.log(data)
            res.send(data);}
    });
});


   //dummy email check nikhil051097@gmail.com


    // var student=new Student({"email":"nikhil051097@gmail.com"});
    // student.save(function(err,data){
    //     if(err) console.log(err);
    //     if(data) console.log(data);
    // })




module.exports = router;
