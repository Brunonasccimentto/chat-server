const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")

const app = express()

app.use(cors())

app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const messages = []

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET, POST"],
        credentials: true,
        allowedHeaders: ["authorization"]
    },   
})

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