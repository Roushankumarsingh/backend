const express = require("express") ; 

const router = express.Router() ; 

const User = require("../models/createUser") ; 

const {body , validationResult} = require("express-validator") ; 


const jwt = require("jsonwebtoken") ; 
const bcrypt = require("bcryptjs") ; 

const jwtSecret = "MYnameisEndtoEndRoushanKumarSingh" ; 


router.post("/registerusers", async(req,res)=>
{
    const errors = validationResult(req) ; 
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()});
    }

    const salt = await bcrypt.genSalt(10) ; 
    let secPassword = await bcrypt.hash(req.body.password,salt) ; 


    try{
        await User.create({
            name: req.body.name , 
            email:req.body.email , 
            password:secPassword,
            location:req.body.location , 
            city:req.body.city , 
            phone:req.body.phone , 
            pin:req.body.pin ,
        })
        res.json({success : true}) ;

    }catch(err)
    {
        console.log(`There is Something error in the code ${err}`) ; 
        res.json({success : false}) ; 
    }
});

router.post("/loginusers",async(req,res)=>
{
    const errors = validationResult(req)  ; 
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()});
    }
    let email = req.body.email ; 
    try {
        let userData = await User.findOne({email}) ;  
        if(!userData  ) 
        {
            return res.status(400).json({errors : "Try logging with correct email"}) ; 
        }

        const pwdCompare = await bcrypt.compare(req.body.password , userData.password) ; 
        if(!pwdCompare) 
        {
            return res.status(400).json({errors: "Try logging with correct Password"}) ; 
        }

        const data = {
            user : 
            {
                id : userData._id , 
            }
        }

        const authToken = jwt.sign(data , jwtSecret) ; 
        return res.json({success : true , authToken:authToken}) ; 

    }catch(err)
    {
        console.log(`There is something error in the code ${err}`) ; 
        res.json({success:false}) ; 
    }
})


module.exports = router ; 