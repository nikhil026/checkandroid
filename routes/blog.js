var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var Blog=require('./../models/blog')
var Influencer=require('./../models/influencer');
var Student=require('./../models/student');

router.post('/influencer', function(req, res, next) {
    var blogId=new mongoose.mongo.ObjectId();
    var obj={
        _id:blogId,
        title:req.body.title,
        content:req.body.content,
        blogger_id:req.body.id
    };
    var blog = new Blog(obj);
    blog.save(function (err, results) {
        console.log(results);
    });

    Influencer.findOne(
        {email:req.body.email,password:req.body.password},
     function(err,user){
             if(err){console.log(err)}
            if(user){return user;}
        }).then(function(data){
            data.blogs.push(blogId)
        data.save();
     res.send(data);
         });
});

router.get('/influencer',function(req,res,next){
   if(req.body.id){
       Blog.find({blogger_id:req.body.id},function(err,result){
           if(err){return err;}
           if(result){res.send(result)}
       })}
       else{
       Blog.find(function(err,result){
           if(err){return err;}
           if(result){res.send(result);}});}
   });

router.get('/student',function(req,res,next){
    Blog.find(function(err,result){
        if(err){return err;}
        if(result){res.send(result)}
    })
});

module.exports = router;
