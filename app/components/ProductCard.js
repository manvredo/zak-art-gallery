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
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    <div
      className="cursor-pointer group"
      style={{
        animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
      }}
      onClick={onClick}
    >
      {/* Image Container with Rounded Corners */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
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
              className="px-5 py-2 bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-100 transition rounded-full cursor-pointer text-sm"
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
