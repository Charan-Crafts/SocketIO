require('dotenv').config()
const express = require("express")

const app = express()

const port = process.env.PORT

const MongoDBConnection = require("./db/MongoConnection")

const cors = require('cors')
const cookieParser = require("cookie-parser")
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Database Connection

MongoDBConnection()


// Routes

const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chat.routes")

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/chat",chatRoutes)

app.listen(port,()=>{
    console.log("Server is running at port ",port);
})