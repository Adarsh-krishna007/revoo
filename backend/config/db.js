import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log("✅ MongoDB connected successfully");
    console.log(`   Host: ${connection.connection.host}`);
    console.log(`   Database: ${connection.connection.name}`);
    
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    
    // Add specific error messages for common issues
    if (error.name === 'MongooseServerSelectionError') {
      console.error("   → MongoDB is not running or unreachable");
      console.error("   → Check if MongoDB service is started");
      console.error("   → Verify connection string in .env file");
    }
    
    // Exit process if database connection fails (for production)
    process.exit(1);
  }
};

export default connectDb;
