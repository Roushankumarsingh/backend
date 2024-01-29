const express = require("express") ; 

const app = express() ; 

const port = 4000 ; 

const cors = require("cors") ; 

const corsOptions = {
    origin: "http://localhost:5173" ,
    methods : "GET , POST , PUt , DELETE , HEAD , PATCH" , 
    credentials: true ,
};


app.use(cors()) ; 

const connectDatabase = require("./db") ; 

app.use(express.json());

app.use('/api' , require("./routes/house.js")) ; 

app.use("/api" , require("./routes/DisplayData.js")) ; 

app.use("/api" , require("./routes/user.js"))

app.use("/api" , require("./routes/DisplayUserData.js")) ; 

app.use("/api" , require("./routes/OrderData.js")) ; 

app.get("/home",(req,res)=>
{
    console.log("The home page ....") ; 
    res.send("Waiting for the response ... ");
})

app.listen(port,()=>
{
    console.log(`App listening on ${port}`) ; 
});

