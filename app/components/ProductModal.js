"use client";

import React, { useState } from 'react';
import { X, ZoomIn, Check, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductModal({ product, onClose, showAddToCart = false, onImageClick }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('details');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
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
        className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center z-10">
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 p-8">
          
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="relative group">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => onImageClick && onImageClick(product.image)}
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <ZoomIn size={18} className="text-gray-700" />
                <span className="text-sm text-gray-700">Vergrößern</span>
              </div>
            </div>

            {/* Quick Info Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <Check className="mx-auto mb-1 text-green-600" size={20} />
                <p className="text-xs text-green-800 font-medium">Sofort lieferbar</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <Award className="mx-auto mb-1 text-blue-600" size={20} />
                <p className="text-xs text-blue-800 font-medium">Original Unikat</p>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            
            {/* Price & CTA */}
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-3xl font-light text-gray-900 mb-4">
                €{product.price.toLocaleString('de-DE')}
              </p>
              <p className="text-sm text-gray-600 mb-4">inkl. MwSt. zzgl. Versand</p>
              
              {showAddToCart && (
                <button 
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`w-full py-4 rounded-lg font-medium transition ${
                    addedToCart 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {addedToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={20} />
                      In den Warenkorb gelegt
                    </span>
                  ) : (
                    'In den Warenkorb'
                  )}
                </button>
              )}

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-gray-400" />
                  <span>Versandfertig in 2-3 Werktagen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-gray-400" />
                  <span>Versicherte Lieferung</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-gray-400" />
                  <span>30 Tage Rückgaberecht</span>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Technische Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Größe</span>
                  <span className="font-medium text-gray-900">{product.size}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Technik</span>
                  <span className="font-medium text-gray-900">{product.technique}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Jahr</span>
                  <span className="font-medium text-gray-900">{product.year}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Kategorie</span>
                  <span className="font-medium text-gray-900">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-3 text-sm font-medium transition border-b-2 ${
                    activeTab === 'details'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Beschreibung
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`px-6 py-3 text-sm font-medium transition border-b-2 ${
                    activeTab === 'shipping'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Versand & Rückgabe
                </button>
              </div>

              <div className="py-6">
                {activeTab === 'details' && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">
                        ✓ Garantierte Echtheit
                      </h4>
                      <p className="text-xs text-blue-800">
                        Jedes Werk wird mit Echtheitszertifikat und Signatur des Künstlers geliefert.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Versand</h4>
                      <p className="text-gray-600">
                        Professionell verpackt und versichert. Lieferzeit 2-7 Werktage 
                        innerhalb Deutschlands. Internationaler Versand auf Anfrage.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Rückgabe</h4>
                      <p className="text-gray-600">
                        30 Tage Rückgaberecht. Das Kunstwerk muss im Originalzustand 
                        zurückgesendet werden.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Zahlungsmethoden</h4>
                      <p className="text-gray-600">
                        Kreditkarte, PayPal, Amazon Pay, Klarna, Banküberweisung
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <Truck className="mx-auto mb-2 text-gray-400" size={24} />
              <p className="text-xs font-medium text-gray-900">Kostenloser Versand</p>
              <p className="text-xs text-gray-600">ab 500€</p>
            </div>
            <div>
              <Shield className="mx-auto mb-2 text-gray-400" size={24} />
              <p className="text-xs font-medium text-gray-900">Versichert</p>
              <p className="text-xs text-gray-600">Vollständig geschützt</p>
            </div>
            <div>
              <Award className="mx-auto mb-2 text-gray-400" size={24} />
              <p className="text-xs font-medium text-gray-900">Original</p>
              <p className="text-xs text-gray-600">Mit Zertifikat</p>
            </div>
            <div>
              <RotateCcw className="mx-auto mb-2 text-gray-400" size={24} />
              <p className="text-xs font-medium text-gray-900">30 Tage</p>
              <p className="text-xs text-gray-600">Rückgaberecht</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}