require("dotenv").config()

const database  = require("./database/dabase.config")
database.connect()

const app = require("./app")

app.listen(process.env.PORT||4001, ()=>console.log(`Server is up and running in port ${process.env.PORT}!`))