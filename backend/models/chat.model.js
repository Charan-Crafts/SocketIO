const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({

    isGroup: {
        type: Boolean,
        default: false
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    recentMessage: {
        type: mongoose.Schema.ObjectId.Types,
        ref: "Message"
    },
    chatName:{
        type:String
    }
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat