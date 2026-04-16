import express from "express";
import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";
import { createNewOrder,getOrderDetails,getAllOrders,deleteOrder,getAllOrdersByAdmin } from "../controller/orderController.js";

const router = express.Router();

router.route("/new/order").post(verifyUser,createNewOrder);
router.route("/order/:id").get(verifyUser,getOrderDetails);
router.route("/orders/user").get(verifyUser,getAllOrders);

//admin
router.route("/admin/orders").get(verifyUser,roleBasedAccess("admin") ,getAllOrdersByAdmin);
router.route("/admin/order/:id").get(verifyUser,roleBasedAccess("admin") ,getOrderDetails);
router.route("/admin/order/:id").delete(verifyUser,roleBasedAccess("admin") ,deleteOrder);

export default router;