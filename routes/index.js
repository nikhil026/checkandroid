var express = require('express');
var router = express.Router();
var Student=require('./../models/student');
var Influencer=require('./../models/influencer');
var mongoose=require('mongoose');

router.get('/', function(req, res, next) {
  console.log(req.body);
 res.render('index.ejs');
});


// router.post('/student/signin',function(req,res){
//     Student.findOne({email:req.body.email},function(err,user){
//         if(err){res.send('Wrong email');}
//         if(user){return user;}
//     }).then((data)=>{
//     if(!data){
//         Student.create({"email":req.body.email},function(err,user){
//             if(err){console.log(err);}
//             if(user){console.log(user);}
//             res.redirect('/student/profile');
//         });
//     }
//     else if(data){
//         console.log(data)
//         res.redirect('/student/profile');
//     }});
// });
// router.post('/influencer/signin',function(req,res){
//     console.log('received');
//     console.log(req.body.email)
//     Influencer.findOne({email:req.body.email},function(err,user){
//         if(err){res.send('Wrong email');}
//         if(user){return user}
//     }).then((data)=>{
//         console.log(data)
//     if(!data){
//         Influencer.create({"email":req.body.email},function(err,user){
//             if(err){console.log(err);}
//             if(user){console.log(user);}
//             res.render('influencer-profile',{profile:user});
//         })
//     }
//     else if(data){
//        console.log(data)
//         res.render('influencer-profile',{profile:user});
//     }});
// });
// router.get('/student/profile',function(req,res){
//     res.render('student-profile')
// });

router.post('/influencer/profile',function(req,res){
console.log(req.body.id)
  Influencer.findOne({_id:req.body.id},function(err,user){
      if(err){res.send(err);}
      if(user){res.send(user);}
  });
console.log('hello')
});

router.post('/student/profile',function(req,res){
    console.log(req.body.id)
    Student.findOne({_id:req.body.id},function(err,user){
        if(err){res.send(err);}
        if(user){res.send(user);}
    });
    console.log('hello')
});


router.post('/student/edit/profile',function(req,res){
    var id=req.body._id;
    console.log(id);
   Student.findById(id,
        function(err,user)
        {   if(err){return err;}
            if(user){return user;}
        }).then(function(data){
        data=req.body;
        console.log(data)
        data.save(function(err){
            console.log(err)
        });
    });
});

router.post('/influencer/edit/profile',function(req,res){
    var id=req.body._id;
     console.log(id);
      Influencer.findById(id, function(err,user)
        {   if(err){
            return err;}
            if(user){
            return user;}
        }).then(function(data){
           data.first_name=req.body.first_name;
           data.last_name=req.body.last_name;
           data.save(function(err,user){
               console.log(err)
           });
        });
});





module.exports = router;
