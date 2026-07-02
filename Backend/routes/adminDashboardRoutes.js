import express from "express";
import { getAdminDashboard } from "../controller/adminDashboardController.js";

const router = express.Router();

router.get(
  "/admin/home-dashboard",
  getAdminDashboard
);

export default router;