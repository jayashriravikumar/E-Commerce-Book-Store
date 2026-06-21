import express from "express";
import {
  createCustomerRequest,
  getAllCustomerRequests,
  getCustomerRequest,
} from "../controller/customerServiceController.js";

import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

/**
 * CUSTOMER SERVICE ROUTES
 */

// Create ticket
router.post("/", createCustomerRequest);

// Get all tickets (admin)
router.get("/", getAllCustomerRequests);

// Get single ticket
router.get("/:id", verifyUser, getCustomerRequest);

export default router;