var mongoose=require('mongoose');

var blogSchema = mongoose.Schema({
    title:String,
    content:String,
    writerId:mongoose.Schema.Types.ObjectId
});

module.exports=mongoose.model('Blog', blogSchema);