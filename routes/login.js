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
    // var CLIENT_ID="587018207580-o4r1iq6nj80d5tcg7sr94t0i3nasu7v7.apps.googleusercontent.com";
    // var token=req.body.token;
    // var client = new auth.OAuth2(CLIENT_ID, '', '');
    // client.verifyIdToken(
    //     token,
    //     CLIENT_ID,
    //     function(e, login) {
    //         var payload = login.getPayload();
    //         var userid = payload['sub'];
    //         console.log(JSON.stringify(payload, undefined, 2));
    //         Student.find({"email":payload.email},function(err,data)
    //         {
    //             if(err){
    //                 console.log(err)
    //
    //             }
    //             if(data){
    //
    //                 if(data.length>0)
    //                     res.send('true');
    //                 else
    //                     res.send('false')
    //             }
    //         });
    //
    //     });


   //dummy email check nikhil051097@gmail.com


    var student=new Student({"email":"nikhil051097@gmail.com"});
    student.save(function(err,data){
        if(err) console.log(err);
        if(data) console.log(data);
    })


});

module.exports = router;
