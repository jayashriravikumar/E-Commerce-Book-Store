import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3000;

console.log("DB URI:", process.env.DB_URI);

// Database connection
connectDB();

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});