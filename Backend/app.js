process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import product from "./routes/productRoutes.js";


import backupRoutes from "./routes/backupRoutes.js";
import restoreRoutes from "./routes/restoreRoutes.js";
import backupHistoryRoutes from "./routes/backupHistoryRoutes.js";
import downloadBackupRoutes from "./routes/downloadBackupRoutes.js";
import uploadBackupRoutes from "./routes/uploadBackupRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import order from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";



import couponRoutes from "./routes/couponRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import rateLimit from "express-rate-limit";
import morgan from "morgan";


import userRoutes from "./routes/userRoutes.js";
import wishlist from "./routes/wishlistRoutes.js";
import payment from "./routes/paymentRoutes.js";

import adminAnalyticsRoutes from "./routes/adminAnalyticsRoutes.js";
import customerServiceRoutes from "./routes/customerServiceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import cloudinary from "./config/cloudinary.js";
import errorHandler from "./middleware/error.js";
import { errorLogger } from "./middleware/logger.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";





const SERVER_START_TIME = new Date();

let totalRequests = 0;
const apiStats = {};
let lastResponseTime = 0;

// dotenv config
dotenv.config();

// create express app
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// Parse request body FIRST
app.use(express.json());
app.use(cookieParser());

// request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// rate limiter
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


//  middlewares
app.use("/api/v1", reviewRoutes);

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
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  }),
);

// test upload route
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

// routes

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

app.use("/api/v1", product);
app.use("/api/v1", userRoutes);
app.use("/api/v1", order);
app.use("/api/v1",wishlist);
app.use("/api/v1", payment);
app.use("/api/v1", inventoryRoutes);
app.use("/api/v1", ticketRoutes);
app.use("/api/v1", salesRoutes);
app.use("/api/v1", customerServiceRoutes);
app.use("/api/v1/faqs", faqRoutes);
app.use("/api/v1", newsletterRoutes);
app.use("/api/v1", backupRoutes);
app.use("/api/v1", restoreRoutes);
app.use("/api/v1", backupHistoryRoutes);
app.use("/api/v1", downloadBackupRoutes);
app.use("/api/v1", uploadBackupRoutes);
app.use("/api/v1", dashboardRoutes);
app.use("/api/v1", analyticsRoutes);
app.use("/api/v1", adminDashboardRoutes);
app.use("/api/v1", adminAnalyticsRoutes);
// Error handler

app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});
app.use(errorLogger);
app.use(errorHandler);

export default app;
