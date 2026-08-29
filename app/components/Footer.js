"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Send } from 'lucide-react';

const socialIconClass = "w-11 h-11 flex items-center justify-center rounded-full border border-black text-black hover:bg-black hover:text-white transition";

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="bg-[#e4e5e6] border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Social Links */}
        <div className="flex items-center justify-center md:justify-end gap-3 mb-10">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialIconClass}>
            <Instagram size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialIconClass}>
            <Facebook size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={socialIconClass}>
            <Twitter size={20} />
          </a>
          <a href="mailto:info@manfredzak.com" aria-label="Email" className={socialIconClass}>
            <Mail size={20} />
          </a>
          <Link href="/newsletter" aria-label="Mailing List" className={socialIconClass}>
            <Send size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* About Section */}
          <div>
            <h3 className="font-light text-3xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif' }}>ZAK Fine Art</h3>
            <p className="text-sm text-gray-600">
              {t.footer.about}
            </p>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="font-light text-3xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif' }}>{t.footer.customerService}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/shipping" className="hover:text-gray-900">
                  {t.footer.shipping}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-900">
                  {t.footer.returns}
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-gray-900">
                  {t.footer.payment}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-900">
                  {t.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-light text-3xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif' }}>{t.footer.legal}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href={language === 'de' ? '/impressum' : '/imprint'} className="hover:text-gray-900">
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
              <li>
                <Link href="/cookies" className="hover:text-gray-900">
                  {t.footer.cookies}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-light text-3xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif' }}>{t.footer.contactTitle}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>info@manfredzak.com</li>
              <li>+49 179 4824 300</li>
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