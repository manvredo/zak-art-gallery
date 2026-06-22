"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
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
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down & past threshold - hide header
        setHeaderVisible(false);
      } else if (currentScrollY < 300) {
        // Scrolling up & not near top - show header
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const isHomePage = pathname === '/';
  const textColor = isHomePage ? '#ffffff' : '#010101';
  
  return (
    <header
      style={{
        background: isHomePage ? 'transparent !important' : '#ffffff !important',
        transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.15s ease-in-out, box-shadow 0.2s ease'
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-center h-16 relative">

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop: inline-flex border wrapper (only as wide as content) */}
          <div className="hidden lg:flex items-center self-stretch border-b-2" style={{ borderColor: isHomePage ? 'transparent' : '#e5e7eb' }}>
          {/* Logo & Navigation - Centered */}
          <div className="flex items-center justify-center">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760947393/zvhelvtagpo05uzpkesx.png"
                alt="ZAK Fine Art Logo"
                className="h-10 cursor-pointer"
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8 ml-24">
              <Link
                href="/"
                className="relative group transition cursor-pointer uppercase"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  {t.nav.welcome}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </Link>
              <Link
                href="/about"
                className="relative group transition cursor-pointer uppercase"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  {t.nav.about}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </Link>
              <Link
                href="/shop"
                className="relative group transition cursor-pointer uppercase"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  {t.nav.shop}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </Link>

              <Link
                href="/contact"
                className="relative group transition cursor-pointer uppercase"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  {t.nav.contact}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </Link>

              <Link
                href="/artwingman"
                className="relative group transition cursor-pointer uppercase ml-6"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  Artwingman
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </Link>
            </nav>
          </div>

          {/* Right Icons - Desktop in border, Mobile ohne Border */}
          </div>
          <div className="flex items-center space-x-4 lg:self-stretch lg:border-b-2" style={{ borderColor: isHomePage ? 'transparent' : '#e5e7eb' }}>
            {/* Language Switch mit animiertem Strich */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className="relative group text-sm cursor-pointer"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  <span className={language === 'en' ? 'font-bold' : ''}>EN</span>
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </button>
              <span style={{ color: textColor }} className="opacity-50">/</span>
              <button
                onClick={() => language !== 'de' && toggleLanguage()}
                className="relative group text-sm cursor-pointer"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  <span className={language === 'de' ? 'font-bold' : ''}>DE</span>
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </button>
            </div>
            
            {/* Login & Register ODER Account */}
            {user ? (
              <Link
                href="/profile"
                className="px-4 py-2 bg-white text-gray-900 border border-gray-300 text-sm hover:bg-gray-200 transition rounded-full cursor-pointer"
              >
                {t.nav.account}
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-transparent border text-sm hover:bg-gray-100 transition rounded-full cursor-pointer"
                  style={{ color: textColor, borderColor: textColor }}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-[#0f0f0f] text-white border border-gray-900 text-sm hover:bg-[#0f0f0f] transition rounded-full cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            <Link
              href="/cart"
              className="relative group cursor-pointer"
              style={{ color: textColor }}
            >
              <span className="relative inline-block">
                <ShoppingCart size={20} />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
              </span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0f0f0f] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t ${isHomePage ? 'border-white/20 bg-[#0f0f0f]' : 'border-gray-200 bg-white'}`}>
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left cursor-pointer uppercase"
              style={{ color: textColor }}
            >
              {t.nav.welcome}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left cursor-pointer uppercase"
              style={{ color: textColor }}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left cursor-pointer uppercase"
              style={{ color: textColor }}
            >
              {t.nav.shop}
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left cursor-pointer uppercase"
              style={{ color: textColor }}
            >
              {t.nav.contact}
            </Link>

            <Link
              href="/artwingman"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left cursor-pointer uppercase"
              style={{ color: textColor }}
            >
              Artwingman
            </Link>

            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <Link
                  href="/profile"
                  className="block py-2 cursor-pointer"
                  style={{ color: textColor }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 {t.nav.account}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 cursor-pointer"
                    style={{ color: textColor }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/register"
                    className="block py-2 cursor-pointer"
                    style={{ color: textColor }}
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