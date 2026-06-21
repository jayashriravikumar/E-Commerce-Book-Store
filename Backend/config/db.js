import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log("MongoDB connected with server: " + data.connection.host);
    })
    .catch((err) => {
      console.error("MongoDB connection error: " + err.message);
    });
};
