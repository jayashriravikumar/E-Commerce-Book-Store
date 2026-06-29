import express from "express";

import {
  subscribeNewsletter,
  getAllSubscribers,
  unsubscribeNewsletter,
} from "../controller/newsletterController.js";

import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

// Public Route
router.post("/newsletter/subscribe", subscribeNewsletter);

// Admin Route
router.get(
  "/admin/newsletter",
  verifyUser,
  roleBasedAccess("admin"),
  getAllSubscribers
);

// Public Route
router.delete("/newsletter/unsubscribe", unsubscribeNewsletter);

export default router;