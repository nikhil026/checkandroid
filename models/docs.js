var mongoose=require('mongoose');

var docSchema = mongoose.Schema({
    docs_image:{data:Buffer,contentType:String},
    uploader_id:mongoose.Schema.Types.ObjectId
});

module.exports=mongoose.model('Doc', docSchema,'Docs');