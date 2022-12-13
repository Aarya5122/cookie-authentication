const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        required: [true, "Email is required."],
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password is required."]
    },
    token: String
})

module.exports = mongoose.model("account", userSchema)