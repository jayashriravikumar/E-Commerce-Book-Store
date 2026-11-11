import express from "express";
import { updateStock } from "../controller/inventoryController.js";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

router.patch(
  "/:id/stock",
  verifyUser,
  roleBasedAccess("admin"),
  updateStock
);

export default router;