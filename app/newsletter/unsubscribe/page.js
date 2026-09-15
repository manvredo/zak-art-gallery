"use client";

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

function UnsubscribeContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = () => {
    setLoading(true);
    window.location.href = `/api/newsletter/unsubscribe?token=${encodeURIComponent(token || '')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12 flex items-center gap-4">
        <h1 className="font-light text-gray-900 whitespace-nowrap tracking-wide" style={{ fontSize: 32 }}>
          NEWSLETTER
        </h1>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <h2
        className="text-gray-900 mb-3"
        style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '2rem', fontWeight: 400 }}
      >
        {t.newsletter.unsubscribeConfirmTitle}
      </h2>
      <p className="text-gray-600 mb-8">
        {t.newsletter.unsubscribeConfirmMessage}
      </p>

      {!token ? (
        <p className="text-gray-600 mb-8">{t.newsletter.unsubscribedInvalidMessage}</p>
      ) : (
        <button
          onClick={handleUnsubscribe}
          disabled={loading}
          className="inline-block rounded-full bg-gray-900 text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? t.newsletter.subscribing : t.newsletter.unsubscribeButton}
        </button>
      )}

      <div className="mt-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 underline">
          {t.newsletter.backToHome}
        </Link>
      </div>
    </div>
  );
}

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense fallback={null}>
      <UnsubscribeContent />
    </Suspense>
  );
}
