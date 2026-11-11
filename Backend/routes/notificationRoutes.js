import express from "express";

import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../controller/notificationController.js";

import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router
  .route("/notification-settings")
  .get(verifyUser, getNotificationSettings)
  .put(verifyUser, updateNotificationSettings);

export default router;