"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { productSlug } from '../lib/slug';
import FavoriteButton from './FavoriteButton';
import Countdown from './Countdowns';
import { getActiveOffer, getEffectivePrice, getStockInfo } from '../lib/offers';

export default function ProductCard({ product, onClick, showAddToCart = false, index = 0, size = 'default' }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [offer, setOffer] = useState(() => getActiveOffer(product));
  const stock = getStockInfo(product);
  const isSold = product.sold === true;
  const isOutOfStock = stock?.isOutOfStock === true;
  const isAvailable = product.available !== false && !isSold && !isOutOfStock;
  const cardRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (size !== 'large') return;
    const el = cardRef.current;
    if (!el) return;
    let observer;
    // Wait a frame so the initial hidden state paints before we start observing —
    // otherwise cards already in view on load jump straight to visible with no transition.
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setRevealed(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, [size]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart({ ...product, price: getEffectivePrice(product) });
  };

  const handleCardClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick();
  };

  return (
    <Link
      href={`/shop/${productSlug(product)}`}
      ref={cardRef}
      className={
        size === 'large'
          ? `block cursor-pointer group scroll-reveal ${revealed ? 'visible' : ''}`
          : 'block cursor-pointer group animate-slide-up'
      }
      style={size === 'large' ? undefined : { animationDelay: `${index * 0.1}s` }}
      onClick={handleCardClick}
    >
      {/* Image Container with Rounded Corners */}
      <div className="relative aspect-square overflow-hidden rounded-[15px] group-hover:rounded-[20px] mb-6 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] group-hover:translate-y-[6px] group-hover:scale-[1.019] group-hover:outline group-hover:outline-2 group-hover:outline-[#565656] transition-transform duration-200 ease-in transition-shadow duration-200 ease-in transition-[border-radius] duration-200 ease-in will-change-transform">
        <img
          src={product.thumbnail_image || product.image}
          alt={`${product.name}${product.technique ? ` – ${product.technique}` : ''} von Manfred Zak`}
          loading={index < 8 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className={`w-full h-full object-cover transition duration-200 ease-in ${!isAvailable && !isSold ? 'grayscale opacity-70' : ''}`}
        />

        {/* Sold / Out of Stock / Not Available Badge - Top Left */}
        {isSold ? (
          <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium tracking-wide">
            {t.shop.sold}
          </div>
        ) : isOutOfStock ? (
          <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium tracking-wide">
            {t.shop.soldOut}
          </div>
        ) : !isAvailable ? (
          <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium tracking-wide">
            {t.shop.notAvailable}
          </div>
        ) : offer && (
          <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-medium tracking-wide">
            {t.shop.offer}
          </div>
        )}

        {/* Favorite Button - Top Right */}
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton productId={product.id} />
        </div>
      </div>

      {/* Plain Text Below - With proper spacing */}
      <div className="pl-1">
        <p className={`${size === 'large' ? 'text-lg' : 'text-sm'} text-gray-500 mb-1`}>{product.artist}</p>
        <h3 className={`${size === 'large' ? 'text-[21px]' : 'text-base'} font-light text-gray-900 mb-1`}>{product.name}</h3>
        <p className={`${size === 'large' ? 'text-[15px]' : 'text-xs'} text-gray-600 mb-1`}>{product.size}</p>

        {stock && !stock.isOutOfStock && (
          <p className={`text-xs mb-6 ${stock.quantity <= 3 ? 'text-amber-700 font-medium' : 'text-gray-500'}`}>
            {stock.editionSize
              ? t.shop.onlyLeftOfEdition.replace('{n}', stock.quantity).replace('{total}', stock.editionSize)
              : t.shop.onlyLeft.replace('{n}', stock.quantity)}
          </p>
        )}
        {!stock || stock.isOutOfStock ? <div className="mb-6" /> : null}

        {offer && (
          <div className="mb-2">
            <Countdown endDate={offer.endDate} onExpire={() => setOffer(null)} className="text-amber-700" />
          </div>
        )}

        {showAddToCart ? (
          <div className="flex items-center justify-between mt-2">
            <span className={`${size === 'large' ? 'text-[23px]' : 'text-lg'} font-light text-gray-900 flex items-baseline gap-2`}>
              {offer && (
                <span className="text-sm font-normal text-gray-400 line-through">
                  €{Number(product.price).toLocaleString('en-US')}
                </span>
              )}
              €{(offer ? offer.price : Number(product.price)).toLocaleString('en-US')}
            </span>
            {isAvailable ? (
              <button
                onClick={handleAddToCart}
                className={`px-5 py-2 bg-transparent border border-gray-900 text-gray-900 hover:bg-[#ececec] transition rounded-full cursor-pointer ${size === 'large' ? 'text-base' : 'text-sm'}`}
              >
                {t.shop.addToCart}
              </button>
            ) : (
              <button
                disabled
                className={`px-5 py-2 bg-gray-100 border border-gray-200 text-gray-400 rounded-full cursor-not-allowed ${size === 'large' ? 'text-base' : 'text-sm'}`}
              >
                {isSold ? t.shop.sold : isOutOfStock ? t.shop.soldOut : t.shop.notAvailable}
              </button>
            )}
          </div>
        ) : (
          <p className={`${size === 'large' ? 'text-[23px]' : 'text-lg'} font-light text-gray-900 flex items-baseline gap-2`}>
            {offer && (
              <span className="text-sm font-normal text-gray-400 line-through">
                €{Number(product.price).toLocaleString('en-US')}
              </span>
            )}
            €{(offer ? offer.price : Number(product.price)).toLocaleString('en-US')}
          </p>
        )}
      </div>
    </Link>
  );
}
