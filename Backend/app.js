process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import wishlist from "./routes/wishlistRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import payment from "./routes/paymentRoutes.js";
import morgan from "morgan";
import { errorLogger } from "./middleware/logger.js";
import cors from "cors";
import adminAnalyticsRoutes from "./routes/adminAnalyticsRoutes.js";

const SERVER_START_TIME = new Date();

let totalRequests = 0;
const apiStats = {};
let lastResponseTime = 0;
import rateLimit from "express-rate-limit";

import product from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import wishlist from "./routes/wishlistRoutes.js";
import payment from "./routes/paymentRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import customerServiceRoutes from "./routes/customerServiceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import cloudinary from "./config/cloudinary.js";
import errorHandler from "./middleware/error.js";

// ✅ dotenv config
dotenv.config();

// ✅ create express app (MISSING IN YOUR CODE)
const app = express();

// 🔹 request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// 🔹 rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", globalLimiter);
app.use("/api/v1", couponRoutes);

// 🔹 middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(morgan("dev"));

app.use((req, res, next) => {
  totalRequests++;

  const route = req.originalUrl;

  apiStats[route] = (apiStats[route] || 0) + 1;

  next();
});

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
  }),
);

// 🔹 test upload route
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    lastResponseTime = Date.now() - start;

    console.log(`${req.method} ${req.originalUrl} - ${lastResponseTime}ms`);
  });

  next();
});

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

// 🔹 routes

app.get("/metrics", (req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    totalRequests,
    memoryUsage: process.memoryUsage().heapUsed,
    apiStats,
    responseTime: lastResponseTime,
    serverStatus: "UP",
    serverStartedAt: SERVER_START_TIME,
    serverTime: new Date(),
  });
});

// Routes
app.use("/api/v1", product);
console.log("Registering user routes...");
app.use("/api/v1", userRoutes);
console.log("User routes registered.");

app.use("/api/v1", order);
app.use("/api/v1", wishlist);
app.use("/api/v1", payment);
app.use("/api/v1", couponRoutes);
app.use("/api/v1/customer-service", customerServiceRoutes);
app.use("/api/v1/faqs", faqRoutes);
app.use("/api/v1", ticketRoutes);
// 🔹 error handler (must be last)
app.use("/api/v1", adminAnalyticsRoutes);
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Error handler

app.use(errorLogger);
app.use(errorHandler);

// ✅ export app
export default app;
