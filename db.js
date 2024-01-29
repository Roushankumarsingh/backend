const mongoose = require("mongoose") ; 

const URL = "mongodb+srv://roushankumarsingh452:rous123@cluster0.f1syzpy.mongodb.net/?retryWrites=true&w=majority"


const connectionParams = {
    useNewUrlParser: true , 
    useUnifiedTopology: true , 
}

const connectDatabase = async ()=>
{
    try{
        await mongoose.connect(URL , connectionParams) ; 
        console.log("Connected to the MongoDB") ; 
        const collection = mongoose.connection.db.collection("userschemas") ; 
        const data = await collection.find({}).toArray() ; 

        console.log("The required data is :- ") ;
        global.user_schema = data ; 
        // console.log(global.user_schema) ; 

        const collection2 = mongoose.connection.db.collection("createusers") ; 
        const data2 = await collection2.find({}).toArray() ; 

        console.log("The required data is :- ") ; 
        global.create_user = data2 ; 




    }catch(err)
    {
        console.log(`There is an error in this context please correct it ${err}`) ; 
    }
}

module.exports = connectDatabase() ; 