const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors())

const messages = []

const server = http.createServer(app)

app.get("/", (req, res) =>{
    res.write(`<h1> socket run </h1>`)
    res.end()
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET, POST"],
        credentials: true,
        allowedHeaders: ["authorization"]
    }   
})

server.listen(process.env.PORT, ()=>{
    console.log("server running")
})

io.on("connection", (socket)=>{

    console.log("new conection")

    socket.on("new_message", (data)=>{
        
        messages.push(data)
        io.emit("update_messages", messages)
    })
})