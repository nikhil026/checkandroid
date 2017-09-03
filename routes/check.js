var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();


var Student=require('./../models/student');
var Influencer=require('./../models/influencer');

router.get('/student', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/student',function(req,res) {
    console.log(req.body);
    var CLIENT_ID="66120570205-d7939369dgdjdmt2mgc846bog3if2t1m.apps.googleusercontent.com";
    // var CLIENT_ID = "587018207580-o4r1iq6nj80d5tcg7sr94t0i3nasu7v7.apps.googleusercontent.com";

    // var CLIENT_ID = "170921491735-isss7i6seuvhghgdl6k047lulioppo9a.apps.googleusercontent.com";
    var token = req.body.token;
    var client = new auth.OAuth2(CLIENT_ID, '', '');
    client.verifyIdToken(
        token, CLIENT_ID,
        function(e,login) {
            if(e){res.send(e);}
            if(!login){console.log('problem')
            return ;}
            var payload = login.getPayload();
            var userid = payload['sub'];
            console.log(JSON.stringify(payload, undefined, 2));
            Student.find({"email": payload.email}, function (err, data) {
                if (err) {
                    console.log(err)
                }
                if (data) {

                    if (data.length > 0)
                        res.send('true');
                    else
                        res.send('false')
                }
            });

        }
        );
});
router.post('/influencer',function(req,res){
    var CLIENT_ID="66120570205-d7939369dgdjdmt2mgc846bog3if2t1m.apps.googleusercontent.com";
        // var CLIENT_ID = "587018207580-o4r1iq6nj80d5tcg7sr94t0i3nasu7v7.apps.googleusercontent.com";
        // var CLIENT_ID = "170921491735-isss7i6seuvhghgdl6k047lulioppo9a.apps.googleusercontent.com";
        var token=req.body.token;
        var client = new auth.OAuth2(CLIENT_ID, '', '');
        client.verifyIdToken(
            token,
            CLIENT_ID,
            function(e,login) {
                var payload = login.getPayload();
                var userid = payload['sub'];
                console.log(JSON.stringify(payload, undefined, 2));
                Influencer.find({"email":payload.email},function(err,data)
                {
                    if(err){
                        console.log(err)
                    }
                    if(data){

                        if(data.length>0)
                            res.send('true');
                        else
                            res.send('false')
                    }
                });

            });
    });







module.exports = router;
