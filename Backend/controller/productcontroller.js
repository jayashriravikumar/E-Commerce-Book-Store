import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";

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
    return next(new errorHandler("Product not found", 404));
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
    return next(new errorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

export const getAllProducts = async (req, res, next) => {
  //const products = await Product.find();
  const resultsPerPage = 4;
  const apiHelper = new APIHelper(Product.find(), req.query).search().filter();

  const fliteredQuery = apiHelper.query.clone();
  const productCount = await fliteredQuery.countDocuments();

  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (totalPages > 0 && page > totalPages) {
    return next(new errorHandler(`Page ${page} does not exist`, 404));
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
    return next(new errorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};
