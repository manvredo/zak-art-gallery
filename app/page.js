'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import WelcomePage from '@/app/components/WelcomePage';
import { getActiveOffer } from '@/app/lib/offers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts((data || []).filter((p) => p.offline !== true));
    }
    setLoading(false);
  };

  const featuredProducts = products.slice(0, 4);

  // Soonest-ending active offer, if any, shown as a countdown banner below the hero.
  const soonestOffer = products
    .map((product) => ({ product, offer: getActiveOffer(product) }))
    .filter((entry) => entry.offer)
    .sort((a, b) => a.offer.endDate - b.offer.endDate)[0] || null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <WelcomePage
      featuredProducts={featuredProducts}
      offerEntry={soonestOffer}
    />
  );
}
