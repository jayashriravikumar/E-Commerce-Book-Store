import express from "express";

import {
addToWishlist,
getWishlist,
removeFromWishlist,
} from "../controller/wishlistController.js";

import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.route("/wishlist")
.get(verifyUser,getWishlist);

router.route("/wishlist/add/:id")
.post(verifyUser,addToWishlist);

router.route("/wishlist/remove/:id")
.delete(verifyUser,removeFromWishlist);

export default router;