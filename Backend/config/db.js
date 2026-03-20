import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI || process.env.DB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return false;
  }
};
