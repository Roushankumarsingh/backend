const express = require("express") ; 

const Order = require("../models/Orders.js") ; 

const router = express.Router()  ; 

router.post("/orderData" , async(req,res) =>
{
    let data = req.body.order_data ; 
    await data.splice(0,0,{Order_data : req.body.order_date});
    // let orderDate = req.body.order_date ; 

    // data = [{Order_data : orderDate} , ...data] ; 

    let eId = await Order.findOne({"email" : req.body.email}) ; 
    console.log(eId) ; 
    if(eId === null)
    {
        try 
        {
            await Order.create({
                email:req.body.email , 
                order_data : [data]
            }).then(()=>
            {
                res.json({success : true}) 
            })
        }catch(err)
        {
            res.send("Server Error " ) ; 
        }
    }

    else 
    {
        try 
        {
            await Order.findOneAndUpdate({email: req.body.email} , 
                {
                    $push: { order_data: data}}).then(()=>
                    {
                        res.json({success : true}) ; 
                    }) 
        }catch(err)
        {
            res.send("Server Error") ;
        }
    }
} );


router.post("/myorderData" , async(req,res) =>
{
    try {
        let myData = await Order.findOne({"email" : req.body.email}) ; 
        res.json({orderData : myData}) ; 
    }catch(err) 
    {
        res.send(`There is error in the code we have to do something to resolve this  ${err} `) ;  
    }
})

module.exports = router ; 