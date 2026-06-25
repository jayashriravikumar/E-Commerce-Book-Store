import Product from "../models/productModel.js";
import HandleError from "../helper/handleError.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res, next) => {
  try {
    const img = req.body.image;

    let imageArray = [];

    if (typeof img === "string" && img.trim()) {
      imageArray = [{ url: img, public_id: "manual" }];
    } 
    else if (Array.isArray(img) && img[0]?.url) {
      imageArray = img;
    } 
    else if (img?.url) {
      imageArray = [{ url: img.url, public_id: "manual" }];
    }

    const product = await Product.create({
      ...req.body,
      image: imageArray,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};


/* ================= GET ALL PRODUCTS ================= */

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } },
      ],
    });

    const normalized = products.map((p) => {
      const obj = p.toObject();

      const url =
        obj.image?.[0]?.url ||
        obj.coverImage?.[0]?.url ||
        "";

      return {
        ...obj,
        image: url ? [{ url }] : [],
      };
    });

    res.status(200).json({
      success: true,
      products: normalized,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET SINGLE PRODUCT ================= */
export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } },
      ],
    });

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    // Normalize coverImage → image (same as getAllProducts)
    const obj = product.toObject();
    const url = obj.image?.[0]?.url || obj.coverImage?.[0]?.url || "";
    const normalized = { ...obj, image: url ? [{ url }] : [] };

    res.status(200).json({
      success: true,
      product: normalized,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    product.name = req.body.name;
    product.title = req.body.title || req.body.name;
    product.author = req.body.author;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.category = req.body.category;
    product.description = req.body.description;

    await product.save();

    res.status(200).json({
      success: true,
      product,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    product.isDeleted = true;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= RESTORE PRODUCT ================= */
export const restoreProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    product.isDeleted = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product restored successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= PERMANENT DELETE PRODUCT ================= */
export const permanentDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product permanently deleted",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= ADMIN: GET ALL ================= */
export const getAllProductsByAdmin = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

/* ================= REVIEWS (PLACEHOLDERS) ================= */
export const createProductReview = async (req, res) =>
  res.status(200).json({ message: "Review feature coming soon" });

export const viewProductReviews = async (req, res) =>
  res.status(200).json({ message: "View reviews coming soon" });

export const adminDeleteReview = async (req, res) =>
  res.status(200).json({ message: "Delete review coming soon" });