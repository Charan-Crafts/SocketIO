const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    profileUrl:{
        type:String, // which is stored in Cloudinary
        default:"https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User