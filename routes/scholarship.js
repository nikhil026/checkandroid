var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var Influencer=require('./../models/influencer');
var Scholarship=require('./../models/scholarship');
var Student=require('./../models/student');
router.post('/influencer',function(req,res){
    var scholarshipId=new mongoose.mongo.ObjectId();
    console.log(req.body.password);
  var obj={
      _id:scholarshipId,
      posterId:req.body.posterId,
      email:req.body.email,
      title:req.body.title,
      posterName:req.body.poster_name,
      overview:req.body.overview,
      eligiblity:req.body.eligiblity,
      how_to_apply:req.body.how_to_apply,
      contact:req.body.contact,
      website:req.body.website,
      faq:req.body.faq
  };

    var scholarship = new Scholarship(obj);
    Influencer.findById(req.body.posterId,function(err,user){
        if(err){
            return err;}
        if(user){user.scholarship.push(scholarshipId);
        user.save(function(e,success){
            if(e){return e;}
            if(success){res.send(success);}
        })}
    });
    scholarship.save(function (err, scholarship) {
       if(err){return err;}
       if(scholarship){return scholarship;}
    });
    // Influencer.findOne(
    //     {email:req.body.email,password:req.body.password},
    //     function(err,user){
    //         if(err){console.log(err)}
    //         if(user){return user;}
    //     }).then(function(data){
    //     data.scholarship.push(scholarshipId);
    //     data.save(function());
    //     res.send(data);
    // });
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
router.get('/student/applied/:id',function(req,res){
Student.findById(req.params.id,function(err,user){
  var array=user.appliedFor;
  var scholarshipArray=[];
for(var x=0;x<array.length;x++){
Scholarship.findById(array[x],function(err,user){
scholarshipArray.push(user);
});

}
  console.log(scholarshipArray);
  res.send(scholarshipArray);
})
});

module.exports=router;
