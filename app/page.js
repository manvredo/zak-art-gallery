'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import WelcomePage from '@/app/components/WelcomePage';
import ProductModal from '@/app/components/ProductModal';
import { X } from 'lucide-react';
import { getActiveOffer } from '@/app/lib/offers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

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
    <>
      {/* WelcomePage mit Hero */}
      <WelcomePage
        featuredProducts={featuredProducts}
        onProductClick={setSelectedProduct}
        offerEntry={soonestOffer}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          showAddToCart={false}
          onImageClick={setLightboxImage}
        />
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={40} />
          </button>
          <img
            src={lightboxImage}
            alt={selectedProduct?.name ? `${selectedProduct.name} von Manfred Zak – Vollansicht` : 'Kunstwerk von Manfred Zak – Vollansicht'}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}