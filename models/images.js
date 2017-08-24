var mongoose=require('mongoose');

var imageSchema = mongoose.Schema({
    profile_image:{data:Buffer,contentType:String},
    uploader_id:mongoose.Schema.Types.ObjectId
});

module.exports=mongoose.model('Image', imageSchema,'Images');