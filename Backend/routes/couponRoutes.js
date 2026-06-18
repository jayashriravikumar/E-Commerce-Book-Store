import express from "express";

import {
  createCoupon,
  applyCoupon,
} from "../controller/couponController.js";

const router = express.Router();

router.route("/coupon/create").post(createCoupon);

router.route("/coupon/apply").post(applyCoupon);

export default router;