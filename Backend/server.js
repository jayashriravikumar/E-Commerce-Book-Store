import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
<<<<<<< Updated upstream

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
=======
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

import app from "./app.js";
import { connectDB } from "./config/db.js";
>>>>>>> Stashed changes

const PORT = process.env.PORT || 8000;

connectDB();
cloudinaryConfig();

<<<<<<< Updated upstream
=======
process.on("UncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

>>>>>>> Stashed changes
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

<<<<<<< Updated upstream
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
=======
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
>>>>>>> Stashed changes
