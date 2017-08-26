var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();
var connection=mongoose.connect('mongodb://localhost/loginsystem');

var Student=require('./../models/student');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/',function(req,res){
   var email=req.body.email;
   var password=req.body.password;
    var query = {$and:[{email:{$regex: req.body.email, $options: 'i'}},{password:{$regex: req.body.password, $options: 'i'}}]}

    Student.find(query,function(err,data){
        if(err){console.log(err)}
        else {console.log(data)
        res.send(data)}
    });
        });


   //dummy email check nikhil051097@gmail.com


    // var student=new Student({"email":"nikhil051097@gmail.com"});
    // student.save(function(err,data){
    //     if(err) console.log(err);
    //     if(data) console.log(data);
    // })




module.exports = router;
