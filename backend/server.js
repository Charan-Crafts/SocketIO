require('dotenv').config()
const express = require("express")

const app = express()

const port = process.env.PORT

const MongoDBConnection = require("./db/MongoConnection")

const cors = require('cors')

app.use(cors({
    origin:process.env.ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Database Connection

MongoDBConnection()

app.listen(port,()=>{
    console.log("Server is running at port ",port);
})