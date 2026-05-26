import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  console.log("🔍 MONGO_URI:", mongoUri ? mongoUri.substring(0, 30) + "..." : "UNDEFINED");

  if (!mongoUri) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;