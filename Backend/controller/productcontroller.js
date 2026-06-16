import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";
import { buildProductCatalog, buildProductQuery } from "../utils/productCatalog.js";

const fallbackProducts = buildProductCatalog();

export const addProducts = async (req, res,next) => {
  //console.log(req.body);
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
  const page = Number(req.query.page) || 1;
  const resultsPerPage = Math.max(1, Number(req.query.limit) || 12);
  const criteria = buildProductQuery(req.query);

  const productCount = await Product.countDocuments(criteria);
  const totalPages = Math.max(1, Math.ceil(productCount / resultsPerPage));

  if (page > totalPages) {
    return next(new errorHandler(`Page ${page} does not exist`, 404));
  }

  const skip = resultsPerPage * (page - 1);
  let products = [];

  try {
    products = await Product.find(criteria)
      .sort({ isBestSeller: -1, isNewArrival: -1, createdAt: -1, title: 1 })
      .skip(skip)
      .limit(resultsPerPage);
  } catch (error) {
    const filteredFallbackProducts = fallbackProducts.filter((product) => {
      const matchesCategory = !criteria.category || criteria.category.$in?.includes(product.category);
      const matchesBrand = !criteria.brand || criteria.brand.$in?.includes(product.brand);
      const matchesColor = !criteria.colors || product.colors?.some((color) => criteria.colors.$in.includes(color));
      const matchesSize = !criteria.sizes || product.sizes?.some((size) => criteria.sizes.$in.includes(size));
      const matchesPrice = !criteria.price || (
        (criteria.price.$gte === undefined || product.price >= criteria.price.$gte) &&
        (criteria.price.$lte === undefined || product.price <= criteria.price.$lte)
      );
      const matchesRating = !criteria.ratings || product.ratings >= criteria.ratings.$gte;
      const matchesDiscount = !criteria.discount || product.discount >= criteria.discount.$gte;
      const matchesAvailability = !criteria.stock || (
        criteria.stock.$gt ? product.stock > 0 : product.stock === 0
      );
      const matchesNewArrival = !criteria.isNewArrival || product.isNewArrival;
      const matchesBestSeller = !criteria.isBestSeller || product.isBestSeller;
      const matchesKeyword = !criteria.$or || criteria.$or.some((condition) => {
        const [field] = Object.keys(condition);
        const regex = condition[field].$regex;
        const value = String(product[field] || "");
        return new RegExp(regex, "i").test(value);
      });

      return matchesCategory && matchesBrand && matchesColor && matchesSize && matchesPrice && matchesRating && matchesDiscount && matchesAvailability && matchesNewArrival && matchesBestSeller && matchesKeyword;
    });

    products = filteredFallbackProducts.slice(skip, skip + resultsPerPage);
  }

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
    product = fallbackProducts.find((item) => item._id === id);

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }
  }
  res.status(200).json({
    success: true,
    product,
  });
};
