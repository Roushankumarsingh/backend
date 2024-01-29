const express = require("express") ; 

const router = express.Router() ; 

router.post("/displayuserdata" ,(req,res) =>
{
    try 
    {
        res.send([global.create_user]) ; 
    }catch(err)
    {
        console.log(`There is an error in this code ${err}`) ; 
    }
});


module.exports = router ; 