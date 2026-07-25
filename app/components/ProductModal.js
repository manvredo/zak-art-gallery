'use client';

import { X, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [justAdded, setJustAdded] = useState(false);
  
  const { language, t } = useLanguage();
  const { isInCart } = useCart();

  if (!product) return null;

  const alreadyInCart = isInCart(product.id);
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  const pm = t.productModal;
  const isSold = product.sold === true;
  const isAvailable = product.available !== false && !isSold;

  const handleAddToCart = () => {
    if (alreadyInCart || !isAvailable) return; // Don't add if already in cart or not for sale

    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{product.artist}</p>
              <h2 className="text-2xl font-light text-gray-900">{product.name}</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left: Large Image with Zoom */}
          <div className="space-y-4">
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                {pm.enlarge}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Close-up Detail Image */}
            {product.detail_image && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">{pm.closeUp}</p>
                <div className="overflow-hidden rounded-lg shadow-lg aspect-[2/1]">
                  <img
                    src={product.detail_image}
                    alt={`${product.name} – ${pm.closeUp}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Premium Price Box */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="text-4xl font-light text-gray-900 mb-2">
                €{product.price.toLocaleString(locale)}
              </div>
              <p className="text-sm text-gray-600 mb-4">{pm.inclVAT}</p>

              {/* Add to Cart Button - Changes based on cart/availability status */}
              {!isAvailable ? (
                <button
                  disabled
                  className="w-full py-4 bg-gray-200 text-gray-500 rounded-lg font-medium text-lg cursor-not-allowed"
                >
                  {isSold ? pm.sold : pm.notAvailable}
                </button>
              ) : alreadyInCart || justAdded ? (
                <Link
                  href="/cart"
                  className="w-full py-4 bg-green-600 text-white rounded-lg font-medium text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition"
                >
                  <Check size={20} />
                  {pm.added || 'Im Warenkorb'} – {pm.viewCart || 'Ansehen'}
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded-lg font-medium text-lg"
                >
                  {pm.addToCart}
                </button>
              )}
            </div>

            {/* Technical Details Table */}
            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">{pm.technicalDetails}</h3>
              <div className="space-y-3 text-lg">
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.size}:</span>
                  <span className="text-gray-900 font-medium">{product.size}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.technique}:</span>
                  <span className="text-gray-900 font-medium">{product.technique}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.year}:</span>
                  <span className="text-gray-900 font-medium">{product.year}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.category}:</span>
                  <span className="text-gray-900 font-medium">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-4 text-sm text-gray-700">
              <h3 className="text-sm font-medium text-gray-900">{pm.shippingReturns}</h3>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{pm.shippingTitle}</h4>
                <p className="mb-2">{pm.shippingText}</p>
                <p className="text-gray-600">{pm.shippingDetails}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">{pm.returnsTitle}</h4>
                <p>{pm.returnsText}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">{pm.paymentTitle}</h4>
                <p className="text-gray-600">{pm.paymentMethods}</p>
              </div>
            </div>

            {/* Trust Badges Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.freeShipping}<br/>{pm.freeShippingDetail}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.insuredUp}<br/>{pm.insuredDetail}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.originalWith}<br/>{pm.originalDetail}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600" style={{ fontFamily: "'Vollkorn', Georgia, serif" }}>{pm.daysReturn}<br/>{pm.returnDetail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}