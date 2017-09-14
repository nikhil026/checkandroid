var express = require('express');
var router = express.Router();
var Student=require('./../models/student');
var Influencer=require('./../models/influencer');
var Image=require('./../models/images');
var Scholarship=require('./../models/scholarship');
var Doc=require('./../models/docs');
var Blog=require('./../models/blog');
var Form=require('./../models/forms');
// var sgMail = require('@sendgrid/mail');
var mongoose=require('mongoose');

router.get('/', function(req, res, next) {
  console.log(req.body);
 res.render('index.ejs');
});
// router.get('/form-data',function(req))


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
          Student.findById(req.body.uploader_id,function(err,user){
                if(err){return err;}
                if(user){
                      user.profilePic=picId;
                      user.save(function(e,s){
                          res.send(s);
                      });
                }
            });


    });
});

router.post('/influencer/upload-image',function(req,res){
    var picId=new mongoose.mongo.ObjectId();
    console.log(picId);
    var image=new Image({
        _id:picId,
        profile_image:req.body.profile_image,
        uploader_id:req.body.uploader_id
    });
    image.save(function(err,success){
            Influencer.findById(req.body.uploader_id,function(err,user){
            if(err){return err;}
            if(user){
                user.profilePic=picId;
                user.save(function(e,s){
                    res.send(s);
                });
            }
        });


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


router.post('/blog/:blogid/like/:likerid',function(req,res){
    console.log(req.params.likerid);
    console.log(req.params.blogid)
    Blog.findById(req.params.blogid,function(err,blog){
        if(err){return err;}
        if(blog){
            blog.likers.push(req.params.likerid);
            blog.likesNo=Number(blog.likesNo)+1;
            blog.save(function(err,liked){
            if(err){return e;}
            if(liked){
                Student.findById(req.params.likerid,function(err,data){
                    if(err){return err;}
                    if(data){data.myLikes.push(req.params.blogid);
                    data.save(function(err,done){
                        if(err){return err;}
                        if(done){res.send(done);}
                    })
                    }
                });
            }
        });
        }
    })
});
router.post('/follow/:studentid/:influencerid',function(req,res) {
    console.log(req.params.studentid);
    console.log(req.params.influencerid);
    Influencer.findById(req.params.influencerid, function (err, success) {
        if (err) {
            return err;
        }
        if(success) {
            success.followers.push(req.params.studentid);
            success.save(function (err, followed) {
                if (err) {
                    return e;
                }
                if (followed) {
                    Student.findById(req.params.studentid, function (err, data) {
                        if (err) {
                            return err;
                        }
                        if (data) {
                            data.following.push(req.params.influencerid);
                            data.save(function (err, done) {
                                if (err) {
                                    return err;
                                }
                                if (done) {
                                    res.send(done);
                                }
                            })
                        }
                    })
                }
            });
        }
    });
});
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

router.get('/image/student/:id/direct',function(req,res){
    req.params.id;
    Student.findById(req.params.id,function(err,success){

    return success;
    }).then(function(image){var
        studentImage=success.profilePic;
        Image.findById(studentImage,function(err,user){
            res.send(user);
        })
    });
});

router.get('/image/influencer/:id/direct',function(req,res){
    req.params.id;
    Influencer.findById(req.params.id,function(err,success){

      return success;
    }).then(function(image){var
        studentImage=success.profilePic;
        Image.findById(studentImage,function(err,user){
            res.send(user);
        })
    });
});

router.get('/image/:imageid/direct',function(req,res){

});

router.get('/influencer/profile/:id',function(req,res){
console.log(req.body.id)
  Influencer.findOne({_id:req.params.id},function(err,user){
      if(err){res.send(err);}
      if(user){res.send(user);}
  });
console.log('hello')
});
router.get('/student/profile/:id',function(req,res){
    console.log(req.params.id)
    Student.findOne({_id:req.params.id},function(err,user){
        if(err){res.send(err);}
        if(user){res.send(user);}
    });
    console.log('hello')
});
router.post('/student/edit/profile',function(req,res){
    var id=req.body._id;
    Student.findById(id,
        function(err,user)
        {   if(err){return err;}
            if(user){return user;}
        }).then(function(data){
        data.first_name=req.body.first_name;
        data.last_name=req.body.last_name;
        data.dob=req.body.dob;
data.education=[];
data.achievements=[];
        Array.from(req.body.education).forEach(function(edu) {
            data.education.push(edu)});
        Array.from(req.body.achievements).forEach(function(ach) {
            data.achievements.push(ach)});

        // for(var i=0;i<req.body.education.length;i++){
        //     data.education.push(req.body.education[i]);
        // }
// data.education=req.body.education;
//         data.achievements=req.body.achievements;
        data.save(function(err,saved){
            console.log('data');
            res.send(saved);
        });
    });
});

router.post('/influencer/edit/profile',function(req,res){
    var id=req.body._id;
    console.log(id);
    Influencer.findById(id,
        function(err,user)
        {   if(err){return err;}
            if(user){return user;}
        }).then(function(data){
        data.first_name=req.body.first_name;
        data.last_name=req.body.last_name;
        data.tags=req.body.tags;
        data.courses=req.body.courses;
        data.dob=req.body.dob;
        // console.log(data)
        data.save(function(err,saved){
           res.send(saved);
        });

    });
});
// router.post('/sendemail',function(){
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//         to: 'nikhil051097@example.com',
//         from: 'test@example.com',
//         subject: 'Sending with SendGrid is Fun',
//         text: 'and easy to do anywhere, even with Node.js',
//         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     };
//     sgMail.send(msg);
// });
router.get('/forgot/password/:id',function(req,res){
    console.log(req.params.id);
    Student.findById(req.params.id,function(err,user){
       if(err){console.log(err);}
       if(user){user.email;}
    });
    Influencer.findById(req.params.id,function(err,user){
        if(err){console.log(err);}
        if(user){return user;}
    });
});

router.post('/form-data/contact',function(req,res){
   var form =new Form({'first_name':req.body.first_name,
               'last_name':req.body.last_name,
               'email':req.body.email,
              'suggestion':req.body.suggestion ,
              'contact':req.body.contact });
   form.save(function(err,saved){
       console.log(saved);
       res.redirect('http://edumonk.org/contact.html');
   })
});
router.post('/form-data/give-edumonk',function(req,res){
    var form =new Form({'first_name':req.body.first_name,
        'last_name':req.body.last_name,
        'email':req.body.email,
        'suggestion':req.body.suggestion,
        'contact':req.body.contact  });
    form.save(function(err,saved){
        console.log(saved);
        res.redirect('http://edumonk.org/give-edumonk.html');
    })
});


router.post('/form-data/programs-teach',function(req,res){
    var form =new Form({'first_name':req.body.first_name,
        'last_name':req.body.last_name,
        'email':req.body.email,
        'suggestion':req.body.suggestion,
        'contact':req.body.contact  });
    form.save(function(err,saved){
        console.log(saved);
        res.redirect('http://edumonk.org/programs-teach-for-good.html');
    })
});
router.post('/form-data/programs-campaign',function(req,res){
    var form =new Form({'first_name':req.body.first_name,
        'last_name':req.body.last_name,
        'email':req.body.email,
        'suggestion':req.body.suggestion ,
        'contact':req.body.contact });
    form.save(function(err,saved){
        console.log(saved);
        res.redirect('http://edumonk.org/programs-campaign-for-good.html');
    })
});
router.post('/form-data/programs-tech',function(req,res){
    var form =new Form({'first_name':req.body.first_name,
        'last_name':req.body.last_name,
        'email':req.body.email,
        'suggestion':req.body.suggestion ,
        'contact':req.body.contact
    });
    form.save(function(err,saved){
        console.log(saved);
        res.redirect('http://edumonk.org/programs-tech-for-good.html');
    })
});



module.exports = router;
