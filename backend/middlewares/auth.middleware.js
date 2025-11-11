const jwt = require("jsonwebtoken")


const decodeToken = async (token) => {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT)

    return decode;
}
const authorization = async (req, res, next) => {
    try {
        let token;


        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized"
            })
        }

        // if token lets decode it

        const decodedInfo = await decodeToken(token)

        req.userId=decodedInfo._id
        
        next()
    } catch (error) {
        console.log("Internal Server error in authorization ", error);

    }
}

module.exports = {
    authorization
}