"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FooterExtension = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="footer-extension bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Service */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('service')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Service</h3>
              <span className="md:hidden">
                {openSection === 'service' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'service' ? 'open' : ''}`}>
              <ul className="space-y-2 text-sm text-gray-600 mt-4">
                <li>
                  <Link href="/returns" className="hover:text-gray-900 transition">
                    Retourenlabel
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Sichere Zahlung */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('payment')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Sichere Zahlung</h3>
              <span className="md:hidden">
                {openSection === 'payment' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'payment' ? 'open' : ''}`}>
              <div className="flex flex-wrap gap-3 mt-4">
                {/* Platzhalter für Payment-Logos */}
                <div className="payment-logo-placeholder">
                  <img 
                    src="/images/payment/visa.svg" 
                    alt="Visa" 
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">VISA</div>';
                    }}
                  />
                </div>
                <div className="payment-logo-placeholder">
                  <img 
                    src="/images/payment/mastercard.svg" 
                    alt="Mastercard" 
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">MC</div>';
                    }}
                  />
                </div>
                <div className="payment-logo-placeholder">
                  <img 
                    src="/images/payment/apple-pay.svg" 
                    alt="Apple Pay" 
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Apple Pay</div>';
                    }}
                  />
                </div>
                <div className="payment-logo-placeholder">
                  <img 
                    src="/images/payment/paypal.svg" 
                    alt="PayPal" 
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">PayPal</div>';
                    }}
                  />
                </div>
                <div className="payment-logo-placeholder">
                  <img 
                    src="/images/payment/stripe.svg" 
                    alt="Stripe" 
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Stripe</div>';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Zuverlässiger Versand */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('shipping')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Zuverlässiger Versand</h3>
              <span className="md:hidden">
                {openSection === 'shipping' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'shipping' ? 'open' : ''}`}>
              <div className="flex flex-wrap gap-4 mt-4">
                {/* Platzhalter für Shipping-Logos */}
                <div className="shipping-logo-placeholder">
                  <img 
                    src="/images/shipping/dhl.svg" 
                    alt="DHL" 
                    className="h-10 w-auto opacity-70 hover:opacity-100 transition"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-20 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">DHL</div>';
                    }}
                  />
                </div>
                <div className="shipping-logo-placeholder">
                  <img 
                    src="/images/shipping/gls.svg" 
                    alt="GLS" 
                    className="h-10 w-auto opacity-70 hover:opacity-100 transition"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-20 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">GLS</div>';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Kundenservice */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('customer')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Kundenservice</h3>
              <span className="md:hidden">
                {openSection === 'customer' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'customer' ? 'open' : ''}`}>
              <div className="mt-4 space-y-3">
                {/* Hotline */}
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">24h-Bestell-Hotline</p>
                  <a 
                    href="tel:+491234567890" 
                    className="text-gray-900 font-medium hover:text-gray-600 transition"
                  >
                    +49 123 456 7890
                  </a>
                </div>
                
                {/* Links */}
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/contact" className="hover:text-gray-900 transition">
                      E-Mail senden
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-gray-900 transition">
                      Häufige Fragen
                    </Link>
                  </li>
                </ul>

                {/* Trust Badges Platzhalter */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                  <div className="trust-badge-placeholder">
                    <img 
                      src="/images/trust/trusted-shops.png" 
                      alt="Trusted Shops" 
                      className="h-12 w-auto opacity-70 hover:opacity-100 transition"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Trust</div>';
                      }}
                    />
                  </div>
                  <div className="trust-badge-placeholder">
                    <img 
                      src="/images/trust/ssl-secure.png" 
                      alt="SSL Secure" 
                      className="h-12 w-auto opacity-70 hover:opacity-100 transition"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">SSL</div>';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FooterExtension;