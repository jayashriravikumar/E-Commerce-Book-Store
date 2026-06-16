import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import Book from "./models/book.js";
import Product from "./models/productModel.js";
import books from "./data/books.js";
import { buildProductCatalog } from "./utils/productCatalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const seedBooks = async () => {
  try {
    await connectDB();
    const products = buildProductCatalog(books);

    for (const book of books) {
      const bookDoc = { ...book };
      if (bookDoc._id) delete bookDoc._id;

      await Book.updateOne(
        { title: book.title, author: book.author },
        { $set: bookDoc },
        { upsert: true }
      );
    }

    for (const product of products) {
      const productDoc = { ...product };
      if (productDoc._id) delete productDoc._id;

      // normalize image field to array of objects { public_id, url }
      if (productDoc.image) {
        if (typeof productDoc.image === "string") {
          productDoc.image = [
            {
              public_id: "",
              url: productDoc.image,
            },
          ];
        } else if (Array.isArray(productDoc.image)) {
          productDoc.image = productDoc.image.map((img) =>
            typeof img === "string" ? { public_id: "", url: img } : img
          );
        }
      }

      await Product.updateOne(
        { title: product.title, author: product.author },
        { $set: productDoc },
        { upsert: true }
      );
    }

    console.log(`Seeded ${books.length} books and ${products.length} products successfully.`);
  } catch (error) {
    console.log(`Seeder error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedBooks();
