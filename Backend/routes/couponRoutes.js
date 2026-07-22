import express from "express";

import {
  createCoupon,
  applyCoupon,
  getAllCoupons,
 updateCoupon,
  deleteCoupon,
} from "../controller/couponController.js";

import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

router.route("/coupon/create").post(
  verifyUser,
  roleBasedAccess("admin"),
  createCoupon
);

router.route("/coupon/apply").post(applyCoupon);

router.route("/admin/coupons").get(
  verifyUser,
  roleBasedAccess("admin"),
  getAllCoupons
);

router.route("/admin/coupon/:id").put(
  verifyUser,
  roleBasedAccess("admin"),
  updateCoupon
);

router.route("/admin/coupon/:id").delete(
  verifyUser,
  roleBasedAccess("admin"),
  deleteCoupon
);


export default router;