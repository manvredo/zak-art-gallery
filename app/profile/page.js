"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Calendar, LogOut, Package, Heart, Bell, Sparkles } from 'lucide-react';
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
      // Warte kurz damit die Session nach Email-Bestätigung aktiv wird
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.log('No user found, redirecting to login...');
        router.push('/login');
        return;
      }

      console.log('User authenticated:', user.email);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {t.auth.account.title}, {user?.user_metadata?.full_name || 'Art Lover'}!
          </h1>
          <p className="text-gray-600">{t.auth.account.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Account Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">
                  {t.auth.account.accountInfo}
                </h2>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
                >
                  <LogOut size={18} />
                  <span>{t.auth.account.signOut}</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="text-gray-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-500">
                      {t.auth.account.fullNameLabel}
                    </label>
                    <p className="text-gray-900 mt-1">
                      {user?.user_metadata?.full_name || t.auth.account.notSet}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="text-gray-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-500">
                      {t.auth.account.emailLabel}
                    </label>
                    <p className="text-gray-900 mt-1">{user?.email}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="text-gray-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-500">
                      {t.auth.account.memberSince}
                    </label>
                    <p className="text-gray-900 mt-1">
                      {formatDate(user?.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon Features */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-gray-900" size={24} />
                <h3 className="text-lg font-medium text-gray-900">
                  {t.auth.account.comingSoon}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t.auth.account.comingSoonMessage}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                  <Package className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-900">{t.auth.account.orders}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.auth.account.soon}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                  <Heart className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-900">{t.auth.account.favorites}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.auth.account.soon}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                  <Bell className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-900">{t.auth.account.newsletter}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.auth.account.soon}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                {t.auth.account.benefitsTitle}
              </h3>

              <div className="space-y-6">
                {/* Early Access */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {t.auth.account.benefits.earlyAccess}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.auth.account.benefits.earlyAccessDesc}
                    </p>
                  </div>
                </div>

                {/* Order Tracking */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {t.auth.account.benefits.orderTracking}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.auth.account.benefits.orderTrackingDesc}
                    </p>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bell className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {t.auth.account.benefits.newsletter}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.auth.account.benefits.newsletterDesc}
                    </p>
                  </div>
                </div>

                {/* Save Favorites */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {t.auth.account.benefits.saveFavorites}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.auth.account.benefits.saveFavoritesDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Browse Art Button */}
              <Link
                href="/shop"
                className="mt-8 block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                {t.shop.title}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}