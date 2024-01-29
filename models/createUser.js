const mongoose = require("mongoose") ; 

const createUser = mongoose.Schema({
    name:{
        type:String , 
        required:true,
    },
    email:{
        type:String  , 
        required:true , 
    },
    password:{
        type:String, 
        required:true , 
        minLength : 5 ,
    },
    location : {
        type:String , 
        required : true , 
    },
    phone:{
        type:String , 
        required:true, 
    },
    city:{
        type:String , 
        required:true  , 
    },
    pin:{
        type:String , 
        required:true , 
    }
});
module.exports = mongoose.model("createUser",createUser) ; 