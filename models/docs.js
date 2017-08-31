var mongoose=require('mongoose');

var docSchema = mongoose.Schema({
    docs_image:String,
    uploader_id:mongoose.Schema.Types.ObjectId,
    type:String

});

module.exports=mongoose.model('Doc', docSchema,'Docs');