const express = require("express")
const app = express();

const User = require("./model/user.schema")

const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const isLoggedIn = require("./middleware/auth");
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({credentials:true, origin: "https://cookie-auth-aarya.vercel.app/"}))

app.get("/", (req, res)=>{
    res.send("<h1>Home route</h1>")
})

app.post("/register", async (req, res)=>{
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            throw new Error("Please provide name, email and password.")
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new Error("Already registered user.")
        }
        const encryptedPassword = await bcrypt.hash(password, 10) //salt length
        const user = await User.create({
            name,
            email,
            password: encryptedPassword
        })
        const token = jwt.sign({
            id: user._id,
            email
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        })
        user.token = token
        await user.save()
        user.password = null
        res.status(200).json({
            success: true,
            message: "Account created successfully",
            user
        })

    } catch(error){
        console.log("Registration route error")
        console.log("Error: ",error);
        res.status(400).json({
            success:false,
            error
        })
    }
})

app.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            throw new Error("Please provide email and password.")
        }
        const user = await User.findOne({email}).select('+password');
        if(!user){
            throw new Error("User not registered.")
        }
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({
                id: user._id,
                email
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            })
            user.token = token
            await user.save()
        }
        const options = {  
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now()+24*60*60*1000),
            httpOnly: true, // Server can manipulate but user cannot through browser
        }
        res.cookie("token",user.token,options)
        res.status(200).json({
            success: true,
            message: "Account logged in successfully",
            user
        })

    } catch(error){
        console.log("Login route error")
        console.log("Error: ",error);
        res.status(400).json({
            success:false,
            error
        })
    }
})

app.get("/dashboard", isLoggedIn, (req, res)=>{

    const user = req.user
    res.json({
        success: true,
        user
    })
})

module.exports = app