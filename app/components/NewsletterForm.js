"use client";

import React, { useState } from 'react';
import { Check, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const CATEGORIES = [
  { id: 'paintings', labelKey: 'catPaintings' },
  { id: 'artwingman', labelKey: 'catArtWingman' },
];

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['paintings']);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          categories: selectedCategories,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message === 'Already subscribed'
          ? t.newsletter.alreadySubscribed
          : t.newsletter.success);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(t.newsletter.error);
      }
    } catch (err) {
      setStatus('error');
      setMessage(t.newsletter.networkError);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t.auth.register.emailLabel} *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400" size={16} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.emailPlaceholder}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
              disabled={status === 'loading'}
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-gray-900 mb-3" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '1.125rem', fontWeight: 400 }}>
            {t.newsletter.interestedIn}
          </label>
          <div className="space-y-1">
            {CATEGORIES.map(cat => (
              <label
                key={cat.id}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-sm">{t.newsletter[cat.labelKey]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button (like Add to Cart) */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              {t.newsletter.subscribing}
            </>
          ) : (
            <>
              <Mail size={20} />
              {t.newsletter.subscribe}
            </>
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 p-3 rounded-lg">
            <Check size={16} />
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 p-3 rounded-lg">
            <AlertCircle size={16} />
            {message}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400">
          {t.newsletter.noSpam}
        </p>
      </form>
    </div>
  );
}
