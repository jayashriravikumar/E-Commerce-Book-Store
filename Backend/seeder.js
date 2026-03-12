import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config({ path: "./config/config.env" });

const books = [
  { title: "The Alchemist", author: "Paulo Coelho", description: "A story about following your dreams", price: 299, category: "Fiction", stock: 10, coverImage: [{ public_id: "book1", url: "https://example.com/book1.jpg" }] },
  { title: "Atomic Habits", author: "James Clear", description: "Tiny changes remarkable results", price: 499, category: "Self Help", stock: 15, coverImage: [{ public_id: "book2", url: "https://example.com/book2.jpg" }] },
  { title: "Harry Potter", author: "J.K. Rowling", description: "A young wizard's journey", price: 399, category: "Fantasy", stock: 20, coverImage: [{ public_id: "book3", url: "https://example.com/book3.jpg" }] },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", description: "Lessons about money and investing", price: 349, category: "Finance", stock: 12, coverImage: [{ public_id: "book4", url: "https://example.com/book4.jpg" }] },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A tale of wealth and obsession", price: 249, category: "Classic", stock: 8, coverImage: [{ public_id: "book5", url: "https://example.com/book5.jpg" }] },
  { title: "Python Crash Course", author: "Eric Matthes", description: "Learn Python programming fast", price: 599, category: "Technology", stock: 18, coverImage: [{ public_id: "book6", url: "https://example.com/book6.jpg" }] },
  { title: "To Kill a Mockingbird", author: "Harper Lee", description: "A story of racial injustice", price: 279, category: "Classic", stock: 10, coverImage: [{ public_id: "book7", url: "https://example.com/book7.jpg" }] },
  { title: "The Lean Startup", author: "Eric Ries", description: "How to build a successful startup", price: 449, category: "Business", stock: 14, coverImage: [{ public_id: "book8", url: "https://example.com/book8.jpg" }] },
  { title: "Deep Work", author: "Cal Newport", description: "Rules for focused success", price: 379, category: "Self Help", stock: 11, coverImage: [{ public_id: "book9", url: "https://example.com/book9.jpg" }] },
  { title: "1984", author: "George Orwell", description: "A dystopian social science fiction", price: 229, category: "Fiction", stock: 16, coverImage: [{ public_id: "book10", url: "https://example.com/book10.jpg" }] },
  { title: "Clean Code", author: "Robert C. Martin", description: "A handbook of agile software craftsmanship", price: 649, category: "Technology", stock: 9, coverImage: [{ public_id: "book11", url: "https://example.com/book11.jpg" }] },
  { title: "Think and Grow Rich", author: "Napoleon Hill", description: "The secret to achieving success", price: 299, category: "Self Help", stock: 13, coverImage: [{ public_id: "book12", url: "https://example.com/book12.jpg" }] },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected!");

    await Product.deleteMany();
    console.log("Old data deleted!");

    await Product.insertMany(books);
    console.log("12 books inserted successfully!");

    mongoose.connection.close();
    console.log("Connection closed!");

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedDB();