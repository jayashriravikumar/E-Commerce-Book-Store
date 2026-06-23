import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { errorLogger } from "./middleware/logger.js";
import cors from "cors";

const SERVER_START_TIME = new Date();

let totalRequests = 0;
const apiStats = {};
let lastResponseTime = 0;
import rateLimit from "express-rate-limit";
import payment from "./routes/paymentRoutes.js";

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
  })
);

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    lastResponseTime = Date.now() - start;

    console.log(
      `${req.method} ${req.originalUrl} - ${lastResponseTime}ms`
    );
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