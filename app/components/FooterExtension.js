"use client";
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcApplePay,
  FaCcPaypal,
  FaStripe,
  FaShieldAlt,
  FaLock
} from 'react-icons/fa';
import { SiKlarna } from 'react-icons/si';

const FooterExtension = () => {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="footer-extension bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* Column 1: Newsletter (compact) */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('newsletter')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="text-gray-900 mb-3" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontSize: '1.5rem', fontWeight: 400 }}>{t.newsletter?.title || 'Stay Inspired'}</h3>
              <span className="md:hidden">
                {openSection === 'newsletter' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'newsletter' ? 'open' : ''}`}>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {t.newsletter?.subtitle}
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Column 2: Sichere Zahlung */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('payment')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-3xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif' }}>{t.footerExtension.securePayment}</h3>
              <span className="md:hidden">
                {openSection === 'payment' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'payment' ? 'open' : ''}`}>
              <div className="flex flex-wrap gap-3 items-center" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
                <FaCcVisa 
                  size={40} 
                  className="text-[#1A1F71] opacity-80 hover:opacity-100 transition" 
                  title="Visa"
                />
                <FaCcMastercard 
                  size={40} 
                  className="text-[#EB001B] opacity-80 hover:opacity-100 transition" 
                  title="Mastercard"
                />
                <FaCcApplePay 
                  size={40} 
                  className="text-gray-800 opacity-80 hover:opacity-100 transition" 
                  title="Apple Pay"
                />
                <FaCcPaypal 
                  size={40} 
                  className="text-[#003087] opacity-80 hover:opacity-100 transition" 
                  title="PayPal"
                />
                <SiKlarna 
                  size={32} 
                  className="text-[#FFB3C7] opacity-80 hover:opacity-100 transition" 
                  title="Klarna"
                />
                <FaStripe 
                  size={40} 
                  className="text-[#635BFF] opacity-80 hover:opacity-100 transition" 
                  title="Stripe"
                />
              </div>
            </div>
          </div>

          {/* Column 3: Zuverlässiger Versand */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('shipping')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-3xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif' }}>{t.footerExtension.reliableShipping}</h3>
              <span className="md:hidden">
                {openSection === 'shipping' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'shipping' ? 'open' : ''}`}>
              <div className="flex flex-wrap gap-4 items-center" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
                <div className="px-3 py-1.5 bg-[#FFCC00] text-[#D40511] text-xs font-extrabold rounded tracking-wider opacity-80 hover:opacity-100 transition shadow-sm">
                  DHL
                </div>
                <div className="px-3 py-1.5 bg-[#003E80] text-white text-xs font-bold rounded opacity-80 hover:opacity-100 transition shadow-sm">
                  GLS
                </div>
                <div className="px-3 py-1.5 bg-[#FDEE00] text-[#2A5C38] text-xs font-bold rounded opacity-80 hover:opacity-100 transition shadow-sm">
                  HERMES
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link href="/returns" className="text-sm text-gray-600 hover:text-gray-900 transition" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
                  {t.footerExtension.returnLabel}
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: Kundenservice */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('customer')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-3xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif' }}>{t.footerExtension.customerService}</h3>
              <span className="md:hidden">
                {openSection === 'customer' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'customer' ? 'open' : ''}`}>
              <div className="mt-2 space-y-3" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
                {/* Kontakt */}
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">{t.footerExtension.contact}</p>
                  <a
                    href="tel:+491794824300"
                    className="text-gray-900 font-medium hover:text-gray-600 transition"
                  >
                    +49 179 4824 300
                  </a>
                </div>
                
                {/* Links */}
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="mailto:info@manfredzak.com" className="hover:text-gray-900 transition">
                      info@manfredzak.com
                    </a>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-gray-900 transition">
                      {t.footerExtension.faq}
                    </Link>
                  </li>
                </ul>

                {/* Trust Badges */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 items-center">
                  <div className="flex items-center gap-1 text-green-600" title={t.footerExtension.safeShopping}>
                    <FaShieldAlt size={24} />
                    <span className="text-xs font-medium">{t.footerExtension.safe}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600" title={t.footerExtension.sslEncrypted}>
                    <FaLock size={20} />
                    <span className="text-xs font-medium">SSL</span>
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