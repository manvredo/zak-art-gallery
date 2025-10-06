"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductModal({ product, onClose, showAddToCart = false, onImageClick }) {
  if (!product) return null;

  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full rounded-lg cursor-pointer hover:opacity-90 transition"
              onClick={() => onImageClick && onImageClick(product.image)}
            />
          </div>
          <div>
            <button 
              onClick={onClose}
              className="float-right text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={24} />
            </button>
            <p className="text-sm text-gray-500 mb-2">{product.artist}</p>
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              {product.name}
            </h2>
            <p className="text-2xl font-light text-gray-900 mb-6">
              €{product.price.toLocaleString('en-US')}
            </p>
            
            <div className="border-t border-b border-gray-200 py-4 mb-6 space-y-2">
              <p className="text-sm">
                <span className="text-gray-600">{t.product.size}:</span> {product.size}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">{t.product.medium}:</span> {product.technique}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">{t.product.year}:</span> {product.year}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">{t.product.category}:</span> {product.category}
              </p>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {showAddToCart && (
              <button 
                onClick={handleAddToCart}
                className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded cursor-pointer"
              >
                {t.shop.addToCart}
              </button>
            )}

            <div className="mt-6 text-sm text-gray-600 space-y-2">
              <p>✓ {t.product.readyToShip}</p>
              <p>✓ {t.product.insuredShipping}</p>
              <p>✓ {t.product.returnPolicy}</p>
              <p>✓ {t.product.certificate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}