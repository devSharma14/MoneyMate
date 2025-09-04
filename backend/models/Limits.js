const mongoose=require('mongoose')

const limitsSchema=new mongoose.Schema({
    date:{
        type:Date,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true
    }

},{timestamps:true})

const Limit=mongoose.model('Limit',limitsSchema);
module.exports=Limit;