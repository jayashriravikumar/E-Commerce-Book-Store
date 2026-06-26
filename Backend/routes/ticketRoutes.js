import express from "express";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";
import {
  createTicket,
  getTickets,
  getSingleTicket,
  updateTicket,
  deleteTicket,
  addMessage,
  getMessages
} from "../controller/ticketController.js";

const router = express.Router();

router.post("/tickets", verifyUser, createTicket);
router.get("/tickets", verifyUser, getTickets);
router.get("/tickets/:id", verifyUser, getSingleTicket);
router.put("/tickets/:id", verifyUser, roleBasedAccess("admin"), updateTicket);
router.delete("/tickets/:id", verifyUser, roleBasedAccess("admin"), deleteTicket);

// Chat endpoints
router.post("/tickets/:id/messages", verifyUser, addMessage);
router.get("/tickets/:id/messages", verifyUser, getMessages);

export default router;
