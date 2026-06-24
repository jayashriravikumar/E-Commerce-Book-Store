import express from "express";
import { getAnalytics } from "../controller/adminAnalyticsController.js";

const router = express.Router();

router.get("/admin/analytics", getAnalytics);

export default router;