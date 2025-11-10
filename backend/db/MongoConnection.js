const mongoose = require("mongoose")

const DB_CONNECTION = async ()=>{

    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`)

        console.log("Connected to MONGODB");
        
    } catch (error) {
        console.log("MongoDB connection Error :",error);
        
    }

}

module.exports = DB_CONNECTION