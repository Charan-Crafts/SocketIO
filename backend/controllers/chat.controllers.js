
const userModel = require("../models/user.model");
const { options } = require("../routes/chat.routes");
// search the user by name or email

// search ="name" or "email"
const search =async (req,res)=>{

    const name = req.query.user;

    // find the user based upon the email or name 

    if(!name){
        return res.status(400).json({
            success:false,
            message:"Enter the name"
        })
    }

    const users = await userModel.find({
        $or:[
            {userName : {$regex :`^${name}` , $options :"i"}},
            {email : { $regex :` ^${name}` , $options:"i"}}
        ]
    }).find({_id :{$ne : req.userId}}).select(" _id userName email profileUrl")

    // You will get all the users now but i don't want the curent user who is searching .. 😅
    
    if(!users){
        return res.status(200).json({
            success:true,
            message:"user not found"
        })
    }

    return res.status(200).json({
        success:true,
        data:{
            "users":users
        }
    })
    
}

module.exports ={
    search
}