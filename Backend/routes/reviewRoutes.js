import express from "express";
import { getAllReviews } from "../controller/reviewController.js";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

// GET all reviews

router.get(
  "/admin/reviews",
  verifyUser,
  roleBasedAccess("admin"),
  getAllReviews
)



export default router;