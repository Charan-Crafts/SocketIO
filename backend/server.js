const express = require("express")

const app = express()


const {createServer} = require("http")

const httpServer = createServer(app)

const {Server} = require("socket.io")

const io = new Server(httpServer,{
    cors:{
        origin:"*"
    }
})


io.on("connection",(socket)=>{

    

    socket.on("disconnect",()=>{
        console.log(socket.id," is disconnected");
    })

    socket.on("message",(message)=>{
        
        let receivedMessage ={
            message:message.message,
            id:socket.id
        }

        socket.broadcast.emit("receive-message",receivedMessage)
    })


    
})

httpServer.listen(3000,()=>{
    console.log("running");
})