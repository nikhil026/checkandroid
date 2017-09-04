var mongoose=require('mongoose');

var scholarshipSchema = mongoose.Schema({
    posterId:mongoose.Schema.Types.ObjectId,
    posterName:String,
    title:String,
    overview:String,
    eligiblity:String,
    how_to_apply:String,
    faq:[{type:String}],
    deadline:{type:Date,default:Date.now },
    contact:String,
    website:String,
    appliedBy:[{type:String}]
});

module.exports=mongoose.model('Scholarship', scholarshipSchema,'Scholarships');