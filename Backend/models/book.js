import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: "General"
  },
  description: {
    type: String
  },
  shortDescription: {
    type: String
  },
  howToUse: {
    type: String
  },
  productDimensions: {
    type: String
  },
  packageContains: {
    type: [String],
    default: []
  },
  image: {
    type: String
  },
  relatedProducts: {
    type: [
      {
        title: String,
        author: String,
        price: Number,
        image: String
      }
    ],
    default: []
  }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
