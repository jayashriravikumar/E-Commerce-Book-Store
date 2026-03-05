import express from 'express';
import { addProducts,getAllProducts, getSingleProduct,updateProduct,deleteProduct } from '../controller/productcontroller.js';
const router = express.Router();

router.route("/products").get(getAllProducts).post(addProducts);
//   router.get("/product/:id",getSingleProduct);
router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);
export default router;