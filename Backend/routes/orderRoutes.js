import express from "express";
import { createOrder, getUserOrders } from "../controller/orderController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.route("/").get(verifyUser, getUserOrders).post(verifyUser, createOrder);

export default router;