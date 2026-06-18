import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";
import HandleError from "../helper/handleError.js";

export const addToWishlist = async(req,res,next)=>{
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if(!product){
        return next(new HandleError("Product not found",404));
    }

    let wishlist = await Wishlist.findOne({
        user:req.user._id,
    });

    if(!wishlist){
        wishlist = await Wishlist.create({
            user:req.user._id,
            products:[productId],
        });
    }
    else{

        const alreadyExists = wishlist.products.some(
            (id)=>id.toString() === productId
        );

        if(!alreadyExists){
            wishlist.products.push(productId);
            await wishlist.save();
        }
    }

    res.status(200).json({
        success:true,
        message:"Added to wishlist",
    });
};

export const getWishlist = async(req,res,next)=>{

    const wishlist = await Wishlist.findOne({
        user:req.user._id,
    }).populate("products");

    res.status(200).json({
        success:true,
        products:wishlist?.products || [],
    });
};

export const removeFromWishlist = async(req,res,next)=>{

    const productId = req.params.id;

    const wishlist = await Wishlist.findOne({
        user:req.user._id,
    });

    if(!wishlist){
        return next(new HandleError("Wishlist not found",404));
    }

    wishlist.products = wishlist.products.filter(
        (item)=>item.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
        success:true,
        message:"Removed from wishlist",
    });
};