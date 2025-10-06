"use client";

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav: { welcome: 'Welcome', gallery: 'Gallery', shop: 'Shop', contact: 'Contact' },
    welcome: {
      title: 'Welcome to ZAK Art Gallery',
      subtitle: 'Original Oil Paintings & Charcoal Drawings',
      intro1: 'Welcome to my world of contemporary art. For over a decade, I have been creating original paintings in oil and charcoal drawings, inspired by the beauty of nature and human emotion.',
      intro2: 'Each piece is a handcrafted original - created with passion, signed, and certified. Discover my current collection and find the perfect artwork for your home.',
      viewGallery: 'View Gallery',
      visitShop: 'Visit Shop',
      featured: 'Featured Artworks'
    },
    gallery: { title: 'Gallery', subtitle: 'Browse our complete collection of original artworks' },
    shop: { title: 'Shop', subtitle: 'Purchase original artworks. Each painting is hand-signed and comes with a certificate of authenticity.', addToCart: 'Add to Cart' },
    cart: { title: 'Shopping Cart', empty: 'Your cart is empty', continueShopping: 'Continue Shopping', subtotal: 'Subtotal', shipping: 'Shipping costs calculated at checkout', checkout: 'Proceed to Checkout', remove: 'Remove', processing: 'Processing...' },
    contact: { title: 'Contact', getInTouch: 'Get in Touch', email: 'Email', phone: 'Phone', hours: 'Hours', name: 'Name', message: 'Message', sendMessage: 'Send Message', sending: 'Sending...', success: 'Message sent successfully! We\'ll get back to you soon.', yourName: 'Your name', yourEmail: 'your@email.com', yourMessage: 'Your message...' },
    product: { size: 'Size', medium: 'Medium', year: 'Year', category: 'Category', readyToShip: 'Ready to ship in 2-3 business days', insuredShipping: 'Insured shipping', returnPolicy: '14-day return policy', certificate: 'Certificate of authenticity included' },
    categories: { all: 'All', landscape: 'Landscape', abstract: 'Abstract', portrait: 'Portrait' },
    footer: { about: 'Your destination for contemporary art and original oil paintings.', customerService: 'Customer Service', shipping: 'Shipping & Delivery', returns: 'Returns & Refunds', payment: 'Payment Methods', faq: 'FAQ', legal: 'Legal', imprint: 'Imprint', privacy: 'Privacy Policy', terms: 'Terms & Conditions', widerruf: 'Right of Withdrawal', cookies: 'Cookie Policy', contactTitle: 'Contact', monFri: 'Mon-Fri: 10am-6pm', rights: '© 2024 ZAK Art Gallery. All rights reserved.' }
  },
  de: {
    nav: { welcome: 'Willkommen', gallery: 'Galerie', shop: 'Shop', contact: 'Kontakt' },
    welcome: {
      title: 'Willkommen in der ZAK Art Gallery',
      subtitle: 'Original Ölgemälde & Kohlekreide-Zeichnungen',
      intro1: 'Willkommen in meiner Welt der zeitgenössischen Kunst. Seit über einem Jahrzehnt erschaffe ich Originalgemälde in Öl und Kohlekreide-Zeichnungen, inspiriert von der Schönheit der Natur und menschlicher Emotionen.',
      intro2: 'Jedes Werk ist ein handgefertigtes Original - mit Leidenschaft erschaffen, signiert und zertifiziert. Entdecken Sie meine aktuelle Kollektion und finden Sie das perfekte Kunstwerk für Ihr Zuhause.',
      viewGallery: 'Zur Galerie',
      visitShop: 'Zum Shop',
      featured: 'Ausgewählte Kunstwerke'
    },
    gallery: { title: 'Galerie', subtitle: 'Durchstöbern Sie unsere komplette Sammlung von Originalkunstwerken' },
    shop: { title: 'Shop', subtitle: 'Kaufen Sie Originalkunstwerke. Jedes Gemälde ist handsigniert und kommt mit einem Echtheitszertifikat.', addToCart: 'In den Warenkorb' },
    cart: { title: 'Warenkorb', empty: 'Ihr Warenkorb ist leer', continueShopping: 'Weiter einkaufen', subtotal: 'Zwischensumme', shipping: 'Versandkosten werden beim Checkout berechnet', checkout: 'Zur Kasse', remove: 'Entfernen', processing: 'Verarbeitung...' },
    contact: { title: 'Kontakt', getInTouch: 'Kontaktieren Sie uns', email: 'E-Mail', phone: 'Telefon', hours: 'Öffnungszeiten', name: 'Name', message: 'Nachricht', sendMessage: 'Nachricht senden', sending: 'Wird gesendet...', success: 'Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.', yourName: 'Ihr Name', yourEmail: 'ihre@email.de', yourMessage: 'Ihre Nachricht...' },
    product: { size: 'Größe', medium: 'Medium', year: 'Jahr', category: 'Kategorie', readyToShip: 'Versandbereit in 2-3 Werktagen', insuredShipping: 'Versicherter Versand', returnPolicy: '14-Tage Rückgaberecht', certificate: 'Echtheitszertifikat inklusive' },
    categories: { all: 'Alle', landscape: 'Landschaft', abstract: 'Abstrakt', portrait: 'Portrait' },
    footer: { about: 'Ihre Destination für zeitgenössische Kunst und originale Ölgemälde.', customerService: 'Kundenservice', shipping: 'Versand & Lieferung', returns: 'Rücksendungen & Erstattungen', payment: 'Zahlungsmethoden', faq: 'FAQ', legal: 'Rechtliches', imprint: 'Impressum', privacy: 'Datenschutz', terms: 'AGB', widerruf: 'Widerrufsbelehrung', cookies: 'Cookie-Richtlinie', contactTitle: 'Kontakt', monFri: 'Mo-Fr: 10-18 Uhr', rights: '© 2024 ZAK Art Gallery. Alle Rechte vorbehalten.' }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'de' : 'en');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}