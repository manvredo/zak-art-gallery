"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Calendar, LogOut, Package, Heart, Bell, Sparkles, Trash2 } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const supabase = createClient(
  'https://xirvysecnblcegbpsmru.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcnZ5c2VjbmJsY2VnYnBzbXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODUyNjgsImV4cCI6MjA3NTA2MTI2OH0.adu6jdxVqPs9mC9H5Ih-XBkpmJYW72gt4Oz9koKY78I'
);

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

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

  const loadFavorites = async () => {
    if (!user) return;
    
    try {
      setFavoritesLoading(true);

      // Get user's favorites
      const { data: favoritesData, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get product details for each favorite
      // Convert product_id from text to integer
      const productIds = favoritesData?.map(f => parseInt(f.product_id, 10)).filter(id => !isNaN(id)) || [];
      
      if (productIds.length > 0) {
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);

        if (productsError) throw productsError;

        // Combine favorites with product data
        const favoritesWithProducts = favoritesData.map(fav => {
          const product = productsData.find(p => p.id === fav.product_id);
          return {
            ...fav,
            product
          };
        }).filter(f => f.product);

        setFavorites(favoritesWithProducts);
      } else {
        setFavorites([]);
      }

      setFavoritesLoading(false);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavoritesLoading(false);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      // Update UI
      setFavorites(favorites.filter(f => f.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
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

            {/* Favoriten Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Meine Favoriten ({favorites.length})
              </h2>

              {favoritesLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="mx-auto mb-4 text-gray-300" size={48} />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Keine Favoriten
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sie haben noch keine Kunstwerke zu Ihren Favoriten hinzugefügt.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                  >
                    Kunstwerke entdecken
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition group"
                    >
                      {/* Image */}
                      <div className="relative aspect-square bg-gray-100">
                        {favorite.product?.image ? (
                          <Image
                            src={favorite.product.image}
                            alt={favorite.product.name || 'Artwork'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Kein Bild
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {favorite.product?.name || 'Untitled'}
                        </h3>
                        <p className="text-lg font-semibold text-gray-900 mb-3">
                          €{favorite.product?.price?.toLocaleString('de-DE') || '0'}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link
                            href={`/shop/${favorite.product_id}`}
                            className="flex-1 bg-gray-900 text-white text-center py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                          >
                            Ansehen
                          </Link>
                          <button
                            onClick={() => removeFavorite(favorite.id)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition group"
                            aria-label="Remove from favorites"
                          >
                            <Trash2 size={18} className="text-gray-600 group-hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Coming Soon Features - Orders & Newsletter */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-gray-900" size={24} />
                <h3 className="text-lg font-medium text-gray-900">
                  Demnächst verfügbar
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Bestellhistorie und Newsletter folgen in Kürze!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                  <Package className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-900">Bestellungen</p>
                  <p className="text-xs text-gray-500 mt-1">Bald</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                  <Bell className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-900">Newsletter</p>
                  <p className="text-xs text-gray-500 mt-1">Bald</p>
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