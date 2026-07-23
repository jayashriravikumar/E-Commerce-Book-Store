import express from "express";

import {
  addAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
} from "../controller/addressController.js";

const router = express.Router();

// Temporary auth middleware
import { verifyUser } from "../helper/userAuth.js";

router.post(
  "/address/new",
  verifyUser,
  addAddress
);

router.get(
  "/addresses/me",
  verifyUser,
  getMyAddresses
);

router.put(
  "/address/:id",
  verifyUser,
  updateAddress
);

router.delete(
  "/address/:id",
  verifyUser,
  deleteAddress
);

export default router;