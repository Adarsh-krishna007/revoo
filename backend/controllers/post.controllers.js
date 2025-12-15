export const uploadPost = async (req, res) => {
  try {
    console.log("=== UPLOAD POST CONTROLLER ===");
    console.log("File received:", req.file);
    console.log("Request body:", req.body);
    console.log("User ID:", req.userId);

    const { caption, mediaType } = req.body;

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({ 
        message: "Media file is required",
        code: "NO_MEDIA"
      });
    }

    if (!caption || caption.trim().length === 0) {
      console.log("❌ Caption missing");
      return res.status(400).json({ 
        message: "Caption is required",
        code: "NO_CAPTION" 
      });
    }

    // Upload to Cloudinary
    let cloudinaryResult;
    try {
      console.log("Uploading to Cloudinary...");
      
      // If using buffer upload (memory storage)
      if (req.file.buffer) {
        cloudinaryResult = await uploadOnCloudinary(req.file.buffer, {
          resource_type: req.file.mimetype.startsWith('video/') ? 'video' : 'image'
        });
      } 
      // If using disk storage
      else if (req.file.path) {
        cloudinaryResult = await uploadOnCloudinary(req.file.path);
      } 
      else {
        throw new Error("No file data found for upload");
      }
      
      console.log("Cloudinary result:", cloudinaryResult);
    } catch (cloudinaryError) {
      console.error("Cloudinary upload failed:", cloudinaryError);
      return res.status(500).json({ 
        message: "Failed to upload media to Cloudinary",
        error: cloudinaryError.message 
      });
    }

    // Create post in database
    const post = await Post.create({
      caption: caption.trim(),
      media: cloudinaryResult.secure_url || cloudinaryResult,
      mediaType: mediaType || (req.file.mimetype.startsWith('video/') ? 'video' : 'image'),
      author: req.userId
    });

    // Update user's posts
    const user = await User.findById(req.userId);
    user.posts.push(post._id);
    await user.save();

    // Get populated post for response
    const populatedPost = await Post.findById(post._id)
      .populate("author", "name userName profileImage");

    console.log("✅ Post created successfully:", populatedPost._id);
    
    return res.status(201).json(populatedPost);

  } catch (error) {
    console.error("❌ UPLOAD POST ERROR:", error);
    console.error("Error stack:", error.stack);
    
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
}
