"use client";

import React from 'react';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryPage({ 
  products, 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  onProductClick 
}) {
  const { t } = useLanguage();

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-light text-gray-900 mb-4">
          {t.gallery.title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.gallery.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full transition cursor-pointer ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
            showAddToCart={false}
          />
        ))}
      </div>
    </>
  );
}