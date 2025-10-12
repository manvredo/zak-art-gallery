"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './components/WelcomePage';
import GalleryPage from './components/GalleryPage';
import ShopPage from './components/ShopPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import ProductModal from './components/ProductModal';
import { useLanguage } from './context/LanguageContext';
import { useCart } from './context/CartContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ZakArtGallery() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentView, setCurrentView] = useState('welcome');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useLanguage();
  const { cart } = useCart();

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

  const categories = [t.categories.all, t.categories.landscape, t.categories.abstract, t.categories.portrait];
  const [selectedCategory, setSelectedCategory] = useState(t.categories.all);

  const filteredProducts = selectedCategory === t.categories.all 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const featuredProducts = products.slice(0, 3);

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      setCheckoutError(null);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout error');
      }

      const { url } = await response.json();
      if (!url) throw new Error('No checkout URL received');
      window.location.href = url;

    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message);
      setCheckoutLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError(null);
    setContactSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setContactSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactSuccess(false), 5000);

    } catch (error) {
      console.error('Contact form error:', error);
      setContactError(error.message);
    } finally {
      setContactLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onNavigate={setCurrentView} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'welcome' && (
          <WelcomePage 
            featuredProducts={featuredProducts}
            onProductClick={setSelectedProduct}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryPage 
            products={filteredProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProductClick={setSelectedProduct}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage 
            products={filteredProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProductClick={setSelectedProduct}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage 
            contactForm={contactForm}
            onFormChange={setContactForm}
            onSubmit={handleContactSubmit}
            loading={contactLoading}
            success={contactSuccess}
            error={contactError}
          />
        )}

        {currentView === 'cart' && (
          <CartPage 
            onNavigate={setCurrentView}
            onCheckout={handleCheckout}
            checkoutLoading={checkoutLoading}
            checkoutError={checkoutError}
          />
        )}
      </main>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          showAddToCart={currentView === 'shop'}
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
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 cursor-pointer"
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

      <Footer />
    </div>
  );
}