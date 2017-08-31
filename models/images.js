var mongoose=require('mongoose');

var imageSchema = mongoose.Schema({
    profile_image:String,
    uploader_id:mongoose.Schema.Types.ObjectId
});

module.exports=mongoose.model('Image', imageSchema,'Images');