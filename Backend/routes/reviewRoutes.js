import express from "express";
import { getAllReviews } from "../controller/reviewController.js";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

// GET all reviews


export default router;