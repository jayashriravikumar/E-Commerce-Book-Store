import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter product name"],
  },
  author: {
    type: String,
    required: [true, "Please enter product author"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  ratings: {
    type:Number,
    default: 0,
  },
  brand: {
    type: String,
    default: "BookStore",
    index: true,
  },
  colors: [{
    type: String,
    trim: true,
    index: true,
  }],
  sizes: [{
    type: String,
    trim: true,
    index: true,
  }],
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    index: true,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
    index: true,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
    index: true,
  },
  image: [
    {
      public_id: {
        type: String,
        required: [true],
      },
      url: {
        type: String, required: [true],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    default: 1,
    index: true,
  },
  relatedProducts: [
    {
      title: { type: String },
      author: { type: String },
      price: { type: Number },
      image: { type: String },
    },
  ],
  reviews: [
    {
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true},
    }
],
  createdAt:{
    type: Date,
    default: Date.now,
  },
});

ProductSchema.index({ category: 1, brand: 1, price: 1, ratings: -1 });

export default mongoose.model("Product", ProductSchema);
