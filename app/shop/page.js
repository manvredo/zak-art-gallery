'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ProductCard from '@/app/components/ProductCard';
import ProductModal from '@/app/components/ProductModal';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import { X } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ShopPage() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setSelectedProduct(null);
      setLightboxImage(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openProduct = (product) => {
    window.history.pushState({ modal: 'product' }, '');
    setSelectedProduct(product);
  };

  const closeProduct = () => {
    if (window.history.state?.modal === 'product') {
      window.history.back();
    } else {
      setSelectedProduct(null);
    }
  };

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

  // Produkte filtern
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const categoryOptions = [
    { key: 'All', label: t.shop?.all || 'All' },
    { key: 'Originals', label: t.shop?.originals || 'Originals' },
    { key: 'Prints', label: t.shop?.prints || 'Prints' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1564px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      
      {/* Header */}
      <div className="mb-12 flex items-center gap-4">
        <h2 className="font-light text-gray-900 whitespace-nowrap tracking-wide" style={{ fontSize: 32 }}>
          {t.shop?.title || 'SHOP'}
        </h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categoryOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-6 py-2 rounded-full transition cursor-pointer font-sans tracking-wide text-sm ${
              selectedCategory === key
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[50px] gap-x-5">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => openProduct(product)}
            showAddToCart={true}
            index={index}
            size="large"
          />
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProduct}
          onAddToCart={addToCart}
        />
      )}

      {/* Lightbox */}
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
    </div>
  );
}