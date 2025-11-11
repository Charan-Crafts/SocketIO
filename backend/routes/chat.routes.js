const express = require("express")

const router = express.Router()

const authMiddleware = require("../middlewares/auth.middleware")

const chatController = require("../controllers/chat.controllers")
// http://localhost:3000/api/v1/chat/search?user=charan

router.get("/search",authMiddleware.authorization,chatController.search)

module.exports = router