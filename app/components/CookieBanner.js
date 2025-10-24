'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    
    // Enable analytics
    window.dataLayer = window.dataLayer || [];
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 md:p-6 shadow-2xl border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">🍪 Cookie-Einstellungen</h3>
            <p className="text-sm text-gray-300 mb-3 md:mb-0">
              Wir verwenden Cookies, um dein Browsererlebnis zu verbessern. Einige sind notwendig für die Funktionalität, andere helfen uns zu verstehen, wie du unsere Website nutzt.{' '}
              <Link 
                href="/cookies"
                className="underline text-blue-400 hover:text-blue-300"
              >
                Mehr Infos
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Ablehnen
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Akzeptieren
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-700 transition rounded-lg flex-shrink-0"
              aria-label="Banner schließen"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}