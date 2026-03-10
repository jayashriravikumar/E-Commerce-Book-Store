import express from "express";
import { getProducts } from "../controller/productcontroller.js";

const router = express.Router();

router.get("/books", getProducts);

export default router;