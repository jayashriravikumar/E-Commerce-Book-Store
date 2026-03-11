import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";

function HeroCarousel() {

  return (

    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000 }}
      loop={true}
    >

      <SwiperSlide>
        <div className="hero-slide slide1">
          <h1>📚 Discover Your Next Favorite Book</h1>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hero-slide slide2">
          <h1>Learn Programming & AI</h1>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hero-slide slide3">
          <h1>Build Better Habits With Books</h1>
        </div>
      </SwiperSlide>

    </Swiper>

  );

}

export default HeroCarousel;