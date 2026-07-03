import Product from "../models/productModel.js";

// GET ALL REVIEWS (from MongoDB products)
export const getAllReviews = async (req, res) => {
  try {
    const products = await Product.find({
      isDeleted: false,
      "reviews.0": { $exists: true },
    });

    const allReviews = [];

    products.forEach((product) => {
      product.reviews.forEach((review) => {
        allReviews.push({
          productId: product._id,
          productName: product.name,
          user: review.user,
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt || null,
        });
      });
    });

    res.status(200).json({
      success: true,
      count: allReviews.length,
      reviews: allReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};