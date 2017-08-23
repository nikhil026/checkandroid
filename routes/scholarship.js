var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();


router.post('/',function(req,res){

  res.send('hello i have sent');
  var obj={
      email:req.body.email,
      password:req.body.password,
      title:req.body.title,
      overview:req.body.overview,
      eligiblity:req.body.overview,
      how_to_apply:req.body.how_to_apply,
      contact:req.body.contact,
      website:req.body.string
  };
    var scholarship = new Scholarship(obj);

    scholarship.save(function (err, results) {
        console.log(results);
    });

});

router.get('/',function(req,res){
    console.log('hello');
    res.send('hello');
});


module.exports=router;