"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/app/lib/supabaseClient';

export default function FavoriteButton({ productId, className = '' }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, productId]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const checkIfFavorite = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (data) {
        setIsFavorite(true);
      }
    } catch (error) {
      // Not a favorite (or error)
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
        setIsFavorite(false);
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            product_id: productId
          });

        if (error) throw error;
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Favorite toggle error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`
        group relative
        p-2 rounded-full
        bg-white/90 backdrop-blur-sm
        hover:bg-white
        transition-all duration-200
        shadow-sm hover:shadow-md
        disabled:opacity-50
        ${className}
      `}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={20}
        className={`
          transition-all duration-200
          ${isFavorite
            ? 'fill-black text-black'
            : 'text-gray-600 group-hover:text-black'
          }
          ${loading ? 'animate-pulse' : ''}
        `}
      />
    </button>
  );
}