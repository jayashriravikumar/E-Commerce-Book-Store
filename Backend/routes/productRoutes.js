import express from 'express';
import { addProducts,getAllProducts, getSingleProduct,updateProduct,deleteProduct } from '../controller/productcontroller.js';
import { verifyUser,roleBasedAccess } from '../helper/userAuth.js';
const router = express.Router();

router.route("/products").get(verifyUser, getAllProducts).post(verifyUser,roleBasedAccess("admin"),addProducts);
//   router.get("/product/:id",getSingleProduct);
router.route("/product/:id").get(getSingleProduct).put(verifyUser,roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);
export default router;