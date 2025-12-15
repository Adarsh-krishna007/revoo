import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { comment, getAllPosts, like, saved, uploadPost } from "../controllers/post.controllers.js"

const postRouter = express.Router()

// FIXED: Changed middleware order - upload.single() comes BEFORE isAuth
postRouter.post("/upload", upload.single("media"), isAuth, uploadPost)

// Debug route (optional - remove in production)
postRouter.post("/upload-debug", upload.single("media"), (req, res) => {
  console.log("🔍 DEBUG UPLOAD - File received:", req.file ? "YES" : "NO")
  console.log("File details:", {
    originalname: req.file?.originalname,
    mimetype: req.file?.mimetype,
    size: req.file?.size
  })
  console.log("Request body:", req.body)
  console.log("Cookies:", req.cookies)
  
  res.json({
    success: true,
    debug: {
      fileReceived: !!req.file,
      bodyFields: Object.keys(req.body),
      hasCookies: !!req.cookies
    }
  })
})

// Other routes remain the same
postRouter.get("/getAll", isAuth, getAllPosts)
postRouter.get("/like/:postId", isAuth, like)
postRouter.get("/saved/:postId", isAuth, saved)
postRouter.post("/comment/:postId", isAuth, comment)

export default postRouter
