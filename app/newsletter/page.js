"use client";

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import NewsletterForm from '@/app/components/NewsletterForm';

export default function NewsletterPage() {
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
              ← Back to Shop
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
            Stay Inspired
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Be the first to know about new collections, exclusive behind-the-scenes content,
            and special offers – delivered straight to your inbox.
          </p>
        </div>

        {/* What you'll get */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl text-gray-900 mb-6 text-center" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
            What to expect
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">🎨</div>
              <div>
                <h3 className="font-medium text-gray-900">New Collections & Paintings</h3>
                <p className="text-sm text-gray-600">First access to new artworks, limited editions, and exclusive previews.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">🤖</div>
              <div>
                <h3 className="font-medium text-gray-900">ArtWingman & AI Insights</h3>
                <p className="text-sm text-gray-600">Behind the scenes of AI-powered art tools and creative tech.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">🛠️</div>
              <div>
                <h3 className="font-medium text-gray-900">Tools & Resources</h3>
                <p className="text-sm text-gray-600">Munshell updates, artist resources, and exclusive tutorials.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl text-gray-900 mb-2 text-center" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
            Join the list
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            No spam. Unsubscribe anytime.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
