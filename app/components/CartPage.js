"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartPage({ 
  onCheckout, 
  checkoutLoading, 
  checkoutError 
}) {
  const { cart, removeFromCart, cartTotal } = useCart();
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-light text-gray-900 mb-8">
        {t.cart.title}
      </h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-6">{t.cart.empty}</p>
          <Link 
            href="/shop"
            className="inline-block px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded cursor-pointer"
          >
            {t.cart.continueShopping}
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 mb-6">
            {cart.map(item => (
              <div key={item.id} className="p-6 flex gap-6">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-light text-lg text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.artist}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.size}</p>
                  <div className="mt-3">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light text-gray-900">
                    €{item.price.toLocaleString('en-US')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-700">{t.cart.subtotal}</span>
              <span className="text-2xl font-light text-gray-900">
                €{cartTotal.toLocaleString('en-US')}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {t.cart.shipping}
            </p>
            
            {checkoutError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                <strong>Error:</strong> {checkoutError}
              </div>
            )}

            <button 
              onClick={onCheckout}
              disabled={checkoutLoading}
              className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {checkoutLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t.cart.processing}
                </>
              ) : (
                <>
                  {t.cart.checkout}
                  <ChevronRight size={20} />
                </>
              )}
            </button>
            
            <Link 
              href="/shop"
              className="block w-full mt-3 py-3 text-center text-gray-700 hover:text-gray-900 transition cursor-pointer"
            >
              {t.cart.continueShopping}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}