const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")

const app = express()

const server = http.createServer(app)
app.use(cors())

const messages = []

const io = new Server(server)

server.listen(3001, ()=>{
    console.log("server running")
})

io.on("connection", (socket)=>{

    console.log("new conection")

    socket.on("new_message", (data)=>{
        
        // messages.push(data.msg)
        // io.emit("update_messages", messages)
        messages.push(data)
        console.log(data)
        io.emit("update_messages", messages)
    })
})