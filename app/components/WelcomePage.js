"use client";
import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

export default function WelcomePage({ featuredProducts, onProductClick, showSlider = true }) {
  const { t } = useLanguage();
  
  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src="https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760299340/Gemini_Generated_Image_c9wnu5c9wnu5c9wn_inbghj.png" 
            alt="Artist Portrait"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h2 className="text-5xl font-light text-gray-900 mb-6">
            {t.welcome.title}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {t.welcome.subtitle}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.welcome.intro1}
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            {t.welcome.intro2}
          </p>
          
          <div className="flex gap-4">
            <Link 
              href="/gallery"
              className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded cursor-pointer inline-block text-center"
            >
              {t.welcome.viewGallery}
            </Link>
            <Link 
              href="/shop"
              className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-50 transition rounded cursor-pointer inline-block text-center"
            >
              {t.welcome.visitShop}
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Artworks */}
      <div className="mb-16">
        <h3 className="text-3xl font-light text-gray-900 mb-8 text-center">
          {t.welcome.featured}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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