import express from "express";
import product from "./routes/productRoutes.js";
import errorHandler from "./middleware/error.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", product);

// Error Middleware
app.use(errorHandler);

export default app;