import express from "express";
import { updateStock } from "../controller/inventoryController.js";

const router = express.Router();

router.patch("/:id/stock", updateStock);

export default router;