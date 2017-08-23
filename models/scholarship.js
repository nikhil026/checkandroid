var mongoose=require('mongoose');

var scholarshipSchema = mongoose.Schema({
    title:String,
    overview:String,
    eligiblity:String,
    how_to_apply:String,
    faq:[
        {
            question:{type:String,default:"How can i get this scholarship"},
            answer:{type:String,default:"Apply through our portal"}
        }
    ],
    deadline:{type:Date,default:Date.now },
    contact:String,
    website:String,
    influencer_id:mongoose.Schema.Types.ObjectId
});

module.exports=mongoose.model('Scholarship', scholarshipSchema);