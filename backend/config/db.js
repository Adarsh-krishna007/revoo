import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    
    console.log("✅ MongoDB connected successfully");
    console.log(`   Database: ${connection.connection.name}`);
    
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    
    // Add specific error messages for common issues
    if (error.name === 'MongooseServerSelectionError') {
      console.error("\n🔧 Troubleshooting Steps:");
      console.error("   1. Whitelist your IP in MongoDB Atlas");
      console.error("   2. Check your username/password");
      console.error("   3. Verify your cluster is running");
    }
    
    // Don't exit in development, just throw error
    throw error;
  }
};

export default connectDb;
