import express from 'express';
import { addProducts,getAllProducts, getSingleProduct,updateProduct,deleteProduct } from '../controller/productcontroller.js';
const router = express.Router();

router.route("/").get(getAllProducts).post(addProducts);
router.route("/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);
export default router;
