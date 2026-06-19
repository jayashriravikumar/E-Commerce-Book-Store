import wishlist from "./routes/wishlistRoutes.js";
import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import couponRoutes from "./routes/couponRoutes.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Create app
const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per 15 minutes
  message: { 
    success: false, 
    message: "Too many requests from this IP, please try again after 15 minutes." 
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});


app.use("/api", globalLimiter);

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1", couponRoutes);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

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

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1",wishlist);
// Error handler
app.use(errorHandler);

export default app;
