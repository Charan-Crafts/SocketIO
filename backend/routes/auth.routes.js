const express = require("express")

const router = express.Router()

const authController = require("../controllers/auth.controller")

const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register",authController.userRegistration)

router.post("/login",authController.userLogin)

router.post("/logout",authMiddleware.authorization,authController.userLogout)

module.exports = router