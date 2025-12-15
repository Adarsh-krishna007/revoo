import http from "http"
import express from "express"
import cors from "cors" // Import cors middleware
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)

// Initialize Socket.IO server with all origins allowed
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"]
    }
})

// Configure CORS for Express - allow all origins
app.use(cors({
    origin: "*",
    credentials: true
}))

const userSocketMap = {}

export const getSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

io.on("connection", (socket) => {
    console.log(`New socket connection: ${socket.id}`)
    
    const userId = socket.handshake.query.userId
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id
        console.log(`User ${userId} connected with socket ${socket.id}`)
    }

    // Send updated online users list
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    console.log('Online users:', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`)
        if (userId != "undefined") {
            delete userSocketMap[userId]
            console.log(`User ${userId} disconnected`)
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

export { app, io, server }
