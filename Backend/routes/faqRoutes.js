import express from "express";
import {
  createFAQ,
  getAllFAQs,
  getFAQ,
  updateFAQ,
  deleteFAQ,
} from "../controller/faqController.js";

const router = express.Router();

router.post("/faq", createFAQ);
router.get("/faq", getAllFAQs);
router.get("/faq/:id", getFAQ);
router.put("/faq/:id", updateFAQ);
router.delete("/faq/:id", deleteFAQ);

export default router;