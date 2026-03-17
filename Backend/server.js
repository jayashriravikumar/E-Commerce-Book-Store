import app from "./app.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const server = await startServer();

/* Handle uncaught exceptions */
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server shutting down due to uncaught exception");
  process.exit(1);
});

/* Handle unhandled promise rejections */
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server shutting down due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
