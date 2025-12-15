import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { comment, getAllPosts, like, saved, uploadPost } from "../controllers/post.controllers.js"

const postRouter = express.Router()

// TEMPORARY: No authentication for testing
postRouter.post("/upload", upload.single("media"), uploadPost)

// OR use a test route
postRouter.post("/upload-test", upload.single("media"), async (req, res) => {
  console.log("Test upload - no auth required");
  
  // Call your actual controller but with test userId
  req.userId = "test-user-id";
  return uploadPost(req, res);
})

// Other routes keep auth
postRouter.get("/getAll", isAuth, getAllPosts)
postRouter.get("/like/:postId", isAuth, like)
postRouter.get("/saved/:postId", isAuth, saved)
postRouter.post("/comment/:postId", isAuth, comment)

export default postRouter
