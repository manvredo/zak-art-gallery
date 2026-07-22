'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { X, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import NewsletterForm from './NewsletterForm';

const DISMISS_KEY = 'newsletterModalDismissed';
const SUBSCRIBED_KEY = 'newsletterModalSubscribed';
const SHOW_AFTER_MS = 20000;
const EXCLUDED_PREFIXES = ['/newsletter'];

export default function NewsletterModal() {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    if (EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix))) return;
    if (localStorage.getItem(DISMISS_KEY) || localStorage.getItem(SUBSCRIBED_KEY)) return;

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setVisible(true);
    };

    const timer = setTimeout(show, SHOW_AFTER_MS);

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pathname]);

  const handleClose = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  const handleSubscribed = () => {
    localStorage.setItem(SUBSCRIBED_KEY, '1');
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-full mb-5">
          <Mail className="text-white" size={22} />
        </div>

        <h2
          className="text-gray-900 mb-2"
          style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '1.75rem', fontWeight: 400 }}
        >
          {t.newsletter.title}
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          {t.newsletter.subtitle}
        </p>

        <NewsletterForm onSubscribed={handleSubscribed} />
      </div>
    </div>
  );
}
