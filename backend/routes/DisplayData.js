const express = require("express") ; 
const router = express.Router() ; 

router.post("/userdata",(req,res) =>
{
    try{
        res.send([global.user_schema]);
        // console.log(global.user_schema) ; 
    }catch(err)
    {
        console.log(`The error in this code is :- ${err.message}`) ; 
        res.send(`Server Error , There is an error in the code ... `)  ; 
    }
});

module.exports = router ; 