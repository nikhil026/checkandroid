var mongoose=require('mongoose');

var blogSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    content:String,
    blogger_id:mongoose.Schema.Types.ObjectId,
    date:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Blog', blogSchema,'Blogs');