'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';

export default function ProductDetailClient({ product }) {
  const [justAdded, setJustAdded] = useState(false);
  const { language, t } = useLanguage();
  const { addToCart, isInCart } = useCart();

  const locale = language === 'de' ? 'de-DE' : 'en-US';
  const pm = t.productModal;
  const isSold = product.sold === true;
  const isAvailable = product.available !== false && !isSold;
  const alreadyInCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (alreadyInCart || !isAvailable) return;
    addToCart(product);
    setJustAdded(true);
  };

  return (
    <>
      <div className="text-4xl font-light text-gray-900 mb-2">
        €{Number(product.price).toLocaleString(locale)}
      </div>
      <p className="text-sm text-gray-600 mb-4">{pm.inclVAT}</p>

      {!isAvailable ? (
        <button
          disabled
          className="w-full py-4 bg-gray-200 text-gray-500 rounded-full font-medium text-lg cursor-not-allowed"
        >
          {isSold ? pm.sold : pm.notAvailable}
        </button>
      ) : alreadyInCart || justAdded ? (
        <Link
          href="/cart"
          className="w-full py-4 bg-gray-700 text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition"
        >
          <Check size={20} />
          {pm.added || 'Added'} – {pm.available}
        </Link>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded-full font-medium text-lg"
        >
          {pm.addToCart}
        </button>
      )}

      <div className="border-t border-b border-gray-200 py-6 mt-6">
        <h2 className="text-sm font-medium text-gray-900 mb-4">{pm.technicalDetails}</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">{pm.size}:</span>
            <span className="text-gray-900 font-medium text-base">{product.size}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">{pm.technique}:</span>
            <span className="text-gray-900 font-medium text-base">{product.technique}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">{pm.year}:</span>
            <span className="text-gray-900 font-medium text-base">{product.year}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-600">{pm.category}:</span>
            <span className="text-gray-900 font-medium text-base">{product.category}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-700 mt-6">
        <h2 className="text-sm font-medium text-gray-900">{pm.shippingReturns}</h2>
        <div>
          <h3 className="font-medium text-gray-900 mb-2">{pm.shippingTitle}</h3>
          <p className="mb-2">{pm.shippingText}</p>
          <p className="text-gray-600">{pm.shippingDetails}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-2">{pm.returnsTitle}</h3>
          <p>{pm.returnsText}</p>
        </div>
      </div>
    </>
  );
}
