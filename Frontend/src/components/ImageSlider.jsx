import React, {useEffect, useState} from "react";

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
  return (
  <div className="w-full shadow-lg overflow-hidden">
    {/* Slides */}
  <div className="flex transition-transform duration-700 ease-in-out" style=
  {{transform:`translateX(-${current*100}%)`}}>
    {images.map((image,index) =>(
        <img src={image} key={index} className="h-200 w-full md:h-100 object-contain shrink-0"/>
    ))}
    </div>
  </div>
  );
};

export default ImageSlider;
