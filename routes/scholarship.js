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

    // console.log(scholarshipId);
    var scholarship = new Scholarship(obj);

    scholarship.save(function (err, results) {
        console.log(results);
    });
    Influencer.findById(scholarshipId,function(err,user){
        if(err){console.log(err)}
        if(user){console.log(user)}
    }).then((data)=>{data.scholarships.push(scholarshipId);})

});

router.get('/student',function(req,res){

    res.send('hello');
});


module.exports=router;