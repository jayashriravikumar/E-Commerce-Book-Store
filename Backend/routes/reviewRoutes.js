import express from "express";
import { getAllReviews } from "../controller/reviewController.js";

const router = express.Router();

// GET all reviews
router.get("/admin/reviews", getAllReviews);

export default router;