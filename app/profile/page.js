"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Calendar, LogOut, Package, Heart, Bell, Sparkles, Trash2, AlertTriangle, X } from 'lucide-react';
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
    if (!user) {
      console.log('❌ No user, skipping favorites load');
      return;
    }
    
    try {
      setFavoritesLoading(true);
      console.log('🔍 Loading favorites for user:', user.id);

      // Get user's favorites
      const { data: favoritesData, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching favorites:', error);
        throw error;
      }

      console.log('✅ Favorites from DB:', favoritesData);

      // Get product details for each favorite
      // Convert product_id from text to integer
      const productIds = favoritesData?.map(f => {
        const id = parseInt(f.product_id, 10);
        console.log('🔍 Converting product_id:', f.product_id, '→', id);
        return id;
      }).filter(id => !isNaN(id)) || [];
      
      console.log('🔍 Product IDs to search:', productIds);

      if (productIds.length > 0) {
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);

        if (productsError) {
          console.error('❌ Error fetching products:', productsError);
          throw productsError;
        }

        console.log('✅ Products found:', productsData);

        // Combine favorites with product data
        const favoritesWithProducts = favoritesData.map(fav => {
          const product = productsData.find(p => p.id === parseInt(fav.product_id, 10));
          console.log('🔍 Matching favorite', fav.product_id, 'with product:', product);
          return {
            ...fav,
            product
          };
        }).filter(f => f.product);

        console.log('✅ Final favorites with products:', favoritesWithProducts);
        setFavorites(favoritesWithProducts);
      } else {
        console.log('⚠️ No valid product IDs found');
        setFavorites([]);
      }

      setFavoritesLoading(false);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
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

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete account');
      }

      // Logout and redirect
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(error.message || 'Failed to delete account. Please try again.');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
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
          <h1 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
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
                <h2 className="text-xl text-gray-900" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
                  {t.auth.account.accountInfo}
                </h2>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
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

            {/* Delete Account */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Delete Account</h3>
                  <p className="text-sm text-gray-500 mt-1">Permanently remove your account and all data</p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* Favoriten Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
                My Favorites ({favorites.length})
              </h2>

              {favoritesLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="mx-auto mb-4 text-gray-300" size={48} />
                  <h3 className="text-xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
                    No Favorites
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't added any artworks to your favorites yet.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                  >
                    Discover Artworks
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            No Image
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
                            View
                          </Link>
                          <button
                            onClick={() => removeFavorite(favorite.id)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-red-300 transition group"
                            aria-label="Remove from favorites"
                          >
                            <Trash2 size={18} className="text-gray-600 group-hover:text-gray-900" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Orders & Newsletter */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                  <Package className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-900">Order History</p>
                  <p className="text-xs text-gray-500 mt-1">Coming soon</p>
                </div>
                <Link href="/newsletter" className="bg-white rounded-lg p-6 text-center border border-gray-200 hover:border-gray-900 transition group block">
                  <Bell className="mx-auto mb-3 text-gray-400 group-hover:text-gray-900 transition" size={32} />
                  <p className="text-sm font-medium text-gray-900">Newsletter</p>
                  <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-900 transition">Subscribe now →</p>
                </Link>
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
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
                      {t.auth.account.benefits.earlyAccess}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.auth.account.benefits.earlyAccessDesc}
                    </p>
                  </div>
                </div>

                {/* Order Tracking */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
                      {t.auth.account.benefits.orderTracking}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.auth.account.benefits.orderTrackingDesc}
                    </p>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Bell className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
                      {t.auth.account.benefits.newsletter}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.auth.account.benefits.newsletterDesc}
                    </p>
                  </div>
                </div>

                {/* Save Favorites */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Heart className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-vollkorn), Georgia, serif', fontWeight: 400 }}>
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

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDeleteConfirm(false)}></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mb-4">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete your account? This action cannot be undone. All your data, including favorites, will be permanently removed.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Your orders will remain on record for tax purposes.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}