'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import FadeInImage from './FadeInImage';

// Product image that opens a fullscreen lightbox on click, closing again on
// a second click - the zoom behaviour the old ProductModal had before it was
// removed in favour of dedicated /shop/[slug] pages.
export default function ZoomableImage({ src, alt, className = '', wrapperClassName = '', ...imgProps }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div
        className={`relative group cursor-pointer ${wrapperClassName}`}
        onClick={() => setOpen(true)}
      >
        <FadeInImage
          src={src}
          alt={alt}
          className={`transition-transform duration-300 group-hover:scale-105 ${className}`}
          {...imgProps}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition">
          {t.productModal.enlarge}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <img src={src} alt={alt} className="max-w-[min(1400px,100%)] h-auto" />
        </div>
      )}
    </>
  );
}
