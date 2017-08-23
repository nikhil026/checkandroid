var mongoose=require('mongoose');

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
    aadhar_no:String,
    aadhar_boolean:String,
    docs:[{docs_id:mongoose.Schema.Types.ObjectId }],
    achievements:[{
       name:String,
      description:String
    }],
    following:[{following_id:mongoose.Schema.Types.ObjectId}]



});

module.exports=mongoose.model('Student', studentSchema);