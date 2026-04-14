import express from 'express';
import { addProducts,getAllProducts, getSingleProduct,getAllProductsByAdmin,updateProduct,deleteProduct,createProductReview,viewProductReviews,adminDeleteReview } from '../controller/productcontroller.js';
import { verifyUser,roleBasedAccess } from '../helper/userAuth.js';
const router = express.Router();

//User side
router.route("/products").get( getAllProducts)
router.route("/product/:id").get(getSingleProduct);
//user review
router.route("/review").put(verifyUser,createProductReview);

//Admin side
router.route("/admin/product/create").post(verifyUser,roleBasedAccess("admin"),addProducts);
router.route("/admin/product/:id").put(verifyUser,roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);
//adminView all products
//view review
router.route("/admin/reviews").get(verifyUser,roleBasedAccess("admin"),viewProductReviews).delete(verifyUser,roleBasedAccess("admin"),adminDeleteReview);  
router.route("/admin/products").get(verifyUser,roleBasedAccess("admin"),getAllProductsByAdmin);  

//delete review



export default router;