import express from "express";
import mongoose from "mongoose";
import Book from "../models/book.js";
import seedBooks from "../data/books.js";

const router = express.Router();

const buildFallbackId = (book) =>
  `${book.title}-${book.author}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const fallbackBooks = seedBooks.map((book) => ({
  ...book,
  _id: buildFallbackId(book),
}));

const syncSeedBooks = async () => {
  for (const book of seedBooks) {
    await Book.updateOne(
      { title: book.title, author: book.author },
      { $setOnInsert: book },
      { upsert: true }
    );
  }
};

/* GET all books */

router.get("/", async (req,res)=>{
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(fallbackBooks);
    }

    await syncSeedBooks();
    const books = await Book.find();
    res.json(books.length ? books : fallbackBooks);
  } catch (error) {
    res.json(fallbackBooks);
  }

});

router.get("/:id", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const fallbackBook = fallbackBooks.find((book) => book._id === req.params.id);

      if (!fallbackBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.json(fallbackBook);
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      const fallbackBook = fallbackBooks.find((item) => item._id === req.params.id);

      if (!fallbackBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.json(fallbackBook);
    }

    res.json(book);
  } catch (error) {
    const fallbackBook = fallbackBooks.find((book) => book._id === req.params.id);

    if (!fallbackBook) {
      return res.status(500).json({ message: error.message });
    }

    res.json(fallbackBook);
  }
});

/* CREATE new book */

router.post("/", async (req,res)=>{

  try{

    const book = new Book(req.body);

    const savedBook = await book.save();

    res.status(201).json(savedBook);

  }catch(error){

    res.status(500).json({message:error.message});

  }

});

export default router;
