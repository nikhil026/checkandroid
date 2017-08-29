var mongoose=require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var influencerSchema = mongoose.Schema({
    first_name:String,
    second_name:String,
    email:String,
    password:String,
    type:String,
    expertise:String,
    tags:[{field:String}],
    scholarship:[{scholarship_id:mongoose.Schema.Types.ObjectId}],
    blogs:[{}],
    courses:[{course:mongoose.Schema.Types.ObjectId}]

});

influencerSchema.plugin(findOrCreate);
module.exports=mongoose.model('Influencer', influencerSchema,'Influencers');