import express from "express";

import {
  getDevices,
  logoutDevice,
  deleteAccount,
} from "../controller/securityController.js";

const router = express.Router();

router.get("/security/devices", getDevices);

router.delete("/security/devices/:id", logoutDevice);

router.delete("/security/delete-account", deleteAccount);

export default router;