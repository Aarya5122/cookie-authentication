const mongoose = require("mongoose")

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Database connected successfully!")
    })
    .catch((error)=>{
        console.log("Database connection FAILED...!")
        console.log("Error: ", error)
        process.exit(1) // Terminate the server
    })
}