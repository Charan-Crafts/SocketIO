
const userModel = require("../models/user.model")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const passwordHashing = async (rawPassword) => {

    const hashedPassword = await bcrypt.hash(rawPassword, 10)

    return hashedPassword;
}

const passwordVerification =async (rawPassword,encryptedPassword)=>{

    const isTrue = await bcrypt.compare(rawPassword,encryptedPassword);

    return isTrue;
}

const generateAccessTokenRefreshToken = async (userId) => {

    const accessToken = jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })

    const refreshToken = jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECERT, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })

    return { accessToken, refreshToken }

}

const userRegistration = async (req, res) => {

    const { userName, password, email } = req.body;
    try {
        // Find the user
        const isUser = await userModel.findOne({ email })

        if (isUser) {
            return res.status(400).json({
                success: false,
                message: "User already Registered"
            })
        }

        // Bcrypt the password

        const encryptedPassword = await passwordHashing(password);

        // Now store the user in db

        const newUser = await userModel.create({ userName, password: encryptedPassword, email })

        // Now generate the accessToken and refresh token

        const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(newUser._id);

        if (!accessToken) {
            return res.status(500).json({ success: false, message: "Error while generatign tokens" })
        }



        newUser.refreshToken = refreshToken
        await newUser.save();

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }
        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)

        return res.status(200).json({
            success: true,
            message: {
                accessToken: accessToken,
                userId:newUser._id
            }
        })

    } catch (error) {
        console.log("Internal Server error ", error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        // find the user
        const isUser = await userModel.findOne({ email })

        if (!isUser || !passwordVerification) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // Now generate the accessToken and refresh token

        const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(isUser._id);

        if (!accessToken) {
            return res.status(500).json({ success: false, message: "Error while generatign tokens" })
        }

        isUser.refreshToken = refreshToken
        await isUser.save();

        const options = {
            httpOnly: true,
            secure:false,
            sameSite: "lax"
        }
        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)

        return res.status(200).json({
            success: true,
            message: {
                accessToken: accessToken,
                userId:isUser._id
            }
        })

    } catch (error) {
        console.log("Internal Server error ", error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

const userLogout = async(req,res)=>{
    try {
        const userId = req.userId;

        const user = await userModel.findOne({_id:userId})

        user.refreshToken =""

        await user.save()

        const options={
            httpOnly:true,
            secure:false,
            sameSite: "lax"
        }

        res.clearCookie("accessToken",options)
        res.clearCookie("refreshToken",options)
        
        return res.status(200).json({
            success:true,
            message:"Logged out"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}

module.exports = {
    userRegistration,
    userLogin,
    userLogout
}

