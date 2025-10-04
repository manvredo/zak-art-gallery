"use client";

import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, ChevronRight } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const ZakArtGallery = () => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('shop');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

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

  const categories = ['All', 'Landscape', 'Abstract', 'Portrait'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? {...item, quantity: newQuantity} : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      setCheckoutError(null);

      // API-Anfrage an Backend
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout-Fehler');
      }

      const { url } = await response.json();
      
      if (!url) {
        throw new Error('Keine Checkout-URL erhalten');
      }

      // Direkte Weiterleitung zur Stripe Checkout-Seite
      window.location.href = url;

    } catch (error) {
      console.error('Checkout-Fehler:', error);
      setCheckoutError(error.message);
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-light tracking-wider text-gray-900">
                ZAK ART GALLERY
              </h1>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <button 
                onClick={() => setCurrentView('shop')}
                className="text-gray-700 hover:text-gray-900 transition"
              >
                Shop
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition">
                Artists
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition">
                About
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition">
                Contact
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900">
                <Search size={20} />
              </button>
              <button 
                onClick={() => setCurrentView('cart')}
                className="relative text-gray-700 hover:text-gray-900"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => {setCurrentView('shop'); setMobileMenuOpen(false);}}
                className="block w-full text-left text-gray-700 hover:text-gray-900"
              >
                Shop
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-gray-900">
                Artists
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-gray-900">
                About
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-gray-900">
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'shop' && (
          <>
            {/* Hero Section */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Original Oil Paintings
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover unique artworks by contemporary artists. 
                Each painting is a hand-signed original piece.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-1">{product.artist}</p>
                    <h3 className="text-lg font-light text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{product.size}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-light text-gray-900">
                        €{product.price.toLocaleString('en-US')}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentView === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-gray-900 mb-8">Shopping Cart</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-6">Your cart is empty</p>
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="p-6 flex gap-6">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-light text-lg text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.artist}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.size}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-light text-gray-900">
                          €{(item.price * item.quantity).toLocaleString('en-US')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg text-gray-700">Subtotal</span>
                    <span className="text-2xl font-light text-gray-900">
                      €{cartTotal.toLocaleString('en-US')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Shipping costs calculated at checkout
                  </p>
                  
                  {checkoutError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                      <strong>Fehler:</strong> {checkoutError}
                    </div>
                  )}

                  <button 
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ChevronRight size={20} />
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => setCurrentView('shop')}
                    className="w-full mt-3 py-3 text-gray-700 hover:text-gray-900 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="float-right text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
                <p className="text-sm text-gray-500 mb-2">{selectedProduct.artist}</p>
                <h2 className="text-3xl font-light text-gray-900 mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="text-2xl font-light text-gray-900 mb-6">
                  €{selectedProduct.price.toLocaleString('en-US')}
                </p>
                
                <div className="border-t border-b border-gray-200 py-4 mb-6 space-y-2">
                  <p className="text-sm"><span className="text-gray-600">Size:</span> {selectedProduct.size}</p>
                  <p className="text-sm"><span className="text-gray-600">Medium:</span> {selectedProduct.technique}</p>
                  <p className="text-sm"><span className="text-gray-600">Year:</span> {selectedProduct.year}</p>
                  <p className="text-sm"><span className="text-gray-600">Category:</span> {selectedProduct.category}</p>
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded"
                >
                  Add to Cart
                </button>

                <div className="mt-6 text-sm text-gray-600 space-y-2">
                  <p>✓ Ready to ship in 2-3 business days</p>
                  <p>✓ Insured shipping</p>
                  <p>✓ 14-day return policy</p>
                  <p>✓ Certificate of authenticity included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-light text-lg mb-4">About ZAK</h3>
              <p className="text-sm text-gray-600">
                Your destination for contemporary art and original oil paintings.
              </p>
            </div>
            <div>
              <h3 className="font-light text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#shipping" className="hover:text-gray-900">Shipping & Delivery</a></li>
                <li><a href="#returns" className="hover:text-gray-900">Returns & Refunds</a></li>
                <li><a href="#payment" className="hover:text-gray-900">Payment Methods</a></li>
                <li><a href="#faq" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-light text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/imprint" className="hover:text-gray-900">Imprint</a></li>
                <li><a href="/privacy" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-gray-900">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-light text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>info@zakartgallery.com</li>
                <li>+49 (0) 123 456789</li>
                <li>Mon-Fri: 10am-6pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 ZAK Art Gallery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ZakArtGallery;