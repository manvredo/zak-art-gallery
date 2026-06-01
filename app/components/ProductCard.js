"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import FavoriteButton from './FavoriteButton';

export default function ProductCard({ product, onClick, showAddToCart = false, index = 0 }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className="cursor-pointer group animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      {/* Image Container with Rounded Corners */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-3 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] group-hover:translate-y-[12px] group-hover:scale-[1.045] group-hover:outline group-hover:outline-3 group-hover:outline-gray-300 transition-transform duration-200 ease-in transition-shadow duration-200 ease-in will-change-transform">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition duration-200 ease-in"
        />

        {/* Favorite Button - Top Right */}
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton productId={product.id} />
        </div>
      </div>

      {/* Plain Text Below - With proper spacing */}
      <div className="pl-1">
        <p className="text-sm text-gray-500 mb-1">{product.artist}</p>
        <h3 className="text-base font-light text-gray-900 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-3">{product.size}</p>

        {showAddToCart ? (
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-light text-gray-900">
              €{product.price.toLocaleString('en-US')}
            </span>
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-100 transition rounded-full cursor-pointer text-sm"
            >
              {t.shop.addToCart}
            </button>
          </div>
        ) : (
          <p className="text-lg font-light text-gray-900">
            €{product.price.toLocaleString('en-US')}
          </p>
        )}
      </div>
    </div>
  );
}
