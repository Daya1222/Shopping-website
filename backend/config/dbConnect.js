import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

async function dbConnect() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("✅ Database connection successful.");
  } catch (err) {
    console.error("❌ Database connection unsuccessful:", err.message);
    process.exit(1);
  }
}

export default dbConnect;
