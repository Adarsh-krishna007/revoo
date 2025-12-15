import http from "http"
import express from "express"

// Add Socket.IO import
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)

// Fix Socket.IO CORS configuration
app.use(cors());


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
