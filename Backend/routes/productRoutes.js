import express from "express";

import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getAllProductsByAdmin,
  updateProduct,
  deleteProduct,
  restoreProduct,
  permanentDeleteProduct,
  createProductReview,
  viewProductReviews,
  adminDeleteReview,
} from "../controller/productcontroller.js";

import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";
const router = express.Router();

router.post(
  "/admin/product/new",
  verifyUser,
  roleBasedAccess("admin"),
  createProduct
);


/* ================= USER ================= */

router.get("/products", getAllProducts);

router.get("/product/:id", getSingleProduct);

/* ================= REVIEW ================= */

router.put("/review", verifyUser, createProductReview);

/* ================= ADMIN ================= */

/* ================= ADMIN ================= */

router.get(
  "/admin/products",
  verifyUser,
  roleBasedAccess("admin"),
  getAllProductsByAdmin
);

// ✅ restore must come BEFORE /admin/product/:id
router.put(
  "/admin/product/restore/:id",
  verifyUser,
  roleBasedAccess("admin"),
  restoreProduct
);

router
  .route("/admin/product/:id")
  .put(
    verifyUser,
    roleBasedAccess("admin"),
    updateProduct
  )
  .delete(
    verifyUser,
    roleBasedAccess("admin"),
    deleteProduct
  );

/* ================= ADMIN REVIEWS ================= */

router.get(
  "/admin/reviews",
  verifyUser,
  viewProductReviews
);

router.delete(
  "/admin/reviews",
  verifyUser,
  adminDeleteReview
);

router.delete(
  "/admin/product/permanent/:id",
  verifyUser,
  roleBasedAccess("admin"),
  permanentDeleteProduct
);

export default router;