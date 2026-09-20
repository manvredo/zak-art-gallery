"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, Instagram, Twitter } from 'lucide-react';
import { supabase } from '@/app/lib/supabaseClient';
import { useCart } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const { cartItemCount } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const submitSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

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

      setScrollY(currentScrollY);

      if (currentScrollY > lastScrollY.current) {
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const isNearTop = scrollY < 50;
  const inHeroZone = scrollY < 1000;
  const shouldBeTransparent = isHomePage && (isNearTop || (inHeroZone && !headerVisible));
  const headerBg = shouldBeTransparent ? 'transparent' : '#efeff0';
  const textColor = shouldBeTransparent ? '#ffffff' : '#010101';
  
  return (
    <header
      style={{
        backgroundColor: headerBg,
        transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.6s ease-out, background-color 0.6s ease-out'
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] h-24 relative">

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop grid column 1: empty spacer so the center column stays truly centered */}
          <div className="hidden lg:block" />

          {/* Desktop: inline-flex border wrapper (only as wide as content) */}
          <div className="hidden lg:flex items-center justify-center self-stretch">
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

              <Link
                href="/archive"
                className="relative group transition cursor-pointer uppercase"
                style={{ color: textColor }}
              >
                <span className="relative inline-block">
                  {t.nav.archive}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </Link>
            </nav>
          </div>

          {/* Right Icons - Desktop in border, Mobile ohne Border */}
          </div>
          <div className="flex items-center space-x-4 lg:self-stretch lg:pl-8 lg:justify-self-end">
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

            {/* Search */}
            <div className="flex items-center" style={{ marginLeft: '2cm' }}>
              <form onSubmit={submitSearch} className="mr-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'de' ? 'Suchen…' : 'Search…'}
                    className="w-32 sm:w-48 px-3 py-1.5 text-sm rounded-full border bg-white/90 text-gray-900 outline-none"
                    style={{ borderColor: textColor === '#ffffff' ? 'rgba(255,255,255,0.4)' : undefined }}
                  />
              </form>
              <button
                type="button"
                onClick={submitSearch}
                className="cursor-pointer"
                style={{ color: textColor }}
                aria-label={language === 'de' ? 'Suche' : 'Search'}
              >
                <Search size={20} />
              </button>
              <a
                href="https://www.instagram.com/manvredo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="ml-4 cursor-pointer"
                style={{ color: textColor }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/manfredzak_com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="ml-4 cursor-pointer"
                style={{ color: textColor }}
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t ${isHomePage ? 'border-white/20 bg-[#0f0f0f]' : 'border-gray-200 bg-[#efeff0]'}`}>
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

            <Link
              href="/archive"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left cursor-pointer uppercase"
              style={{ color: textColor }}
            >
              {t.nav.archive}
            </Link>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/manvredo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="cursor-pointer"
                style={{ color: textColor }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/manfredzak_com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="cursor-pointer"
                style={{ color: textColor }}
              >
                <Twitter size={20} />
              </a>
            </div>

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