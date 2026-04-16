import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config({ path: "./config/config.env" });
// const userId = "69df2ebb1dba3ed0698eff97";

const products = [
  { title: "The Alchemist", author: "Paulo Coelho", description: "A story about following your dreams", price: 299, category: "Fiction", stock: 10,image: [{ public_id: "book1", url: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg" }] },
  { title: "Atomic Habits", author: "James Clear", description: "Tiny changes remarkable results", price: 499, category: "Self Help", stock: 15, image: [{ public_id: "book2", url: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" }] },
  { title: "Harry Potter", author: "J.K. Rowling", description: "A young wizard's journey", price: 399, category: "Fantasy", stock: 20, image: [{ public_id: "book3", url: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg" }] },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", description: "Lessons about money and investing", price: 349, category: "Finance", stock: 12, image: [{ public_id: "book4", url: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg" }] },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A tale of wealth and obsession", price: 249, category: "Classic", stock: 8, image: [{ public_id: "book5", url: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg" }] },
  { title: "Python Crash Course", author: "Eric Matthes", description: "Learn Python programming fast", price: 599, category: "Technology", stock: 18, image: [{ public_id: "book6", url:  "https://m.media-amazon.com/images/I/71wCs6q1v-L.jpg" }] },
  { title: "To Kill a Mockingbird", author: "Harper Lee", description: "A story of racial injustice", price: 279, category: "Classic", stock: 10, image: [{ public_id: "book7", url: "https://m.media-amazon.com/images/I/81Otwki3IxL.jpg" }] },
  { title: "The Lean Startup", author: "Eric Ries", description: "How to build a successful startup", price: 449, category: "Business", stock: 14, image: [{ public_id: "book8", url: "https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg" }] },
  { title: "Deep Work", author: "Cal Newport", description: "Rules for focused success", price: 379, category: "Self Help", stock: 11, image: [{ public_id: "book9", url: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg" }] },
  { title: "1984", author: "George Orwell", description: "A dystopian social science fiction", price: 229, category: "Fiction", stock: 16, image: [{ public_id: "book10", url: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg"  }] },
  { title: "Clean Code", author: "Robert C. Martin", description: "A handbook of agile software craftsmanship", price: 649, category: "Technology", stock: 9, image: [{ public_id: "book11", url: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" }] },
  { title: "Think and Grow Rich", author: "Napoleon Hill", description: "The secret to achieving success", price: 299, category: "Self Help", stock: 13,image: [{ public_id: "book12", url: "https://m.media-amazon.com/images/I/71UypkUjStL.jpg" }] },
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