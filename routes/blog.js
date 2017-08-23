var Blog=require('./../blog');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('hello i have sent');
    var obj={
        title:req.body.email,
        content:req.body.password,
        _id:req.body.title,
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

module.exports = router;
