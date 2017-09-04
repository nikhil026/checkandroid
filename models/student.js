var mongoose=require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var studentSchema = mongoose.Schema({
    first_name:String,
    second_name:String,
    email:String,
    password:String,
    education:[
        {
            institute:String,
            level:String,
            tenure:String
        }
    ],
    gender:String,
    dob:{type:String},
    aadhar:String,
    aadhar_boolean:String,
    docs:[String],
    achievements:[String],
    following:[{type:String}],
    profilePic:String,
    appliedFor:[{type:String}],
    myLikes:[{type:String}]





});
studentSchema.plugin(findOrCreate);
module.exports=mongoose.model('Student', studentSchema,'Students');