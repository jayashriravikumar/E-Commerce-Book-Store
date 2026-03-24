import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BookCard from "../components/BookCard";

const books = [
  {
    title: "Atomic Habits",
    category: "Self-Help",
    price: 499,
    description: "Build good habits and break bad ones.",
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL._SY522_.jpg"
  },
  {
    title: "Think and Grow Rich",
    category: "Self-Help",
    price: 399,
    description: "Success mindset and wealth creation.",
    image: "https://m.media-amazon.com/images/I/71UypkUjStL._SY522_.jpg"
  },
  {
    title: "Ikigai",
    category: "Self-Help",
    price: 350,
    description: "Find your purpose in life.",
    image: "https://m.media-amazon.com/images/I/81l3rZK4lnL._SY522_.jpg"
  },
  {
    title: "Rich Dad Poor Dad",
    category: "Finance",
    price: 450,
    description: "Financial education and mindset.",
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL._SY522_.jpg"
  },
  {
    title: "The Psychology of Money",
    category: "Finance",
    price: 499,
    description: "Understanding money behavior.",
    image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY522_.jpg"
  },
  {
    title: "The Alchemist",
    category: "Fiction",
    price: 399,
    description: "Follow your dreams.",
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._SY522_.jpg"
  },
  {
    title: "The Hobbit",
    category: "Fiction",
    price: 499,
    description: "Adventure fantasy story.",
    image: "https://m.media-amazon.com/images/I/91b0C2YNSrL._SY522_.jpg"
  },
  {
    title: "1984",
    category: "Fiction",
    price: 350,
    description: "Dystopian novel.",
    image: "https://m.media-amazon.com/images/I/71kxa1-0mfL._SY522_.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    category: "Fiction",
    price: 399,
    description: "Justice and morality.",
    image: "https://m.media-amazon.com/images/I/81Otwki3ixL._SY522_.jpg"
  },
  {
    title: "Diary of a Wimpy Kid",
    category: "Comedy",
    price: 299,
    description: "Funny school life.",
    image: "https://m.media-amazon.com/images/I/91Q6g4GfZkL._SY522_.jpg"
  },
  {
    title: "Bossypants",
    category: "Comedy",
    price: 350,
    description: "Humorous autobiography.",
    image: "https://m.media-amazon.com/images/I/71Y6p1v3i-L._SY522_.jpg"
  },
  {
    title: "Lucent General Knowledge",
    category: "Education",
    price: 300,
    description: "Best for SSC exams.",
    image: "https://m.media-amazon.com/images/I/81h4CdNxdXL._SY522_.jpg"
  },
  {
    title: "Quantitative Aptitude - RS Aggarwal",
    category: "Education",
    price: 550,
    description: "Aptitude preparation.",
    image: "https://m.media-amazon.com/images/I/81vpsIs58WL._SY522_.jpg"
  },
  {
    title: "Objective General English",
    category: "Education",
    price: 400,
    description: "English for exams.",
    image: "https://m.media-amazon.com/images/I/71VbHaAqbML._SY522_.jpg"
  },
  {
    title: "Fast Track Arithmetic",
    category: "Education",
    price: 500,
    description: "Shortcut maths tricks.",
    image: "https://m.media-amazon.com/images/I/81WcnNQ-TBL._SY522_.jpg"
  }
];

export default function Home({ cart, setCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div>
      <Navbar cart={cart} />
      <Hero />

      <Categories setSelectedCategory={setSelectedCategory} />

      <div className="grid grid-cols-3 gap-6 px-10">
        {filteredBooks.map((book, index) => (
          <BookCard
            key={index}
            book={book}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}