var mongoose=require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var influencerSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    dob:{type:String},
    gender:{type:String},
    type:String,
    expertise:String,
    tags:[{type:String}],
    scholarship:[{type:String}],
    blogs:[{type:String}],
    courses:[{course:mongoose.Schema.Types.ObjectId}],
    profilePic:String,
    followers:[{type:String}]

});

influencerSchema.plugin(findOrCreate);
module.exports=mongoose.model('Influencer', influencerSchema,'Influencers');