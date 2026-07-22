import express from "express";

import {
  addAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
} from "../controller/addressController.js";

import { isAuthenticatedUser } from "../middleware/auth.js"; // use your real auth middleware

const router = express.Router();

router.post(
  "/address/new",
  isAuthenticatedUser,
  addAddress
);

router.get(
  "/addresses/me",
  isAuthenticatedUser,
  getMyAddresses
);

router.put(
  "/address/:id",
  isAuthenticatedUser,
  updateAddress
);

router.delete(
  "/address/:id",
  isAuthenticatedUser,
  deleteAddress
);

export default router;