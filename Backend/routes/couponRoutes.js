import express from "express";

import {
  createCoupon,
  applyCoupon,
} from "../controller/couponController.js";

const router = express.Router();

import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

router.route("/coupon/create").post(
  verifyUser,
  roleBasedAccess("admin"),
  createCoupon
);

router.route("/coupon/apply").post(applyCoupon);

export default router;