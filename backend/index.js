import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectDb from "./config/db.js"

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import loopRouter from "./routes/loop.routes.js"
import storyRouter from "./routes/story.routes.js"
import messageRouter from "./routes/message.routes.js"

import { app, server } from "./socket.js"

// Load env vars
dotenv.config()

const PORT = process.env.PORT || 8000

/* -------------------- MIDDLEWARES -------------------- */

// CORS (works for localhost + Render)
app.use(
  cors({
    origin: true, // allow all origins (safe for now)
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/loop", loopRouter)
app.use("/api/story", storyRouter)
app.use("/api/message", messageRouter)

/* -------------------- SERVER START -------------------- */

const startServer = async () => {
  try {
    await connectDb()
    console.log("✅ MongoDB Connected")

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
