"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { productSlug } from '../lib/slug';
import Countdown from './Countdowns';

export default function OfferBanner({ entry }) {
  const { t } = useLanguage();
  const [offer, setOffer] = useState(entry?.offer || null);

  if (!entry || !offer) return null;

  const { product } = entry;

  return (
    <div className="border-b border-gray-200">
      <Link
        href={`/shop/${productSlug(product)}`}
        className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center group"
      >
        <img
          src={product.thumbnail_image || product.image}
          alt={product.name}
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
        />
        <span className="px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-medium tracking-wide uppercase">
          {t.shop.offer}
        </span>
        <span className="font-light text-gray-900 group-hover:underline" style={{ fontFamily: "'Vollkorn', Georgia, serif", fontSize: '1.1rem' }}>
          {product.name}
        </span>
        <span className="flex items-baseline gap-2 text-lg font-light text-gray-900">
          <span className="text-sm font-normal text-gray-400 line-through">
            €{Number(product.price).toLocaleString('en-US')}
          </span>
          €{Number(offer.price).toLocaleString('en-US')}
        </span>
        <Countdown endDate={offer.endDate} onExpire={() => setOffer(null)} className="text-amber-700" />
      </Link>
    </div>
  );
}
