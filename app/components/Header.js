"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useCart } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cartItemCount } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header style={{ background: 'transparent !important', borderBottom: 'none !important' }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden cursor-pointer" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo & Navigation - Centered */}
          <div className="flex items-center justify-center flex-1">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760947393/zvhelvtagpo05uzpkesx.png"
                alt="ZAK Fine Art Logo"
                className="h-10 cursor-pointer"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            
            <nav className="hidden lg:flex space-x-8 ml-24">
              <Link
                href="/"
                className="nav-link transition cursor-pointer uppercase hover:opacity-80"
              >
                {t.nav.welcome}
              </Link>
              <Link
                href="/about"
                className="nav-link transition cursor-pointer uppercase hover:opacity-80"
              >
                {t.nav.about}
              </Link>
              <Link
                href="/shop"
                className="nav-link transition cursor-pointer uppercase hover:opacity-80"
              >
                {t.nav.shop}
              </Link>

              <Link
                href="/contact"
                className="nav-link transition cursor-pointer uppercase hover:opacity-80"
              >
                {t.nav.contact}
              </Link>
            </nav>
            <style>{`
              .nav-link {
                position: relative;
                color: #ffffff !important;
                transition: opacity 0.3s ease;
              }
              .nav-link::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 0;
                height: 2px;
                background-color: #ffffff;
                transition: width 0.3s ease;
              }
              .nav-link:hover::after {
                width: 100%;
              }
            `}</style>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* ✅ OPTION B: Beide Flaggen (eine ausgegraut) */}
            {/* Language Switch */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`text-sm px-2 py-1 rounded transition cursor-pointer ${
                  language === 'en' ? 'text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-white/50">/</span>
              <button
                onClick={() => language !== 'de' && toggleLanguage()}
                className={`text-sm px-2 py-1 rounded transition cursor-pointer ${
                  language === 'de' ? 'text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                DE
              </button>
            </div>
            
            {/* Login & Register ODER Account */}
            {user ? (
              <Link
                href="/profile"
                className="nav-link flex items-center gap-2 cursor-pointer"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm">{t.nav.account}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="nav-link text-sm cursor-pointer font-medium"
                >
                  {t.nav.login}
                </Link>
                <span className="text-white/50">|</span>
                <Link
                  href="/register"
                  className="nav-link text-sm cursor-pointer font-medium"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
            
            <Link
              href="/cart"
              className="nav-link relative cursor-pointer"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer uppercase"
            >
              {t.nav.welcome}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer uppercase"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer uppercase"
            >
              {t.nav.shop}
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer uppercase"
            >
              {t.nav.contact}
            </Link>
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <Link
                  href="/profile"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 {t.nav.account}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/register"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.register}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}