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
  console.log("🔥 NEW GET FUNCTION RUNNING");
  
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const obj = product.toObject();
    obj.numOfReviews = 999;
obj.ratings = 999;

    // 🔥 recalc ratings dynamically
    const reviews = obj.reviews || [];

    const count = reviews.length;

    const total = reviews.reduce(
      (acc, r) => acc + Number(r.rating || 0),
      0
    );

    obj.numOfReviews = count;
    obj.ratings = count > 0 ? total / count : 0;

    return res.status(200).json({
      success: true,
      product: obj,
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
export const createProductReview = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);

    // 🔥 ALWAYS recalc fresh from array
    const reviews = product.reviews;

    const count = reviews.length;

    const total = reviews.reduce(
      (acc, r) => acc + Number(r.rating || 0),
      0
    );

    const avg = count > 0 ? total / count : 0;

    // 🔥 force overwrite (important)
    product.numOfReviews = count;
    product.ratings = avg;

    await product.markModified("reviews");
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const viewProductReviews = async (req, res) =>
  res.status(200).json({ message: "View reviews coming soon" });

export const adminDeleteReview = async (req, res) => {
  console.log("🔥 adminDeleteReview called");
  try {
    const { productId, reviewId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 Remove review by id
    product.reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== reviewId
    );

    // 🔥 Recalculate
    const count = product.reviews.length;

    const total = product.reviews.reduce(
      (acc, r) => acc + Number(r.rating || 0),
      0
    );

    product.numOfReviews = count;
    product.ratings = count > 0 ? total / count : 0;

 console.log("Reviews after filter:", product.reviews);
console.log("Review count:", product.reviews.length);

console.log("Before save");

await product.save();

console.log("After save");

const updatedProduct = await Product.findById(productId);

console.log("Saved reviews:", updatedProduct.reviews);
console.log("Saved count:", updatedProduct.reviews.length);

return res.status(200).json({
  success: true,
  message: "Review deleted successfully",
  product: updatedProduct,
});

} catch (error) {
  console.error("DELETE REVIEW ERROR:");
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};