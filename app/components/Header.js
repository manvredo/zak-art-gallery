"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
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

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper function to check if route is active
  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 cursor-pointer" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/">
              <img 
                src="/logo.png" 
                alt="ZAK Art Gallery" 
                className="h-10 cursor-pointer"
              />
            </Link>
          </div>
          
          <nav className="hidden lg:flex space-x-8">
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

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              title={language === 'en' ? 'Deutsch' : 'English'}
            >
              <span className="text-2xl">{language === 'en' ? '🇩🇪' : '🇬🇧'}</span>
            </button>
            <button className="text-gray-700 hover:text-gray-900 cursor-pointer">
              <Search size={20} />
            </button>
            
            {/* User Account Button */}
            {user ? (
              <Link 
                href="/account"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm">Account</span>
              </Link>
            ) : (
              <Link 
                href="/login"
                className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
              >
                Login
              </Link>
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
            
            {/* Mobile User Links */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <Link
                  href="/account"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 My Account
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
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