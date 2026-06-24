process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";

import product from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import wishlist from "./routes/wishlistRoutes.js";
import payment from "./routes/paymentRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import customerServiceRoutes from "./routes/customerServiceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

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

// 🔹 middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

// 🔹 test upload route
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

// 🔹 error handler (must be last)
app.use(errorHandler);

// ✅ export app
export default app;