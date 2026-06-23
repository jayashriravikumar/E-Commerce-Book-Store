import express from "express";

import {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
} from "../controller/customerServiceController.js";

import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

// User creates ticket
// User creates ticket (login required)
router.post("/", createTicket);

// User views own tickets
router.get("/customer-service/me", verifyUser, getMyTickets);

// Admin views all tickets
router.get(
  "/admin/customer-service",
  verifyUser,
  roleBasedAccess("admin"),
  getAllTickets,
);

// Admin updates ticket status
router.put(
  "/admin/customer-service/:id",
  verifyUser,
  roleBasedAccess("admin"),
  updateTicketStatus,
);

export default router;
