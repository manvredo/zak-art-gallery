"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

const heroImages = [
  { desktop: '/images/hero-1920_01.jpg', full: '/images/hero-3840_01.jpg' },
  { desktop: '/images/hero-1920_02.jpg', full: '/images/hero-3840_02.jpg' },
  { desktop: '/images/hero-1920_03.jpg', full: '/images/hero-3840_03.jpg' },
  { desktop: '/images/hero-1920_04.jpg', full: '/images/hero-3840_04.jpg' },
  { desktop: '/images/hero-1920_05.jpg', full: '/images/hero-3840_05.jpg' },
];

export default function WelcomePage({ featuredProducts, onProductClick, showSlider = true }) {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentHero, setCurrentHero] = useState(0);
  const [initialFadeIn, setInitialFadeIn] = useState(false);

  useEffect(() => {
    setInitialFadeIn(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
      setImageLoaded(false);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">

      {/* Hero Section - Full Cover with Parallax & Image Rotation */}
      <div className="relative w-full h-screen -mt-24 overflow-hidden bg-[#0f0f0f]">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img.desktop}
            srcSet={`${img.desktop} 1920w, ${img.full} 3840w`}
            sizes="100vw"
            alt={`Hero ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentHero && initialFadeIn ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'opacity',
            }}
            onLoad={() => setImageLoaded(true)}
          />
        ))}
        {/* Navigation Dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentHero
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Bild ${index + 1}`}
            />
          ))}
        </div>

        {/* Overlay mit Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-8">
          <h2 className="mb-6" style={{ color: '#ffffff', fontFamily: "'Vollkorn', serif", fontWeight: '400', fontSize: '42px', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
            {t.welcome.title}
          </h2>
          <p className="text-2xl mb-4" style={{ color: '#ffffff', fontFamily: 'var(--font-inter), sans-serif', fontWeight: '400', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            {t.welcome.subtitle}
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="/about"
              className="px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 transition rounded-full cursor-pointer inline-block text-center text-sm font-medium"
            >
              {t.welcome.viewGallery}
            </Link>
            <Link
              href="/shop"
              className="px-6 py-2 bg-transparent text-white hover:bg-white/10 transition rounded-full cursor-pointer inline-block text-center text-sm font-medium border border-white"
            >
              {t.welcome.visitShop}
            </Link>
          </div>
          <div className="mt-6">
            <a
              href="https://artwingman.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-transparent text-white hover:bg-white/10 transition rounded-full cursor-pointer inline-block text-center text-sm font-medium border border-white"
            >
              Art Wingman
            </a>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-3xl mx-auto px-8 py-12">
        <p className="text-base leading-relaxed mb-4 text-center" style={{ color: '#010101' }}>
          {t.welcome.intro1}
        </p>
        <p className="text-base leading-relaxed mb-8 text-center" style={{ color: '#010101' }}>
          {t.welcome.intro2}
        </p>
      </div>

      {/* Featured Artworks */}
      <div className="mb-12 px-8">
        <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
          {t.welcome.featured}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[113px] gap-x-8 max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              showAddToCart={true}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}