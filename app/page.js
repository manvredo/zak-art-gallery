
"use client";

import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

const ZakArtGallery = () => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [language, setLanguage] = useState('en');
  
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState(null);

  // Translations
  const t = {
    en: {
      nav: {
        welcome: 'Welcome',
        gallery: 'Gallery',
        shop: 'Shop',
        contact: 'Contact'
      },
      welcome: {
        title: 'Welcome to ZAK Art Gallery',
        subtitle: 'Original Oil Paintings & Charcoal Drawings',
        intro1: 'Welcome to my world of contemporary art. For over a decade, I have been creating original paintings in oil and charcoal drawings, inspired by the beauty of nature and human emotion.',
        intro2: 'Each piece is a handcrafted original - created with passion, signed, and certified. Discover my current collection and find the perfect artwork for your home.',
        viewGallery: 'View Gallery',
        visitShop: 'Visit Shop',
        featured: 'Featured Artworks'
      },
      gallery: {
        title: 'Gallery',
        subtitle: 'Browse our complete collection of original artworks'
      },
      shop: {
        title: 'Shop',
        subtitle: 'Purchase original artworks. Each painting is hand-signed and comes with a certificate of authenticity.',
        addToCart: 'Add to Cart'
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        continueShopping: 'Continue Shopping',
        subtotal: 'Subtotal',
        shipping: 'Shipping costs calculated at checkout',
        checkout: 'Proceed to Checkout',
        remove: 'Remove',
        processing: 'Processing...'
      },
      contact: {
        title: 'Contact',
        getInTouch: 'Get in Touch',
        email: 'Email',
        phone: 'Phone',
        hours: 'Hours',
        name: 'Name',
        message: 'Message',
        sendMessage: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully! We\'ll get back to you soon.',
        yourName: 'Your name',
        yourEmail: 'your@email.com',
        yourMessage: 'Your message...'
      },
      product: {
        size: 'Size',
        medium: 'Medium',
        year: 'Year',
        category: 'Category',
        readyToShip: 'Ready to ship in 2-3 business days',
        insuredShipping: 'Insured shipping',
        returnPolicy: '14-day return policy',
        certificate: 'Certificate of authenticity included'
      },
      categories: {
        all: 'All',
        landscape: 'Landscape',
        abstract: 'Abstract',
        portrait: 'Portrait'
      },
      footer: {
        about: 'Your destination for contemporary art and original oil paintings.',
        customerService: 'Customer Service',
        shipping: 'Shipping & Delivery',
        returns: 'Returns & Refunds',
        payment: 'Payment Methods',
        faq: 'FAQ',
        legal: 'Legal',
        imprint: 'Imprint',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
        contactTitle: 'Contact',
        monFri: 'Mon-Fri: 10am-6pm',
        rights: '© 2024 ZAK Art Gallery. All rights reserved.'
      }
    },
    de: {
      nav: {
        welcome: 'Willkommen',
        gallery: 'Galerie',
        shop: 'Shop',
        contact: 'Kontakt'
      },
      welcome: {
        title: 'Willkommen in der ZAK Art Gallery',
        subtitle: 'Original Ölgemälde & Kohlekreide-Zeichnungen',
        intro1: 'Willkommen in meiner Welt der zeitgenössischen Kunst. Seit über einem Jahrzehnt erschaffe ich Originalgemälde in Öl und Kohlekreide-Zeichnungen, inspiriert von der Schönheit der Natur und menschlicher Emotionen.',
        intro2: 'Jedes Werk ist ein handgefertigtes Original - mit Leidenschaft erschaffen, signiert und zertifiziert. Entdecken Sie meine aktuelle Kollektion und finden Sie das perfekte Kunstwerk für Ihr Zuhause.',
        viewGallery: 'Zur Galerie',
        visitShop: 'Zum Shop',
        featured: 'Ausgewählte Kunstwerke'
      },
      gallery: {
        title: 'Galerie',
        subtitle: 'Durchstöbern Sie unsere komplette Sammlung von Originalkunstwerken'
      },
      shop: {
        title: 'Shop',
        subtitle: 'Kaufen Sie Originalkunstwerke. Jedes Gemälde ist handsigniert und kommt mit einem Echtheitszertifikat.',
        addToCart: 'In den Warenkorb'
      },
      cart: {
        title: 'Warenkorb',
        empty: 'Ihr Warenkorb ist leer',
        continueShopping: 'Weiter einkaufen',
        subtotal: 'Zwischensumme',
        shipping: 'Versandkosten werden beim Checkout berechnet',
        checkout: 'Zur Kasse',
        remove: 'Entfernen',
        processing: 'Verarbeitung...'
      },
      contact: {
        title: 'Kontakt',
        getInTouch: 'Kontaktieren Sie uns',
        email: 'E-Mail',
        phone: 'Telefon',
        hours: 'Öffnungszeiten',
        name: 'Name',
        message: 'Nachricht',
        sendMessage: 'Nachricht senden',
        sending: 'Wird gesendet...',
        success: 'Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
        yourName: 'Ihr Name',
        yourEmail: 'ihre@email.de',
        yourMessage: 'Ihre Nachricht...'
      },
      product: {
        size: 'Größe',
        medium: 'Medium',
        year: 'Jahr',
        category: 'Kategorie',
        readyToShip: 'Versandbereit in 2-3 Werktagen',
        insuredShipping: 'Versicherter Versand',
        returnPolicy: '14-Tage Rückgaberecht',
        certificate: 'Echtheitszertifikat inklusive'
      },
      categories: {
        all: 'Alle',
        landscape: 'Landschaft',
        abstract: 'Abstrakt',
        portrait: 'Portrait'
      },
      footer: {
        about: 'Ihre Destination für zeitgenössische Kunst und originale Ölgemälde.',
        customerService: 'Kundenservice',
        shipping: 'Versand & Lieferung',
        returns: 'Rücksendungen & Erstattungen',
        payment: 'Zahlungsmethoden',
        faq: 'FAQ',
        legal: 'Rechtliches',
        imprint: 'Impressum',
        privacy: 'Datenschutz',
        terms: 'AGB',
        contactTitle: 'Kontakt',
        monFri: 'Mo-Fr: 10-18 Uhr',
        rights: '© 2024 ZAK Art Gallery. Alle Rechte vorbehalten.'
      }
    }
  };

  const texts = t[language];

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

  const categories = [
    texts.categories.all, 
    texts.categories.landscape, 
    texts.categories.abstract, 
    texts.categories.portrait
  ];
  const [selectedCategory, setSelectedCategory] = useState(texts.categories.all);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const featuredProducts = [products[0], products[1], products[4]];

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

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout error');
      }

      const { url } = await response.json();
      
      if (!url) {
        throw new Error('No checkout URL received');
      }

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setContactSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4 cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <img 
                src="/logo.png" 
                alt="ZAK Art Gallery" 
                className="h-10 cursor-pointer"
                onClick={() => setCurrentView('welcome')}
              />
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <button 
                onClick={() => setCurrentView('welcome')}
                className={`transition cursor-pointer ${currentView === 'welcome' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {texts.nav.welcome}
              </button>
              <button 
                onClick={() => setCurrentView('gallery')}
                className={`transition cursor-pointer ${currentView === 'gallery' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {texts.nav.gallery}
              </button>
              <button 
                onClick={() => setCurrentView('shop')}
                className={`transition cursor-pointer ${currentView === 'shop' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {texts.nav.shop}
              </button>
              <button 
                onClick={() => setCurrentView('contact')}
                className={`transition cursor-pointer ${currentView === 'contact' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {texts.nav.contact}
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
              >
                {language === 'en' ? '🇩🇪 DE' : '🇬🇧 EN'}
              </button>
              <button className="text-gray-700 hover:text-gray-900 cursor-pointer">
                <Search size={20} />
              </button>
              <button 
                onClick={() => setCurrentView('cart')}
                className="relative text-gray-700 hover:text-gray-900 cursor-pointer"
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
                onClick={() => {setCurrentView('welcome'); setMobileMenuOpen(false);}}
                className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {texts.nav.welcome}
              </button>
              <button 
                onClick={() => {setCurrentView('gallery'); setMobileMenuOpen(false);}}
                className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {texts.nav.gallery}
              </button>
              <button 
                onClick={() => {setCurrentView('shop'); setMobileMenuOpen(false);}}
                className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {texts.nav.shop}
              </button>
              <button 
                onClick={() => {setCurrentView('contact'); setMobileMenuOpen(false);}}
                className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {texts.nav.contact}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* WELCOME PAGE */}
        {currentView === 'welcome' && (
          <div>
            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" 
                  alt="Artist Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-5xl font-light text-gray-900 mb-6">
                  Welcome to ZAK Art Gallery
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  Original Oil Paintings & Charcoal Drawings
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Welcome to my world of contemporary art. For over a decade, I have been creating original paintings in oil and charcoal drawings, inspired by the beauty of nature and human emotion.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Each piece is a handcrafted original - created with passion, signed, and certified. Discover my current collection and find the perfect artwork for your home.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setCurrentView('gallery')}
                    className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded"
                  >
                    View Gallery
                  </button>
                  <button 
                    onClick={() => setCurrentView('shop')}
                    className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-50 transition rounded"
                  >
                    Visit Shop
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Artworks */}
            <div className="mb-16">
              <h3 className="text-3xl font-light text-gray-900 mb-8 text-center">{texts.welcome.featured}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProducts.map(product => (
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
                      <h4 className="text-lg font-light text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{product.size}</p>
                      <p className="text-xl font-light text-gray-900">
                        €{product.price.toLocaleString('en-US')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GALLERY PAGE */}
        {currentView === 'gallery' && (
          <>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-4">{texts.gallery.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {texts.gallery.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

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
                    <h3 className="text-lg font-light text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.size}</p>
                    <p className="text-xl font-light text-gray-900">
                      €{product.price.toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SHOP PAGE */}
        {currentView === 'shop' && (
          <>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-4">{texts.shop.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {texts.shop.subtitle}
              </p>
            </div>

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
                    <h3 className="text-lg font-light text-gray-900 mb-2">{product.name}</h3>
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
                        className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition rounded cursor-pointer"
                      >
                        {texts.shop.addToCart}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CONTACT PAGE */}
        {currentView === 'contact' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light text-gray-900 mb-8 text-center">{texts.contact.title}</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-6">{texts.contact.getInTouch}</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">{texts.contact.email}</p>
                      <p className="text-gray-600">info@manfredzak.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-gray-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">{texts.contact.phone}</p>
                      <p className="text-gray-600">+49 (0) 123 456789</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">{texts.contact.hours}</p>
                      <p className="text-gray-600">{texts.footer.monFri}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {contactSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                      {texts.contact.success}
                    </div>
                  )}
                  
                  {contactError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                      {contactError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{texts.contact.name}</label>
                    <input 
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
                      placeholder={texts.contact.yourName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{texts.contact.email}</label>
                    <input 
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
                      placeholder={texts.contact.yourEmail}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{texts.contact.message}</label>
                    <textarea 
                      rows="5"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
                      placeholder={texts.contact.yourMessage}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={contactLoading}
                    className="w-full py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactLoading ? texts.contact.sending : texts.contact.sendMessage}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* CART PAGE */}
        {currentView === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-gray-900 mb-8">{texts.cart.title}</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-6">{texts.cart.empty}</p>
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded cursor-pointer"
                >
                  {texts.cart.continueShopping}
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
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            {texts.cart.remove}
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
                    <span className="text-lg text-gray-700">{texts.cart.subtotal}</span>
                    <span className="text-2xl font-light text-gray-900">
                      €{cartTotal.toLocaleString('en-US')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    {texts.cart.shipping}
                  </p>
                  
                  {checkoutError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                      <strong>Error:</strong> {checkoutError}
                    </div>
                  )}

                  <button 
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {checkoutLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {texts.cart.processing}
                      </>
                    ) : (
                      <>
                        {texts.cart.checkout}
                        <ChevronRight size={20} />
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => setCurrentView('shop')}
                    className="w-full mt-3 py-3 text-gray-700 hover:text-gray-900 transition cursor-pointer"
                  >
                    {texts.cart.continueShopping}
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
                  className="w-full rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={() => setLightboxImage(selectedProduct.image)}
                />
              </div>
              <div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="float-right text-gray-400 hover:text-gray-600 cursor-pointer"
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
                  <p className="text-sm"><span className="text-gray-600">{texts.product.size}:</span> {selectedProduct.size}</p>
                  <p className="text-sm"><span className="text-gray-600">{texts.product.medium}:</span> {selectedProduct.technique}</p>
                  <p className="text-sm"><span className="text-gray-600">{texts.product.year}:</span> {selectedProduct.year}</p>
                  <p className="text-sm"><span className="text-gray-600">{texts.product.category}:</span> {selectedProduct.category}</p>
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {currentView === 'shop' && (
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded"
                  >
                    Add to Cart
                  </button>
                )}

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

      {/* Lightbox für Vollbild-Ansicht */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer z-10"
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-light text-lg mb-4">About ZAK</h3>
              <p className="text-sm text-gray-800">
                {texts.footer.about}
              </p>
            </div>
            <div>
              <h3 className="font-light text-lg mb-4">{texts.footer.customerService}</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li><a href="#shipping" className="hover:text-gray-900 cursor-pointer">{texts.footer.shipping}</a></li>
                <li><a href="#returns" className="hover:text-gray-900 cursor-pointer">{texts.footer.returns}</a></li>
                <li><a href="#payment" className="hover:text-gray-900 cursor-pointer">{texts.footer.payment}</a></li>
                <li><a href="#faq" className="hover:text-gray-900 cursor-pointer">{texts.footer.faq}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-light text-lg mb-4">{texts.footer.legal}</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li><a href="/imprint" className="hover:text-gray-900 cursor-pointer">{texts.footer.imprint}</a></li>
                <li><a href="/privacy" className="hover:text-gray-900 cursor-pointer">{texts.footer.privacy}</a></li>
                <li><a href="/terms" className="hover:text-gray-900 cursor-pointer">{texts.footer.terms}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-light text-lg mb-4">{texts.footer.contactTitle}</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>info@manfredzak.com</li>
                <li>+49 (0) 123 456789</li>
                <li>{texts.footer.monFri}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>{texts.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ZakArtGallery;