const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(allowCrossDomain)

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200)
    }
    else {
        next()
    }
}

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

server.listen(3001, ()=>{
    console.log("server running")
})

io.on("connection", (socket)=>{

    console.log("new conection")

    socket.on("new_message", (data)=>{
        
        messages.push(data)
        io.emit("update_messages", messages)
    })
})