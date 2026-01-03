"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import FavoriteButton from './FavoriteButton';

export default function ProductCard({ product, onClick, showAddToCart = false }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group"
      onClick={onClick}
    >
      {/* Image Container with Favorite Button */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        
        {/* Favorite Button - Top Right */}
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton productId={product.id} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-1">{product.artist}</p>
        <h3 className="text-lg font-light text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.size}</p>
        
        {showAddToCart ? (
          <div className="flex justify-between items-center">
            <span className="text-xl font-light text-gray-900">
              €{product.price.toLocaleString('en-US')}
            </span>
            <button 
              onClick={handleAddToCart}
              className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition rounded cursor-pointer"
            >
              {t.shop.addToCart}
            </button>
          </div>
        ) : (
          <p className="text-xl font-light text-gray-900">
            €{product.price.toLocaleString('en-US')}
          </p>
        )}
      </div>
    </div>
  );
}