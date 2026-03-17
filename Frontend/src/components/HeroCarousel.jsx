import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    className: "slide1",
    eyebrow: "Editor's Picks",
    title: "Stories, skills, and ideas worth taking home",
    description: "Browse thoughtful books for self-growth, technology, business, and everyday inspiration.",
    primaryAction: { label: "Shop Books", to: "/books" },
    secondaryAction: { label: "Featured Titles", to: "/books" }
  },
  {
    className: "slide2",
    eyebrow: "Learn Better",
    title: "Programming, AI, and practical knowledge in one place",
    description: "Find books that help you build technical depth, sharpen problem-solving, and grow faster.",
    primaryAction: { label: "Explore Tech", to: "/books" },
    secondaryAction: { label: "Browse Collection", to: "/books" }
  },
  {
    className: "slide3",
    eyebrow: "Daily Growth",
    title: "Build habits and mindset with books that stay useful",
    description: "Choose meaningful reads for discipline, focus, creativity, and personal development.",
    primaryAction: { label: "Start Reading", to: "/books" },
    secondaryAction: { label: "View Bestsellers", to: "/books" }
  }
];

function HeroCarousel() {
  return (
    <section className="hero-shell">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className={`hero-slide ${slide.className}`}>
              <div className="hero-slide-content">
                <p className="hero-eyebrow">{slide.eyebrow}</p>
                <h1>{slide.title}</h1>
                <p className="hero-description">{slide.description}</p>

                <div className="hero-actions">
                  <Link to={slide.primaryAction.to} className="hero-primary">
                    {slide.primaryAction.label}
                  </Link>
                  <Link to={slide.secondaryAction.to} className="hero-secondary">
                    {slide.secondaryAction.label}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;
