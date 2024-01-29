const mongoose = require("mongoose") ; 

const sampleListings = mongoose.Schema({
    name:{
        type:String , 
        required:true
    },
    image:
    {
        type:String , 
        required:true , 
    },
    location :
    {
        type:String ,
        required : true ,
    },
    country :
    {
        type:String ,
        required:true , 
    },
    description:
    {
        type:String , 
        required:true 
    },
    price:{
        type:Number,
        required : true 
    }
});

module.exports = mongoose.model("userSchema",sampleListings) ; 