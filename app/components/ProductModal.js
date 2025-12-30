'use client';

import { X, Award, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('description');
  const [justAdded, setJustAdded] = useState(false);
  
  const { language, t } = useLanguage();
  const { isInCart } = useCart();

  if (!product) return null;

  const alreadyInCart = isInCart(product.id);
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  const pm = t.productModal;

  const handleAddToCart = () => {
    if (alreadyInCart) return; // Don't add if already in cart
    
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
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

            {/* Status Badges */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
                <Check size={16} />
                {pm.available}
              </div>
              <div className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                <Award size={16} />
                {pm.original}
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Premium Price Box */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="text-4xl font-light text-gray-900 mb-2">
                €{product.price.toLocaleString(locale)}
              </div>
              <p className="text-sm text-gray-600 mb-4">{pm.inclVAT}</p>
              
              {/* Quick Info Icons */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-xs text-gray-600">
                <div className="text-center">
                  <div className="mb-1">📦</div>
                  <div>{pm.insured}</div>
                </div>
                <div className="text-center">
                  <div className="mb-1">🔄</div>
                  <div>{pm.returns}</div>
                </div>
                <div className="text-center">
                  <div className="mb-1">✓</div>
                  <div>{pm.certificate}</div>
                </div>
              </div>

              {/* Add to Cart Button - Changes based on cart status */}
              {alreadyInCart || justAdded ? (
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
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600">{pm.size}:</span>
                  <span className="text-gray-900 font-medium">{product.size}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600">{pm.technique}:</span>
                  <span className="text-gray-900 font-medium">{product.technique}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600">{pm.year}:</span>
                  <span className="text-gray-900 font-medium">{product.year}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-gray-600">{pm.category}:</span>
                  <span className="text-gray-900 font-medium">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Tab System */}
            <div>
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-3 text-sm font-medium transition ${
                    activeTab === 'description'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {pm.description}
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`px-4 py-3 text-sm font-medium transition ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {pm.shippingReturns}
                </button>
              </div>

              <div className="py-6">
                {activeTab === 'description' ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Authenticity Certificate Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <div className="flex items-start gap-3">
                        <Award className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">{pm.certTitle}</h4>
                          <p className="text-sm text-blue-800">
                            {pm.certText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-sm text-gray-700">
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
                )}
              </div>
            </div>

            {/* Trust Badges Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl mb-2">📦</div>
                <p className="text-xs text-gray-600">{pm.freeShipping}<br/>{pm.freeShippingDetail}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <p className="text-xs text-gray-600">{pm.insuredUp}<br/>{pm.insuredDetail}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-xs text-gray-600">{pm.originalWith}<br/>{pm.originalDetail}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔄</div>
                <p className="text-xs text-gray-600">{pm.daysReturn}<br/>{pm.returnDetail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}