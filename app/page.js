'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import WelcomePage from '@/app/components/WelcomePage';
import ProductModal from '@/app/components/ProductModal';
import ContentSidebar from '@/app/components/ContentSidebar';
import HeroSlider from '@/app/components/HeroSlider';
import { X } from 'lucide-react';

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
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const featuredProducts = products.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Baustellen-Banner */}
      <div className="w-full bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-b-4 border-amber-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-5">
            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-amber-900 font-bold text-2xl tracking-wide">ACHTUNG: Diese Seite befindet sich im Aufbau</p>
              <p className="text-amber-700 text-lg mt-1">Wir arbeiten gerade an neuen Inhalten - bald geht es hier weiter!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Slider - Volle Breite oben */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <HeroSlider />
        </div>
      </div>

      {/* Content mit Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar links */}
          <ContentSidebar currentCategory={null} />
          
          {/* Hauptinhalt rechts */}
          <div className="col-span-1 lg:col-span-3">
            <WelcomePage 
              featuredProducts={featuredProducts}
              onProductClick={setSelectedProduct}
              showSlider={false}
            />
          </div>
        </div>
      </div>

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
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}