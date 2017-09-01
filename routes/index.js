var express = require('express');
var router = express.Router();
var Student=require('./../models/student');
var Influencer=require('./../models/influencer');
var Image=require('./../models/images');
var Scholarship=require('./../models/scholarship');
var Doc=require('./../models/docs');
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


router.post('/student/upload-image',function(req,res){
    var picId=new mongoose.mongo.ObjectId();
    console.log(picId);
    var image=new Image({
        _id:picId,
        profile_image:req.body.profile_image,
        uploader_id:req.body.uploader_id
    });
    image.save(function(err,success){
        if(err){return err;}
        if(success){
            Student.findById(req.body.uploader_id,function(err,user){
                if(err){return err;}
                if(user){
                      user.profilePic=picId;
                      user.save(function(e,s){
                          if(e){return e;}
                          if(s){
                          res.send(s);}
                      })}
            })
        }
    });
});

router.post('/influencer/upload-image',function(req,res){
    var picId=new mongoose.mongo.ObjectId();
    console.log(picId)
    var image=new Image({
        _id:picId,
        profile_image:req.body.profile_image,
        uploader_id:req.body.uploader_id
    });
    image.save(function(err,success){
        if(err){return err;}
        if(success){
            Influencer.findById(req.body.uploader_id,function(err,user){
                if(err){return err;}
                if(user){user.profilePic=picId;
                    user.save(function(e,s){
                        if(e){return e;}
                        if(s){return s;}
                    })}
            })
        }
    });

});

router.post('/student/doc-upload',function(req,res){
    var docId=new mongoose.mongo.ObjectId();
    var docs=new Doc({
        _id:docId,
        uploader_id:req.body.id,
        docs_image:req.body.doc,
        type:req.body.type

});

    docs.save(function(e,s){
        if(e){
            res.send(e);
            return e;
        }
        if(s){
            Student.findById(req.body.id,function(err,user){
                if(err){
                    res.send(err);
                    return err;}
                if(user){
                    user.docs.push(docId);
                    user.save(function(err,user){
                        if(err){return err;}
                        if(user) {return user};
                    })
                }
            })
        }
    });
});


router.post('/blog/:blogid/like/:likerid');
router.post('/scholarship/apply',function(req,res,next){
   studentId=req.body.studentId;
   scholarshipId=req.body.scholarshipId;
   Scholarship.findById(scholarshipId,function(err,data){
       if(err){return err;}
       if(data){
           data.appliedBy.push(studentId);
           data.save(function(err,success){
             if(err){return err;}
             if(success){Student.findById(studentId,function(err,data){
                 if(err){return err;}
                 if(data){
                     data.appliedFor.push(scholarshipId);
                     data.save(function(err,success){
                         if(err){return err;}
                         if(success){res.send(success);}
                     })
                 }

             })}
           })
       }
   });

});
router.get('/image/:profilepic',function(req,res){
    console.log(req.params.profilepic);
    Image.find({_id:req.params.profilepic},function(err,user){
        if(err){ return err;}
        if(user){
        res.send(user);}
    });
});
router.post('/influencer/profile/:id',function(req,res){
console.log(req.body.id)
  Influencer.findOne({_id:req.params.id},function(err,user){
      if(err){res.send(err);}
      if(user){res.send(user);}
  });
console.log('hello')
});
router.post('/student/profile/:id',function(req,res){
    console.log(req.params.id)
    Student.findOne({_id:req.params.id},function(err,user){
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
