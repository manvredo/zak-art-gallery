"use client";

import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

export default function OfferBanner({ entry, onProductClick }) {
  const { t } = useLanguage();

  if (!entry) return null;

  return (
    <div className="border-b border-gray-200 py-12 sm:py-16 px-6">
      <h3 className="text-center text-xl font-light text-gray-900 mb-8">
        {t.shop.offer}
      </h3>
      <div className="max-w-sm mx-auto">
        <ProductCard
          product={entry.product}
          onClick={() => onProductClick(entry.product)}
          showAddToCart={true}
          size="large"
        />
      </div>
    </div>
  );
}
