import express from "express";
import { getFAQs, addFAQ, deleteFAQ } from "../controller/faqController.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/", addFAQ);
router.delete("/:id", deleteFAQ);

export default router;