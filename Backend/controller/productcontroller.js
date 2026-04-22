import Product from "../models/productModel.js";
import APIHelper from "../helper/APIHelper.js";
import HandleError from "../helper/handleError.js";

export const addProducts = async (req, res,next) => {
  //console.log(req.body);
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndDelete(id);
  if (!product) {
    //return res.status(500).json({success:false,message:"Product not found"});
    return next(new HandleError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    //return res.status(500).json({success:false,message:"Product not found"});
    return next(new HandleError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

export const getAllProducts = async (req, res, next) => {
  //const products = await Product.find();
  const resultsPerPage = 6;
  const apiHelper = new APIHelper(Product.find(), req.query).search().filter();

  const fliteredQuery = apiHelper.query.clone();
  const productCount = await fliteredQuery.countDocuments();

  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (totalPages > 0 && page > totalPages) {
    return next(new HandleError(`Page ${page} does not exist`, 404));
  }
  apiHelper.pagination(resultsPerPage);

  const products = await apiHelper.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    totalPages,
    resultsPerPage,
    currentPage: page,
  });
};

export const getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};

export const createProductReview = async(req,res,next) => {
  const {rating,comment,productId} = req.body;
  const review = {
    user:req.user.id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if(!product){
    return next(new HandleError("Product not found", 400));
  }
  const reviewExists = product.reviews.find((review) => review.user.toString() === req.user.id.toString());
  if(reviewExists){
    //update the review
    product.reviews.forEach((review) => {
      if(review.user.toString() === req.user.id.toString()){
        review.rating = rating;
        review.comment = comment;
      }
  });
}else{
  //add the review
  product.reviews.push(review);
}
  product.numOfReviews = product.reviews.length;
  let sum=0;
  product.reviews.forEach((review) => {
    sum += review.rating;
  });
  product.ratings = product.reviews.length>0? sum/product.reviews.length: 0;
  await product.save({validateBeforeSave:false});
  res.status(200).json({
    success:true,
    product,
  });
};

export const viewProductReviews = async(req,res,next) => {
   const product = await Product.findById(req.query.id);
   if(!product){
     return next(new HandleError("Product not found", 400));
   }
   res.status(200).json({
     success:true,
     reviews: product.reviews,
   });
};

//admin view all products
export const getAllProductsByAdmin = async(req,res,next) => {
  const products = await Product.find();
  res.status(200).json({
    success:true,
    products,
  });
};

//delete review
export const adminDeleteReview = async(req,res,next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());
  let sum=0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length>0? sum/reviews.length: 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  },
  {new:true,runValidators:true});
  res.status(200).json({
    success: true,
    message: "Review deleted successfully"
  });
};

