import express from "express";
import { getFAQs, addFAQ, deleteFAQ } from "../controller/faqController.js";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

router.get("/", getFAQs);
router.post(
  "/",
  verifyUser,
  roleBasedAccess("admin"),
  addFAQ
);


router.delete(
  "/:id",
  verifyUser,
  roleBasedAccess("admin"),
  deleteFAQ
);

export default router;