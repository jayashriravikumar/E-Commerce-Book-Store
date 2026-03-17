import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import Book from "./models/book.js";
import books from "./data/books.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const seedBooks = async () => {
  try {
    await connectDB();

    for (const book of books) {
      await Book.updateOne(
        { title: book.title, author: book.author },
        { $set: book },
        { upsert: true }
      );
    }

    console.log(`Seeded ${books.length} books successfully.`);
  } catch (error) {
    console.log(`Seeder error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedBooks();
