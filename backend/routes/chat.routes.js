const express = require("express")

const router = express.Router()

const authMiddleware = require("../middlewares/auth.middleware")

const chatController = require("../controllers/chat.controllers")
// http://localhost:3000/api/v1/chat/search?user=charan

router.get("/search",authMiddleware.authorization,chatController.search)

// http://localhost:3000/api/v1/chat
router.post("/",authMiddleware.authorization,chatController.accessChats)

//http://localhost:3000/api/v1/chat
//Get the all chats of the particular user
router.get("/",authMiddleware.authorization,chatController.getAllChats)

// Create a group chat

router.post("/createGroup",authMiddleware.authorization,chatController.createGroupChat)


// Rename the group

router.post("/rename",authMiddleware.authorization,chatController.renameGroup)

router.put("/addMember",authMiddleware.authorization,chatController.addMemberToGroup)

module.exports = router