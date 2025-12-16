"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760299238/P2090288_flyxoj.png",
    title: "Willkommen in der Galerie",
    subtitle: "Entdecken Sie zeitgenössische Ölmalerei",
    buttonText: "Zur Galerie",
    buttonLink: "/gallery"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760299238/P2090288_flyxoj.png",
    title: "Landschaften der Uckermark",
    subtitle: "Atmosphärische Impressionen aus Brandenburg",
    buttonText: "Entdecken",
    buttonLink: "/gallery"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760299238/P2090288_flyxoj.png",
    title: "Seestücke",
    subtitle: "Die Weite des Meeres eingefangen in Öl",
    buttonText: "Mehr erfahren",
    buttonLink: "/gallery"
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760299238/P2090288_flyxoj.png",
    title: "Neue Werke",
    subtitle: "Aktuelle Arbeiten aus dem Atelier",
    buttonText: "Ansehen",
    buttonLink: "/news"
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760299238/P2090288_flyxoj.png",
    title: "Originale kaufen",
    subtitle: "Einzigartige Kunstwerke für Ihr Zuhause",
    buttonText: "Zum Shop",
    buttonLink: "/shop"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg mb-12">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-20">
            <h2 
              className={`text-4xl md:text-6xl font-light text-white mb-4 transition-all duration-700 ${
                index === currentSlide 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {slide.title}
            </h2>
            
            <p 
              className={`text-lg md:text-xl text-gray-200 mb-8 max-w-2xl transition-all duration-700 ${
                index === currentSlide 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {slide.subtitle}
            </p>
            
            <Link
              href={slide.buttonLink}
              className={`px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-700 rounded font-medium ${
                index === currentSlide 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-all"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-all"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}