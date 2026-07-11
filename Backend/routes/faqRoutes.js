import express from "express";
import { getFAQs, addFAQ, updateFAQ,deleteFAQ } from "../controller/faqController.js";

const router = express.Router();

router
  .route("/")
  .get(getFAQs)
  .post(addFAQ);

router
  .route("/:id")
  .put(updateFAQ)
  .delete(deleteFAQ);

export default router;