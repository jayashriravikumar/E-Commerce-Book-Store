import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Harry Potter",
    subtitle: "A magical journey begins.",
    image: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg",
    productId: "69ae94412db6439b33d799b9",
  },
  {
    title: "Rich Dad Poor Dad",
    subtitle: "Learn financial freedom.",
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL._SL1500_.jpg",
    productId: "69ae94412db6439b33d799bb",
  },
  {
    title: "Clean Code",
    subtitle: "Write better software.",
    image: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg",
    productId: "69ae94412db6439b33d799c9",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  
  return (
    <section className="max-w-[1500px] mx-auto px-2 md:px-5 mt-2 md:mt-6">
      <div className="relative bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-3xl overflow-hidden border border-gray-200">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
         className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg w-14 h-14 rounded-full items-center justify-center hover:scale-105 transition"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg w-14 h-14 rounded-full items-center justify-center hover:scale-105 transition"
        >
          <ChevronRight size={28} />
        </button>

        {/* Main Content */}
<div className="min-h-[250px] md:h-[500px] flex flex-col-reverse md:flex-row items-center justify-between px-5 md:px-24 py-8 md:py-0">

          {/* Left Content */}
          <div className="max-w-xl text-center md:text-left">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-base mb-3 md:mb-5">
              Best Seller Collection
            </p>

            <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              {slides[current].title}
            </h1>

            <p className="text-sm md:text-xl text-gray-500 mt-3 md:mt-6 leading-relaxed">
              {slides[current].subtitle}
            </p>

            <div className="flex gap-5 mt-10">
              <button
                onClick={() => navigate("/products")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Shop Now
              </button>

              <button
              onClick={() => navigate(`/product/${slides[current].productId}`)}
              className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition"
            >
              View Details
            </button>
            </div>
          </div>

          {/* Right Book Image */}
          <div className="flex items-center justify-center mb-6 md:mb-0">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-[170px] h-[220px] sm:w-[220px] sm:h-[300px] md:w-[350px] md:h-[450px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all ${
                current === index ? "w-10 bg-blue-600" : "w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
