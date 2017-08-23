var mongoose=require('mongoose');

var userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    blogId:mongoose.Schema.Types.ObjectId
});

module.exports=mongoose.model('User', userSchema);