"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

export default function WelcomePage({ featuredProducts, onProductClick, showSlider = true }) {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">

      {/* Hero Section - Full Cover with Parallax */}
      <div className="relative w-full h-screen -mt-16 overflow-hidden">
        <img
          src="/images/hero-1920_01.jpg"
          srcSet="/images/hero-1920_01.jpg 1920w, /images/hero-3840_01.jpg 3840w"
          sizes="100vw"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        {/* Overlay mit Text */}
        <div className="absolute inset-0 flex flex-col items-start justify-end pb-32 pl-64 md:pl-80 lg:pl-96 bg-black/30 p-8">
          <h2 className="mb-6" style={{ color: '#ffffff', fontFamily: "'Vollkorn', serif", fontWeight: '400', fontSize: '42px', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
            {t.welcome.title}
          </h2>
          <p className="text-xl mb-4" style={{ color: '#ffffff', fontFamily: "'EB Garamond', serif", fontWeight: '400', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            {t.welcome.subtitle}
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="/about"
              className="px-6 py-2 bg-white text-gray-900 hover:bg-gray-100 transition rounded cursor-pointer inline-block text-center text-sm"
            >
              {t.welcome.viewGallery}
            </Link>
            <Link
              href="/shop"
              className="px-6 py-2 border border-white text-white hover:bg-white/10 transition rounded cursor-pointer inline-block text-center text-sm"
            >
              {t.welcome.visitShop}
            </Link>
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
      <div className="mb-12 px-8 scale-90 origin-center">
        <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
          {t.welcome.featured}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              showAddToCart={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}