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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                alt="ZAK Art Gallery Logo" 
                className="h-10 cursor-pointer"
              />
            </Link>
            
            <nav className="hidden lg:flex space-x-8 ml-24">
              <Link 
                href="/"
                className={`transition cursor-pointer ${
                  isActive('/') && pathname === '/' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.nav.welcome}
              </Link>
              <Link 
                href="/gallery"
                className={`transition cursor-pointer ${
                  isActive('/gallery') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.nav.gallery}
              </Link>
              <Link 
                href="/shop"
                className={`transition cursor-pointer ${
                  isActive('/shop') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.nav.shop}
              </Link>
              
              <Link 
                href="/contact"
                className={`transition cursor-pointer ${
                  isActive('/contact') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle with SVG Flags */}
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              title={language === 'en' ? 'Deutsch' : 'English'}
            >
              {language === 'en' ? (
                // German Flag
                <svg className="w-8 h-6" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
                  <rect width="5" height="3" fill="#000"/>
                  <rect width="5" height="2" y="1" fill="#D00"/>
                  <rect width="5" height="1" y="2" fill="#FFCE00"/>
                </svg>
              ) : (
                // UK Flag
                <svg className="w-8 h-6" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                  <clipPath id="t">
                    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                  </clipPath>
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </svg>
              )}
            </button>
            
            {/* ✅ Login & Register ODER Account */}
            {user ? (
              <Link 
                href="/account"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm">{t.nav.account}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login"
                  className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
                >
                  {t.nav.login}
                </Link>
                <span className="text-gray-300">|</span>
                <Link 
                  href="/register"
                  className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
            
            <Link 
              href="/cart"
              className="relative text-gray-700 hover:text-gray-900 cursor-pointer"
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
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.welcome}
            </Link>
            <Link 
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.gallery}
            </Link>
            <Link 
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.shop}
            </Link>
            
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.contact}
            </Link>
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <Link
                  href="/account"
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