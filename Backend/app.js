import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { errorLogger } from "./middleware/logger.js";

// Create app
const app = express();
app.use(morgan("dev"));

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

   console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next();
});


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    serverTime: new Date(),
  });
});

// Test route (file receive check)
import cloudinary from "./config/cloudinary.js";

app.post("/test-upload", async (req, res) => {
  try {
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath);

    res.json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});
// Metrics
let totalRequests = 0;

app.use((req, res, next) => {
  totalRequests++;
  next();
});

app.get("/metrics", (req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    totalRequests,
    memoryUsage: process.memoryUsage().heapUsed,
    serverTime: new Date(),
  });
});

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use((req, res, next) => {
  const error = new Error(
    `Route not found: ${req.originalUrl}`
  );
  error.statusCode = 404;
  next(error);
});

// Error handler

app.use(errorLogger);
app.use(errorHandler);

export default app;