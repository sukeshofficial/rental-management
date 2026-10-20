import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/odoo";
    const conn = await mongoose.connect(mongoURI, {
      bufferCommands: false,
    });
    cachedConnection = conn;
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
