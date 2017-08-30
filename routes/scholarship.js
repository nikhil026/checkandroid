var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var Influencer=require('./../models/influencer');
var Scholarship=require('./../models/scholarship');

router.post('/influencer',function(req,res){
    var scholarshipId=new mongoose.mongo.ObjectId();
  res.send(req.body)
  var obj={
      _id:scholarshipId,
      posterId:req.body.posterId,
      email:req.body.email,
      password:req.body.password,
      title:req.body.title,
      overview:req.body.overview,
      eligiblity:req.body.overview,
      how_to_apply:req.body.how_to_apply,
      contact:req.body.contact,
      website:req.body.website
  };

    console.log(scholarshipId);
    var scholarship = new Scholarship(obj);
    Influencer.findById(req.body.posterId,function(err,user){
        if(err){return err}
        if(user){user.scholarship.push(scholarshipId);
        user.save(function(e,success){
            if(e){return e;}
            if(success){return success}

        })}
    })
    scholarship.save(function (err, user) {
       if(err){return err;}
       if(user){return user;}

    });
    Influencer.findOne(
        {email:req.body.email,password:req.body.password},
        function(err,user){
            if(err){console.log(err)}
            if(user){return user;}
        }).then(function(data){
        data.scholarship.push(scholarshipId);
        data.save();
        res.send(data);
    });
});

router.get('/influencer/:id',function(req,res,next){
    console.log(req.params.id)
    Scholarship.find({posterId:req.params.id},function(err,result){
            if(err){return err;}
            if(result){res.send(result)}
        });

});

router.get('/student',function(req,res,next){
    Scholarship.find(function(err,result){
        if(err){return err;}
        if(result){res.send(result)}
    })
});


module.exports=router;