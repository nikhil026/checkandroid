var mongoose=require('mongoose');

var formSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    suggestion:String,
    contact:String
});

module.exports=mongoose.model('Form', formSchema,'Forms');