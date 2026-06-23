"use client";

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import NewsletterForm from '@/app/components/NewsletterForm';

export default function NewsletterPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK FINE ART
              </h1>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              ← {t.newsletter.backToShop}
            </Link>
          </div>
        </div>
      </header>

      {/* Newsletter Hero */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-6">
            <Mail className="text-white" size={32} />
          </div>
          <h1 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
            {t.newsletter.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            {t.newsletter.subtitle}
          </p>
        </div>

        {/* What you'll get */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-gray-900 mb-6 text-center" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '1.75rem', fontWeight: 400 }}>
            {t.newsletter.whatToExpect}
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-1 h-10 bg-gray-900 rounded-full mt-1"></div>
              <div>
                <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '1.125rem', fontWeight: 400 }}>{t.newsletter.catPaintings}</h3>
                <p className="text-sm text-gray-600">{t.newsletter.catPaintingsDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-1 h-10 bg-gray-900 rounded-full mt-1"></div>
              <div>
                <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '1.125rem', fontWeight: 400 }}>{t.newsletter.catArtWingman}</h3>
                <p className="text-sm text-gray-600">{t.newsletter.catArtWingmanDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-gray-900 mb-2 text-center" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '1.75rem', fontWeight: 400 }}>
            {t.newsletter.joinList}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            {t.newsletter.noSpam}
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
