import express from "express";
import Book from "../models/book.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Order route working" });
});

export default router;