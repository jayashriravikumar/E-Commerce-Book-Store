import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorHandler from "./middleware/error.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
