import React, {useEffect, useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const images=[
    "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
    "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",
];

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() =>{
        const interval=setInterval(() => {
            setCurrent((prev) => (prev + 1)% images.length);
        }, 4000);
        return ()=> clearInterval(interval);
    },[]);
    const prevSlide = () => {
      setCurrent((prev) => (prev === 0 ? images.length -1 : prev - 1));
    };
    const nextSlide =() => {
      setCurrent((prev =>(prev + 1) % images.length));
    };
  return (
  <div className=" relative w-full shadow-lg overflow-hidden">
    {/* Slides */}
  <div className="flex transition-transform duration-700 ease-in-out" style=
  {{transform:`translateX(-${current*100}%)`}}>
    {images.map((image,index) =>(
        <img src={image} key={index} className="h-200
         w-full md:h-100 object-contain shrink-0"/>
    ))}
    </div>
    {/* Previous */}
    <button onClick={prevSlide} className="absolute left-4 top-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full
    transition">
      <ChevronLeft />  
        </button>
    {/* Next */}
    <button onClick={nextSlide} className="absolute right-4 top-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full
    transition">
      <ChevronRight />
    </button>
    {/* Indicators */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {images.map((_, index) => (
        <button key={index} onClick={() => setCurrent(index)} className={`h-2 rounded-full transition-all $
          {current === index? "w-6 bg-white": "w-2 bg-white/50"}`}></button>
      ))}
    </div>
  </div>
  );
};

export default ImageSlider;
