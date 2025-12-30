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