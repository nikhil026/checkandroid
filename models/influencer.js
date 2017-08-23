var mongoose=require('mongoose');

var influencerSchema = mongoose.Schema({
    first_name:String,
    second_name:String,
    email:String,
    password:String,
    type:String,
    expertise:String,
    tags:[{field:String}],
    scholarship:[{scholarship_id:mongoose.Schema.Types.ObjectId}],
    courses:[{course:mongoose.Schema.Types.ObjectId}]

});

module.exports=mongoose.model('Influencer', influencerSchema);