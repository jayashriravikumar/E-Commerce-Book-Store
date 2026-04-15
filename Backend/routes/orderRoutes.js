import express from "express";
import { verifyUser } from "../helper/userAuth.js";
import { createNewOrder } from "../controller/orderController.js";

const router = express.Router();

router.route("/new/order").post(verifyUser,createNewOrder);

export default router;