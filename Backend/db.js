const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// const mongoURI = "mongodb://localhost:27017";

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully!!");
//     })
// }
const server = "127.0.0.1:27017";
const database = "react";
const connectToMongo = async () =>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("Successfully connected to MongoDB");
    }

    catch (err){
        console.log("Failed to connect to MongoDB!",err);
    }

};
module.exports = connectToMongo;