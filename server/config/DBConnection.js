const mongoose = require("mongoose")
require("dotenv").config()

exports.connection = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL)
      
        
        if(connection){
            console.log("DB connected successfully");
        }
    } catch (error) {
        console.log("Error while conecting to DB");
        console.log(error);
        
    }
}