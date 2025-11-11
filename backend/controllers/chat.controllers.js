
const userModel = require("../models/user.model");
const chatModel = require("../models/chat.model")
const mongoose = require("mongoose")
// search the user by name or email

// search ="name" or "email"
const search = async (req, res) => {

    const name = req.query.user;

    // find the user based upon the email or name 

    try {
        if (!name) {
            return res.status(400).json({
                success: false,
                error: "Enter the userName or Email"
            })
        }

        const users = await userModel.find({
            $or: [
                { userName: { $regex: `^${name}`, $options: "i" } },
                { email: { $regex: ` ^${name}`, $options: "i" } }
            ]
        }).find({ _id: { $ne: req.userId } }).select(" _id userName email profileUrl")

        // You will get all the users now but i don't want the curent user who is searching .. 😅

        if (!users) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                "users": users
            }
        })
    } catch (error) {
        console.log("Internal server error in Search", error);

        return res.status(500).json({
            success: false,
            error: error
        })
    }

}
// send the individual message
const accessChats = async (req, res) => {

    const { receiverId } = req.body;

    try {

        // Sender 

        const senderId = req.userId;

        // Check the sender is exists or not

        const isUser = await userModel.find({ _id: receiverId })


        // Check this two users having the chat previously

        const previousChat = await chatModel.find({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: senderId } } },
                { users: { $elemMatch: { $eq: receiverId } } },
            ]
        }).populate({
            path: "users",
            select: "userName email profileUrl"
        })
            .populate("recentMessage")

        if (previousChat.length > 0) {

            return res.status(200).json({
                success: true,
                data: previousChat[0]
            })
        }
        // Create the new chat

        const newChat = await chatModel.create({ users: [req.userId, receiverId], chatName: "Sender" })

        newChat.save()

        // Now return the chat

        const chat = await chatModel.findOne({ _id: newChat._id }).populate("users", "-password refreshToken")
            .populate("recentMessage")

        return res.status(200).json({
            success: true,
            data: chat
        })

    } catch (error) {
        console.log("Internal server error in the send individaul message ", error);
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}
const getAllChats = async (req, res) => {

    try {

        const userId = req.userId;

        const chats = await chatModel.find({
            users: { $elemMatch: { $eq: userId } }
        }).populate("users", "-password -refreshToken")
            .populate("groupAdmin", "-password -refreshToken")
            .populate("recentMessage")
            .sort({ updatedAt: -1 })

        return res.status(200).json({
            success: true,
            data: chats
        })

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

const createGroupChat = async (req, res) => {

    const { groupName, users } = req.body;


    const createGroupChat = await chatModel.create({
        isGroup: true, groupAdmin: req.userId, users: [...users, req.userId], chatName: groupName
    })

    await createGroupChat.save()

    return res.status(200).json({
        success: true,
        data: createGroupChat._id,
        message: "Group created"
    })

}

const renameGroup = async (req, res) => {

    const { groupName, groupId } = req.body;
    try {


        const isgroup = await chatModel.findOne({ _id: groupId })

        console.log(isgroup);


        if (!isgroup || !isgroup.isGroup) {
            return res.status(400).json({
                success: false,
                message: "Group doesn't exists"
            })
        }

        isgroup.chatName = groupName
        await isgroup.save()

        return res.status(200).json({
            success: true,
            message: "Updated"
        })

    } catch (error) {
        console.log("Error ", error);
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}


const addMemberToGroup = async (req, res) => {

    const { groupId, membersId } = req.body;


    try {


        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(membersId)) {
            return res.status(400).json({
                success: false,
                message: "Userid or group id is not valid"
            })
        }

        const findGroup = await chatModel.findById({ _id: groupId })

        console.log(findGroup);


        if (!findGroup) {
            return res.status(400).json({
                success: false,
                message: "Group not exists"
            })
        }


        const findUser = await userModel.findById(membersId);

        if (!findUser) {
            return res.status(200).json({
                success: true,
                message: "User not found"
            })
        }

        // add the users 

        const updateUsers = await chatModel.findByIdAndUpdate(
            groupId,
             { $addToSet: { users: membersId } },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Added"
        })
    } catch (error) {
        console.log("error ", error);
        return res.status(200).json({
            success: true,
            message: "User not found"
        })
    }
}

// Group remove

module.exports = {
    search,
    accessChats,
    getAllChats,
    createGroupChat,
    renameGroup,
    addMemberToGroup
}