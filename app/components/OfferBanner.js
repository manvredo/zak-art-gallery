"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { productSlug } from '../lib/slug';
import Countdown from './Countdowns';
import { getEffectivePrice } from '../lib/offers';

export default function OfferBanner({ entry }) {
  const { addToCart, isInCart } = useCart();
  const { t } = useLanguage();
  const [offer, setOffer] = useState(entry?.offer || null);

  if (!entry || !offer) return null;

  const { product } = entry;
  const alreadyInCart = isInCart(product.id);
  const isAvailable = product.available !== false && product.sold !== true;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart({ ...product, price: getEffectivePrice(product) });
  };

  return (
    <div className="border-b border-gray-300 py-12 sm:py-16">
      <Link
        href={`/shop/${productSlug(product)}`}
        className="block max-w-6xl mx-auto px-12 md:px-24 grid md:grid-cols-2 gap-12 items-center group"
      >
        <div className="relative aspect-square w-full max-w-md mx-auto md:mx-0 overflow-hidden rounded-[15px] group-hover:rounded-[20px] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-[border-radius] duration-200 ease-in">
          <img
            src={product.thumbnail_image || product.image}
            alt={`${product.name} von Manfred Zak`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-medium tracking-wide">
            {t.shop.offer}
          </div>
        </div>

        <div className="text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-600 text-white text-sm sm:text-base font-medium tracking-wide uppercase mb-3">
            {t.shop.offer}
          </span>
          <p className="text-lg text-gray-500 mb-1">{product.artist}</p>
          <h4 className="text-[23px] font-light text-gray-900 mb-1">{product.name}</h4>
          <p className="text-[15px] text-gray-600 mb-6">{product.size}</p>

          <div className="mb-4">
            <Countdown endDate={offer.endDate} onExpire={() => setOffer(null)} className="text-amber-700" size="lg" />
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6">
            <span className="text-[23px] font-light text-gray-900 flex items-baseline gap-2">
              <span className="text-sm font-normal text-gray-400 line-through">
                €{Number(product.price).toLocaleString('en-US')}
              </span>
              €{Number(offer.price).toLocaleString('en-US')}
            </span>
            {isAvailable ? (
              alreadyInCart ? (
                <span className="px-5 py-2 bg-gray-900 border border-gray-900 text-[#ececec] rounded-full flex items-center gap-1.5 text-base">
                  <Check size={18} />
                  {t.productModal.added}
                </span>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="px-5 py-2 bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-[#ececec] transition rounded-full cursor-pointer text-base"
                >
                  {t.shop.addToCart}
                </button>
              )
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  );
}
