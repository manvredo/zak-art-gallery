"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product, onClick, showAddToCart = false }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className="cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Plain Text Below */}
      <div className="pt-2">
        <p className="text-sm text-gray-600">{product.name}</p>
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
