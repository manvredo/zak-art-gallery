"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

function ConfirmedContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'success';

  const copyByStatus = {
    success: { title: t.newsletter.confirmedTitle, message: t.newsletter.confirmedMessage },
    invalid: { title: t.newsletter.confirmedInvalidTitle, message: t.newsletter.confirmedInvalidMessage },
    error: { title: t.newsletter.confirmedErrorTitle, message: t.newsletter.confirmedErrorMessage },
  };
  const copy = copyByStatus[status] || copyByStatus.success;

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
        {copy.title}
      </h2>
      <p className="text-gray-600 mb-8">
        {copy.message}
      </p>

      <Link
        href="/"
        className="inline-block rounded-full bg-gray-900 text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition"
      >
        {t.newsletter.backToHome}
      </Link>
    </div>
  );
}

export default function NewsletterConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmedContent />
    </Suspense>
  );
}
