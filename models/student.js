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
            type:String,
            start_year:String,
            final_year:String
        }
    ],
    gender:String,
    dob:{type:Date},
    aadhar:String,
    aadhar_boolean:String,
    docs:[String],
    achievements:[{
       name:String,
      description:String
    }],
    following:[String],
    profilePic:String



});
studentSchema.plugin(findOrCreate);
module.exports=mongoose.model('Student', studentSchema,'Students');