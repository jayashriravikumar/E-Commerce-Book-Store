import express from "express";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controller/paymentController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.route("/payment/razorpay").post(verifyUser, createRazorpayOrder);
router.route("/payment/verify").post(verifyUser, verifyRazorpayPayment);

export default router;