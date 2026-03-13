import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import errorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errorHandler);

export default app;
