import wishlist from "./routes/wishlistRoutes.js";
import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import backupRoutes from "./routes/backupRoutes.js";
import restoreRoutes from "./routes/restoreRoutes.js";
import backupHistoryRoutes from "./routes/backupHistoryRoutes.js";
import downloadBackupRoutes from "./routes/downloadBackupRoutes.js";
import uploadBackupRoutes from "./routes/uploadBackupRoutes.js";
import order from "./routes/orderRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import couponRoutes from "./routes/couponRoutes.js";
import cors from "cors";

// Create app
const app = express();

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
app.use("/api/v1", backupRoutes);
app.use("/api/v1", restoreRoutes);
app.use("/api/v1", backupHistoryRoutes);
app.use("/api/v1", downloadBackupRoutes);
app.use("/api/v1", uploadBackupRoutes);
// Error handler
app.use(errorHandler);

export default app;