import express from 'express';
import express from 'express';
import product from './routes/productRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/v1',product);

app.use("/api", productRoutes);

export default app;