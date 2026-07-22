import express from "express";
import {
  getPreference,
  updatePreference,
} from "../controller/preferenceController.js";

const router = express.Router();

router
  .route("/preferences")
  .get(getPreference)
  .put(updatePreference);

export default router;
