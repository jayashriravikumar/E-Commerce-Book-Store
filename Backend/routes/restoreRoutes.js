import express from "express";
import { restoreDatabase } from "../controller/restoreController.js";

const router = express.Router();

router.post("/admin/restore", restoreDatabase);

export default router;