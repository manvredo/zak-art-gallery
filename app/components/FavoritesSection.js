"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

const supabase = createClient(
  'https://xirvysecnblcegbpsmru.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcnZ5c2VjbmJsY2VnYnBzbXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODUyNjgsImV4cCI6MjA3NTA2MTI2OH0.adu6jdxVqPs9mC9H5Ih-XBkpmJYW72gt4Oz9koKY78I'
);

export default function FavoritesSection() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setUser(user);

      // Get user's favorites
      const { data: favoritesData, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get product details for each favorite
      // Note: This assumes you have a 'products' or 'gallery_items' table
      // Adjust the table name and fields according to your database structure
      const productIds = favoritesData.map(f => f.product_id);
      
      if (productIds.length > 0) {
        const { data: productsData, error: productsError } = await supabase
          .from('gallery_items')
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
        }).filter(f => f.product); // Remove favorites where product no longer exists

        setFavorites(favoritesWithProducts);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId, productId) => {
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
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-light text-gray-900 mb-6">
        Meine Favoriten ({favorites.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100">
              {favorite.product?.image_url ? (
                <Image
                  src={favorite.product.image_url}
                  alt={favorite.product.title || 'Artwork'}
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
                {favorite.product?.title || 'Untitled'}
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
                  onClick={() => removeFavorite(favorite.id, favorite.product_id)}
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
    </div>
  );
}