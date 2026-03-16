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
  },
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

export default mongoose.model("Product", ProductSchema);
