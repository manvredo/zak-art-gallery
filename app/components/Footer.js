"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="font-light text-lg mb-4">ZAK Art Gallery</h3>
            <p className="text-sm text-gray-600">
              {t.footer.about}
            </p>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="font-light text-lg mb-4">{t.footer.customerService}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#shipping" className="hover:text-gray-900">
                  {t.footer.shipping}
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-gray-900">
                  {t.footer.returns}
                </a>
              </li>
              <li>
                <a href="#payment" className="hover:text-gray-900">
                  {t.footer.payment}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gray-900">
                  {t.footer.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-light text-lg mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/imprint" className="hover:text-gray-900">
                  {t.footer.imprint}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/withdrawal" className="hover:text-gray-900">
                  {t.footer.widerruf}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-light text-lg mb-4">{t.footer.contactTitle}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>info@zakartgallery.com</li>
              <li>+49 (0) 123 456789</li>
              <li>{t.footer.monFri}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;