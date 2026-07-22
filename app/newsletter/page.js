"use client";

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import NewsletterForm from '@/app/components/NewsletterForm';

export default function NewsletterPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12 flex items-center gap-4">
        <h1 className="font-light text-gray-900 whitespace-nowrap tracking-wide" style={{ fontSize: 32 }}>
          NEWSLETTER
        </h1>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '2rem', fontWeight: 400 }}
          >
            {t.newsletter.title}
          </h2>
          <p className="text-gray-600 mb-8">
            {t.newsletter.subtitle}
          </p>

          <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wider">
            {t.newsletter.whatToExpect}
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-1 h-8 bg-gray-900 rounded-full mt-1"></div>
              <div>
                <p className="font-medium text-gray-900">{t.newsletter.catPaintings}</p>
                <p className="text-sm text-gray-600">{t.newsletter.catPaintingsDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-1 h-8 bg-gray-900 rounded-full mt-1"></div>
              <div>
                <p className="font-medium text-gray-900">{t.newsletter.catArtWingman}</p>
                <p className="text-sm text-gray-600">{t.newsletter.catArtWingmanDesc}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wider">
            {t.newsletter.joinList}
          </h3>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
