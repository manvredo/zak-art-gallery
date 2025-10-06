"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
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

  const { t } = useLanguage();
  const { cart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Mountain Landscape at Dusk',
      artist: 'Maria Schneider',
      price: 890,
      category: 'Landscape',
      size: '80 x 60 cm',
      technique: 'Oil on Canvas',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
      description: 'An atmospheric portrayal of the Alps bathed in warm evening light, capturing the serene beauty of nature.'
    },
    {
      id: 2,
      name: 'Abstract Composition No. 7',
      artist: 'Klaus Weber',
      price: 1250,
      category: 'Abstract',
      size: '100 x 100 cm',
      technique: 'Oil on Canvas',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
      description: 'Powerful color compositions with dynamic structures, expressing energy and movement through bold brushwork.'
    },
    {
      id: 3,
      name: 'Silent Forest Lake',
      artist: 'Anna Hoffmann',
      price: 720,
      category: 'Landscape',
      size: '70 x 50 cm',
      technique: 'Oil on Canvas',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80',
      description: 'A poetic forest scene with subtle lighting, inviting contemplation and tranquility.'
    },
    {
      id: 4,
      name: 'Portrait of a Young Woman',
      artist: 'Thomas Müller',
      price: 1450,
      category: 'Portrait',
      size: '60 x 80 cm',
      technique: 'Oil on Canvas',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
      description: 'An expressive portrait rendered in classical painting technique, capturing depth and character.'
    },
    {
      id: 5,
      name: 'Mediterranean Coast',
      artist: 'Sophie Klein',
      price: 980,
      category: 'Landscape',
      size: '90 x 60 cm',
      technique: 'Oil on Canvas',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=800&q=80',
      description: 'Sun-drenched coastal landscape with luminous colors that evoke the warmth of the Mediterranean.'
    },
    {
      id: 6,
      name: 'Urban Rhythm',
      artist: 'Klaus Weber',
      price: 1100,
      category: 'Abstract',
      size: '120 x 80 cm',
      technique: 'Oil on Canvas',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
      description: 'A modern interpretation of urban structures and movements, exploring the pulse of city life.'
    }
  ];

  const categories = [t.categories.all, t.categories.landscape, t.categories.abstract, t.categories.portrait];
  const [selectedCategory, setSelectedCategory] = useState(t.categories.all);

  const filteredProducts = selectedCategory === t.categories.all 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const featuredProducts = [products[0], products[1], products[4]];

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