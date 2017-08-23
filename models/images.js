var mongoose=require('mongoose');

var imagesSchema = mongoose.Schema({
    profile_image:{data:Buffer,contentType:String},
    uploader_id:mongoose.Schema.Types.ObjectId
});

module.exports=mongoose.model('Images', imagesSchema);