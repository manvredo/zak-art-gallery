"use client";

import React, { useState } from 'react';
import { Check, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const { t, language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !consent) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, language }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(t.newsletter.confirmPendingMessage);
        setEmail('');
        setConsent(false);
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
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Hint Text */}
        <p className="text-xs text-gray-500 leading-relaxed">
          {t.newsletter.catPaintings} &amp; {t.newsletter.catArtWingman}
        </p>

        {/* Consent Checkbox */}
        <label className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={status === 'loading'}
            className="mt-0.5 flex-shrink-0"
          />
          <span>
            {t.newsletter.consentPre}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">
              {t.newsletter.consentLink}
            </a>
            {t.newsletter.consentPost}
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading' || !consent}
          className="w-full py-2.5 bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-100 transition rounded-full cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              {t.newsletter.subscribing}
            </>
          ) : (
            <>
              <Mail size={16} />
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
