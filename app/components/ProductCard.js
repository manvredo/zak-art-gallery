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
      className="cursor-pointer group"
      onClick={onClick}
    >
      {/* Image Container with Rounded Corners */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
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

      {/* Plain Text Below - No Box/Border */}
      <div className="pt-2">
        <p className="text-sm text-gray-500">{product.artist}</p>
        <h3 className="text-base font-light text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-600">{product.size}</p>

        {showAddToCart ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-base text-gray-900">€{product.price.toLocaleString('en-US')}</span>
            <button
              onClick={handleAddToCart}
              className="px-3 py-1 bg-gray-900 text-white text-xs hover:bg-gray-800 transition rounded cursor-pointer"
            >
              {t.shop.addToCart}
            </button>
          </div>
        ) : (
          <p className="text-base text-gray-900">€{product.price.toLocaleString('en-US')}</p>
        )}
      </div>
    </div>
  );
}
