"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, LogOut, Package, Heart, Bell } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/login');
        return;
      }

      setUser(user);
      setLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK ART GALLERY
              </h1>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              ← {t.auth.login.backToShop}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {t.auth.account.title}, {user?.user_metadata?.full_name || 'Art Lover'}!
          </h1>
          <p className="text-gray-600">{t.auth.account.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-4">
                  <User className="text-white" size={40} />
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-1">
                  {user?.user_metadata?.full_name || 'Art Collector'}
                </h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg">
                  <User size={20} />
                  <span>{t.auth.account.profile}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                  <Package size={20} />
                  <span>{t.auth.account.orders}</span>
                  <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">{t.auth.account.soon}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                  <Heart size={20} />
                  <span>{t.auth.account.favorites}</span>
                  <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">{t.auth.account.soon}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                  <Bell size={20} />
                  <span>{t.auth.account.newsletter}</span>
                </button>
              </nav>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 mt-6 px-4 py-3 border border-red-300 text-red-700 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={20} />
                <span>{t.auth.account.signOut}</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-light text-gray-900 mb-6">{t.auth.account.accountInfo}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.auth.account.fullNameLabel}
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <User className="text-gray-400" size={18} />
                    <span className="text-gray-900">
                      {user?.user_metadata?.full_name || t.auth.account.notSet}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.auth.account.emailLabel}
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <Mail className="text-gray-400" size={18} />
                    <span className="text-gray-900">{user?.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.auth.account.memberSince}
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">
                      {new Date(user?.created_at).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-xl font-light mb-4">{t.auth.account.benefitsTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">{t.auth.account.benefits.earlyAccess}</p>
                    <p className="text-sm text-gray-300">{t.auth.account.benefits.earlyAccessDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">{t.auth.account.benefits.orderTracking}</p>
                    <p className="text-sm text-gray-300">{t.auth.account.benefits.orderTrackingDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">{t.auth.account.benefits.newsletter}</p>
                    <p className="text-sm text-gray-300">{t.auth.account.benefits.newsletterDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">{t.auth.account.benefits.saveFavorites}</p>
                    <p className="text-sm text-gray-300">{t.auth.account.benefits.saveFavoritesDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-2">🚀 {t.auth.account.comingSoon}</h4>
              <p className="text-sm text-blue-800">
                {t.auth.account.comingSoonMessage}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}