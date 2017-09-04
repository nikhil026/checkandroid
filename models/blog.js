var mongoose=require('mongoose');

var blogSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    content:String,
    blogger_id:mongoose.Schema.Types.ObjectId,
    blogger_name:String,
    date:{type:Date,default:Date.now},
    likers:[{type:String}],
    likesNo:[{type:Number,default:0}]
});

module.exports=mongoose.model('Blog', blogSchema,'Blogs');