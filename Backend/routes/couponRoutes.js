import express from "express";

import {
  createCoupon,
  applyCoupon,
  getAllCoupons,
 updateCoupon,
  deleteCoupon,
} from "../controller/couponController.js";

const router = express.Router();

router.route("/coupon/create").post(createCoupon);

router.route("/coupon/apply").post(applyCoupon);

router.route("/admin/coupons").get(getAllCoupons);

router.route("/admin/coupon/:id").put(updateCoupon);

router.route("/admin/coupon/:id").delete(deleteCoupon);


export default router;