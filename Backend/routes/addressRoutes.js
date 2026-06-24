import express from "express";

import {
  addAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
} from "../controller/addressController.js";

const router = express.Router();

// Temporary auth middleware
const isAuthenticatedUser = (req, res, next) => {
  req.user = {
    _id: "685a00000000000000000001",
  };

  next();
};
router.route("/address/new").post(addAddress);

router.route("/addresses/me").get(getMyAddresses);

router
  .route("/address/:id")
  .put(updateAddress)
  .delete(deleteAddress);
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