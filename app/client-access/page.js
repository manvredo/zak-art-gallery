'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Eye, EyeOff, Check, LogOut } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import { getEffectivePrice } from '@/app/lib/offers';
import { normalizeAccessCode } from '@/app/lib/reservations';

// Customers get a personal access code from Manfred for a painting that is
// reserved for them; with it they can buy that painting here while it shows
// "Reserved" to everyone else in the shop.
const STORAGE_KEY = 'client_access_code';

export default function ClientAccessPage() {
  const { language } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const de = language === 'de';

  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(null); // { code, customerName, products }

  const unlock = async (rawCode) => {
    const accessCode = normalizeAccessCode(rawCode);
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/client-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
        setError(
          res.status === 401
            ? (de ? 'Dieser Zugangscode ist ungültig.' : 'This access code is not valid.')
            : (de ? 'Etwas ist schiefgelaufen. Bitte später erneut versuchen.' : 'Something went wrong. Please try again later.')
        );
        return;
      }
      try { sessionStorage.setItem(STORAGE_KEY, accessCode); } catch {}
      setAccess({ code: accessCode, customerName: data.customerName, products: data.products });
    } catch {
      setError(de ? 'Etwas ist schiefgelaufen. Bitte später erneut versuchen.' : 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let saved = null;
    try { saved = sessionStorage.getItem(STORAGE_KEY); } catch {}
    if (saved) unlock(saved);
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) unlock(code);
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
    setAccess(null);
    setCode('');
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      price: getEffectivePrice(product),
      reservation_code: access.code,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!access) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="max-w-md w-full px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gray-900" />
            </div>

            <h1 className="text-2xl font-light text-gray-900 mb-2 text-center">
              {de ? 'Kundenzugang' : 'Client Access'}
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              {de
                ? 'Bitte geben Sie den Zugangscode ein, den Sie von Manfred Zak erhalten haben.'
                : 'Please enter the access code you received from Manfred Zak.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={de ? 'Zugangscode' : 'Access code'}
                  autoComplete="off"
                  autoCapitalize="characters"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition text-gray-900 font-medium tracking-widest ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showCode ? 'Hide code' : 'Show code'}
                >
                  {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="bg-gray-50 border border-gray-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition font-medium cursor-pointer"
              >
                {de ? 'Einloggen' : 'Log in'}
              </button>
            </form>

            <p className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
              {de ? 'Kein Code? ' : 'No code? '}
              <Link href="/contact" className="underline hover:text-gray-900">
                {de ? 'Kontaktieren Sie mich.' : 'Get in touch.'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            {access.customerName
              ? (de ? `Willkommen, ${access.customerName}` : `Welcome, ${access.customerName}`)
              : (de ? 'Kundenzugang' : 'Client Access')}
          </h1>
          <p className="text-gray-600">
            {de
              ? 'Diese Werke sind für Sie reserviert und können nur von Ihnen gekauft werden.'
              : 'These artworks are reserved for you and can only be purchased by you.'}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition rounded-full text-sm flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={16} />
          {de ? 'Abmelden' : 'Log out'}
        </button>
      </div>

      {access.products.length === 0 ? (
        <p className="text-center py-16 text-gray-500">
          {de ? 'Aktuell sind keine Werke für Sie reserviert.' : 'There are no artworks reserved for you at the moment.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {access.products.map((product) => {
            const sold = product.sold === true;
            const inCart = isInCart(product.id);
            return (
              <div key={product.id}>
                <div className="relative aspect-square overflow-hidden rounded-[15px] mb-6 shadow-lg">
                  <img
                    src={product.thumbnail_image || product.image}
                    alt={`${product.name} von Manfred Zak`}
                    className="w-full h-full object-cover"
                  />
                  {sold && (
                    <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium">
                      {de ? 'Verkauft' : 'Sold'}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-1">{product.artist}</p>
                <h2 className="text-base font-light text-gray-900 mb-1">{product.name}</h2>
                <p className="text-xs text-gray-600 mb-4">{product.size}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-light text-gray-900">
                    €{getEffectivePrice(product).toLocaleString('en-US')}
                  </span>
                  {sold ? (
                    <span className="px-5 py-2 bg-gray-100 border border-gray-200 text-gray-400 rounded-full text-sm">
                      {de ? 'Verkauft' : 'Sold'}
                    </span>
                  ) : inCart ? (
                    <Link
                      href="/cart"
                      className="px-5 py-2 bg-gray-900 border border-gray-900 text-[#ececec] rounded-full flex items-center gap-1.5 text-sm"
                    >
                      <Check size={16} />
                      {de ? 'Zum Warenkorb' : 'Go to cart'}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-5 py-2 bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-[#ececec] transition rounded-full text-sm cursor-pointer"
                    >
                      {de ? 'In den Warenkorb' : 'Add to cart'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
