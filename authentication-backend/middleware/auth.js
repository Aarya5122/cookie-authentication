const jwt = require("jsonwebtoken")
const User = require("../model/user.schema")

const isLoggedIn = async (req, res, next) => {
    try {
    const { token } = req.cookies
    console.log("token: ", token)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id)
    next()
    } catch (error) {
        console.log("Error in auth middleware");
        console.log("Error: ", error);
        res.status(403).json({
            success: false,
            message: "Please login to access"
        })
    }
}

module.exports = isLoggedIn