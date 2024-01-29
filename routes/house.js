const express = require("express") ; 
const router = express.Router() ; 
const User = require("../models/models.js") ; 


const {body , validationResult} = require("express-validator") ; 

router.post("/createuser" , async(req,res) =>
{
    const errors = validationResult(req)  ; 
    if(!errors.isEmpty())
    {
        return res.status(201).json({errors : errors.array()}) ; 
    }
    try 
    {
        await User.create({
            name : req.body.name , 
            location : req.body.location , 
            country : req.body.country , 
            price : req.body.price ,
            description:req.body.description ,
            image: req.body.image 
        })
        res.json({success : true}) ; 
    }catch(err)
    {
        console.log(`There is an error in this context ${err}`) ; 
        res.json({success:false}) ; 
    }
})
module.exports = router  ; 





















// const { body, validationResult } = require('express-validator');

// router.post("/createuser"
//  , async(req,res) =>
// {
//     const errors = validationResult(req) ;
//     if(!errors.isEmpty()) 
//     {
//         return res.status(400).json({ errors : errors.array() });
//     }


//     try 
//     {
//         await User.create({
//             name : req.body.name , 
//             email : req.body.email , 
//             location : req.body.location ,
//             password : req.body.password 
//         })
//         res.json({success:true}); 
//     }catch(err) 
//     {
//         console.log(err) ;  
//         res.json({success:false}) ; 
//     }
// });

// module.exports = router ;