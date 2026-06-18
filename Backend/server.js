import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { cloudinaryConfig } from "./config/cloudinary.js";

const PORT = process.env.PORT || 8000;

connectDB();
cloudinaryConfig();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});