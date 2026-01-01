"use client";

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    nav: { 
      welcome: 'Welcome', 
      gallery: 'Gallery', 
      shop: 'Shop', 
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      account: 'Account',
      logout: 'Logout'
    },
    
    // Welcome Page
    welcome: {
      title: 'Welcome to ZAK Art Gallery',
      subtitle: 'Original Oil Paintings & Charcoal Drawings',
      intro1: 'Welcome to my world of contemporary art. For over a decade, I have been creating original paintings in oil and charcoal drawings, inspired by the beauty of nature and human emotion.',
      intro2: 'Each piece is a handcrafted original - created with passion, signed, and certified. Discover my current collection and find the perfect artwork for your home.',
      viewGallery: 'View Gallery',
      visitShop: 'Visit Shop',
      featured: 'Featured Artworks'
    },	
    
    // Gallery
    gallery: { 
      title: 'Gallery', 
      subtitle: 'Browse our complete collection of original artworks' 
    },
    
    // Shop
    shop: { 
      title: 'Shop', 
      subtitle: 'Purchase original artworks. Each painting is hand-signed and comes with a certificate of authenticity.', 
      addToCart: 'Add to Cart' 
    },
    
    // Cart
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
    
    // Contact
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
    
    // Product Details
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
    
    // NEW: Product Modal
    productModal: {
      enlarge: 'Enlarge',
      available: 'In Stock',
      original: 'Original Artwork',
      inclVAT: 'incl. VAT plus shipping',
      insured: 'Insured',
      returns: 'Returns',
      certificate: 'Certificate',
      addToCart: 'Add to Cart',
      added: 'Added',
      technicalDetails: 'Technical Details',
      size: 'Size',
      technique: 'Technique',
      year: 'Year',
      category: 'Category',
      description: 'Description',
      shippingReturns: 'Shipping & Returns',
      certTitle: 'Certificate of Authenticity',
      certText: 'Each artwork comes with a signed certificate of authenticity confirming the origin and authenticity of the piece.',
      shippingTitle: 'Shipping',
      shippingText: 'We ship all artworks carefully packaged and fully insured. Delivery time is 2-3 business days within Germany.',
      shippingDetails: 'Free shipping over €500 | Insured up to €10,000',
      returnsTitle: 'Returns',
      returnsText: 'You have 30 days to examine the artwork. If you\'re not satisfied, you can return it free of charge.',
      paymentTitle: 'Payment Methods',
      paymentMethods: 'Credit Card • PayPal • Amazon Pay • Klarna • Google Pay • Apple Pay',
      freeShipping: 'Free Shipping',
      freeShippingDetail: 'over €500',
      insuredUp: 'Insured',
      insuredDetail: 'up to €10,000',
      originalWith: 'Original with',
      originalDetail: 'Certificate',
      daysReturn: '30 Days',
      returnDetail: 'Returns'
    },
    
    // Categories
    categories: { 
      all: 'All', 
      landscape: 'Landscape', 
      abstract: 'Abstract', 
      portrait: 'Portrait' 
    },
    
    // Authentication - Login
    auth: {
      login: {
        title: 'Welcome Back',
        subtitle: 'Sign in to your account',
        emailLabel: 'Email Address',
        passwordLabel: 'Password',
        emailPlaceholder: 'john@example.com',
        passwordPlaceholder: '••••••••',
        submitButton: 'Sign In',
        signingIn: 'Signing in...',
        noAccount: 'Don\'t have an account?',
        createOne: 'Create one',
        guestCheckout: 'No account needed to shop',
        continueAsGuest: 'Continue as Guest',
        backToShop: 'Back to Shop'
      },
      
      // Registration
      register: {
        title: 'Create Account',
        subtitle: 'Join ZAK Art Gallery community',
        fullNameLabel: 'Full Name',
        fullNamePlaceholder: 'John Doe',
        emailLabel: 'Email Address',
        emailPlaceholder: 'john@example.com',
        passwordLabel: 'Password',
        passwordPlaceholder: '••••••••',
        confirmPasswordLabel: 'Confirm Password',
        passwordHint: 'At least 6 characters',
        submitButton: 'Create Account',
        creating: 'Creating account...',
        haveAccount: 'Already have an account?',
        signIn: 'Sign in',
        guestNote: 'No account needed? You can checkout as a guest anytime.',
        benefitsTitle: 'Benefits of creating an account:',
        benefits: {
          trackOrders: 'Track your orders',
          saveFavorites: 'Save your favorite artworks',
          earlyAccess: 'Early access to new collections',
          newsletter: 'Exclusive newsletter updates'
        },
        successTitle: 'Welcome to ZAK Art Gallery!',
        successMessage: 'Your account has been created successfully.',
        redirecting: 'Redirecting to your account...'
      },
      
      // Account Page
      account: {
        title: 'Welcome back',
        subtitle: 'Manage your account and explore your art journey',
        profile: 'Profile',
        orders: 'Orders',
        favorites: 'Favorites',
        newsletter: 'Newsletter',
        signOut: 'Sign Out',
        accountInfo: 'Account Information',
        fullNameLabel: 'Full Name',
        emailLabel: 'Email Address',
        memberSince: 'Member Since',
        notSet: 'Not set',
        benefitsTitle: 'Your Membership Benefits',
        benefits: {
          earlyAccess: 'Early Access',
          earlyAccessDesc: 'First to see new collections',
          orderTracking: 'Order Tracking',
          orderTrackingDesc: 'Follow your purchases',
          newsletter: 'Exclusive Newsletter',
          newsletterDesc: 'Artist stories & updates',
          saveFavorites: 'Save Favorites',
          saveFavoritesDesc: 'Build your wishlist'
        },
        comingSoon: 'Coming Soon',
        comingSoonMessage: 'Order history, favorites management, and personalized recommendations are on the way!',
        soon: 'Soon'
      },
      
      // ✅ NEU: E-Mail-Bestätigung
      verifyEmail: {
        title: 'Verify Your Email',
        subtitle: 'We have sent you an email',
        description: 'Please check your inbox and click on the confirmation link in the email.',
        nextSteps: 'Next Steps:',
        step1: 'Open your email inbox',
        step2: 'Find the email from ZAK Art Gallery',
        step3: 'Click on the confirmation link',
        step4: 'You will be automatically redirected',
        noEmail: 'Didn\'t receive an email?',
        emailResent: 'Email has been sent again!',
        resending: 'Sending...',
        resendButton: 'Resend Email',
        checkSpam: 'Also check your spam folder',
        supportText: 'If you have problems, contact us at',
        backToLogin: 'Back to Login'
      },
      
      // Error Messages
      errors: {
        loginFailed: 'Login failed. Please check your credentials.',
        passwordMismatch: 'Passwords don\'t match',
        passwordTooShort: 'Password must be at least 6 characters',
        registrationFailed: 'Registration failed. Please try again.',
        emailNotConfirmed: 'Email not confirmed. Please check your inbox.',
        genericError: 'An error occurred. Please try again.',
        emailAlreadyExists: 'This email address is already registered.',
        invalidCredentials: 'Invalid credentials. Please check your email and password.',
        weakPassword: 'Password is too weak. Use at least 6 characters.',
        invalidEmail: 'Invalid email address.'
      }
    },
    
    // Content Pages (News, Stories, Press, Private)
    content: {
      news: {
        title: 'News',
        emoji: '📰',
        description: 'Latest updates and announcements'
      },
      stories: {
        title: 'Stories',
        emoji: '📖',
        description: 'Behind the scenes and artist stories'
      },
      press: {
        title: 'Press',
        emoji: '📢',
        description: 'Press releases and media coverage'
      },
      private: {
        title: 'Private',
        emoji: '🔒',
        description: 'Personal reflections and thoughts'
      },
      noArticles: 'No published articles yet.',
      readMore: 'Read more',
      backTo: 'Back to',
      moreFrom: 'More from',
      by: 'by'
    },
    
    // Common/Global
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sortBy: 'Sort by',
      viewAll: 'View All',
      learnMore: 'Learn More',
      yes: 'Yes',
      no: 'No',
      confirm: 'Confirm'
    },
    
    // Footer
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
      widerruf: 'Right of Withdrawal', 
      cookies: 'Cookie Policy', 
      contactTitle: 'Contact', 
      monFri: 'Mon-Fri: 10am-6pm', 
      rights: '© 2024 ZAK Art Gallery. All rights reserved.' 
    }
  },
  
  de: {
    // Navigation
    nav: { 
      welcome: 'Willkommen', 
      gallery: 'Galerie', 
      shop: 'Shop', 
      contact: 'Kontakt',
      login: 'Anmelden',
      register: 'Registrieren',
      account: 'Konto',
      logout: 'Abmelden'
    },
    
    // Welcome Page
    welcome: {
      title: 'Willkommen in der ZAK Art Gallery',
      subtitle: 'Original Ölgemälde & Kohlekreide-Zeichnungen',
      intro1: 'Willkommen in meiner Welt der zeitgenössischen Kunst. Seit über einem Jahrzehnt erschaffe ich Originalgemälde in Öl und Kohlekreide-Zeichnungen, inspiriert von der Schönheit der Natur und menschlicher Emotionen.',
      intro2: 'Jedes Werk ist ein handgefertigtes Original - mit Leidenschaft erschaffen, signiert und zertifiziert. Entdecken Sie meine aktuelle Kollektion und finden Sie das perfekte Kunstwerk für Ihr Zuhause.',
      viewGallery: 'Zur Galerie',
      visitShop: 'Zum Shop',
      featured: 'Ausgewählte Kunstwerke'
    },
    
    // Gallery
    gallery: { 
      title: 'Galerie', 
      subtitle: 'Durchstöbern Sie unsere komplette Sammlung von Originalkunstwerken' 
    },
    
    // Shop
    shop: { 
      title: 'Shop', 
      subtitle: 'Kaufen Sie Originalkunstwerke. Jedes Gemälde ist handsigniert und kommt mit einem Echtheitszertifikat.', 
      addToCart: 'In den Warenkorb' 
    },
    
    // Cart
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
    
    // Contact
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
    
    // Product Details
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
    
    // NEW: Product Modal
    productModal: {
      enlarge: 'Vergrößern',
      available: 'Sofort lieferbar',
      original: 'Original Unikat',
      inclVAT: 'inkl. MwSt. zzgl. Versand',
      insured: 'Versichert',
      returns: 'Rückgabe',
      certificate: 'Zertifikat',
      addToCart: 'In den Warenkorb',
      added: 'Hinzugefügt',
      technicalDetails: 'Technische Details',
      size: 'Größe',
      technique: 'Technik',
      year: 'Jahr',
      category: 'Kategorie',
      description: 'Beschreibung',
      shippingReturns: 'Versand & Rückgabe',
      certTitle: 'Echtheitszertifikat',
      certText: 'Jedes Werk wird mit einem signierten Echtheitszertifikat geliefert, das die Authentizität und Herkunft des Kunstwerks bestätigt.',
      shippingTitle: 'Versand',
      shippingText: 'Wir versenden alle Werke sorgfältig verpackt und vollständig versichert. Die Lieferzeit beträgt 2-3 Werktage innerhalb Deutschlands.',
      shippingDetails: 'Kostenloser Versand ab €500 | Versichert bis €10.000',
      returnsTitle: 'Rückgabe',
      returnsText: 'Sie haben 30 Tage Zeit, das Werk in Ruhe zu prüfen. Bei Nichtgefallen können Sie es kostenfrei zurücksenden.',
      paymentTitle: 'Zahlungsmethoden',
      paymentMethods: 'Kreditkarte • PayPal • Amazon Pay • Klarna • Google Pay • Apple Pay',
      freeShipping: 'Kostenloser',
      freeShippingDetail: 'Versand ab €500',
      insuredUp: 'Versichert',
      insuredDetail: 'bis €10.000',
      originalWith: 'Original mit',
      originalDetail: 'Zertifikat',
      daysReturn: '30 Tage',
      returnDetail: 'Rückgabe'
    },
    
    // Categories
    categories: { 
      all: 'Alle', 
      landscape: 'Landschaft', 
      abstract: 'Abstrakt', 
      portrait: 'Portrait' 
    },
    
    // Authentication - Login
    auth: {
      login: {
        title: 'Willkommen zurück',
        subtitle: 'Melden Sie sich in Ihrem Konto an',
        emailLabel: 'E-Mail-Adresse',
        passwordLabel: 'Passwort',
        emailPlaceholder: 'max@beispiel.de',
        passwordPlaceholder: '••••••••',
        submitButton: 'Anmelden',
        signingIn: 'Wird angemeldet...',
        noAccount: 'Noch kein Konto?',
        createOne: 'Konto erstellen',
        guestCheckout: 'Kein Konto nötig zum Einkaufen',
        continueAsGuest: 'Als Gast fortfahren',
        backToShop: 'Zurück zum Shop'
      },
      
      // Registration
      register: {
        title: 'Konto erstellen',
        subtitle: 'Werden Sie Teil der ZAK Art Gallery Community',
        fullNameLabel: 'Vollständiger Name',
        fullNamePlaceholder: 'Max Mustermann',
        emailLabel: 'E-Mail-Adresse',
        emailPlaceholder: 'max@beispiel.de',
        passwordLabel: 'Passwort',
        passwordPlaceholder: '••••••••',
        confirmPasswordLabel: 'Passwort bestätigen',
        passwordHint: 'Mindestens 6 Zeichen',
        submitButton: 'Konto erstellen',
        creating: 'Konto wird erstellt...',
        haveAccount: 'Bereits ein Konto?',
        signIn: 'Anmelden',
        guestNote: 'Kein Konto nötig? Sie können jederzeit als Gast zur Kasse gehen.',
        benefitsTitle: 'Vorteile eines Kontos:',
        benefits: {
          trackOrders: 'Bestellungen verfolgen',
          saveFavorites: 'Lieblingskunstwerke speichern',
          earlyAccess: 'Früher Zugang zu neuen Kollektionen',
          newsletter: 'Exklusive Newsletter-Updates'
        },
        successTitle: 'Willkommen bei ZAK Art Gallery!',
        successMessage: 'Ihr Konto wurde erfolgreich erstellt.',
        redirecting: 'Weiterleitung zu Ihrem Konto...'
      },
      
      // Account Page
      account: {
        title: 'Willkommen zurück',
        subtitle: 'Verwalten Sie Ihr Konto und entdecken Sie Ihre Kunstreise',
        profile: 'Profil',
        orders: 'Bestellungen',
        favorites: 'Favoriten',
        newsletter: 'Newsletter',
        signOut: 'Abmelden',
        accountInfo: 'Kontoinformationen',
        fullNameLabel: 'Vollständiger Name',
        emailLabel: 'E-Mail-Adresse',
        memberSince: 'Mitglied seit',
        notSet: 'Nicht festgelegt',
        benefitsTitle: 'Ihre Mitgliedsvorteile',
        benefits: {
          earlyAccess: 'Früher Zugang',
          earlyAccessDesc: 'Erste, die neue Kollektionen sehen',
          orderTracking: 'Bestellverfolgung',
          orderTrackingDesc: 'Verfolgen Sie Ihre Käufe',
          newsletter: 'Exklusiver Newsletter',
          newsletterDesc: 'Künstlergeschichten & Updates',
          saveFavorites: 'Favoriten speichern',
          saveFavoritesDesc: 'Erstellen Sie Ihre Wunschliste'
        },
        comingSoon: 'Demnächst verfügbar',
        comingSoonMessage: 'Bestellhistorie, Favoritenverwaltung und personalisierte Empfehlungen folgen in Kürze!',
        soon: 'Bald'
      },
      
      // ✅ NEU: E-Mail-Bestätigung
      verifyEmail: {
        title: 'E-Mail bestätigen',
        subtitle: 'Wir haben Ihnen eine E-Mail gesendet',
        description: 'Bitte prüfen Sie Ihr Postfach und klicken Sie auf den Bestätigungslink in der E-Mail.',
        nextSteps: 'Nächste Schritte:',
        step1: 'Öffnen Sie Ihr E-Mail-Postfach',
        step2: 'Finden Sie die E-Mail von ZAK Art Gallery',
        step3: 'Klicken Sie auf den Bestätigungslink',
        step4: 'Sie werden automatisch weitergeleitet',
        noEmail: 'Keine E-Mail erhalten?',
        emailResent: 'E-Mail wurde erneut gesendet!',
        resending: 'Wird gesendet...',
        resendButton: 'E-Mail erneut senden',
        checkSpam: 'Prüfen Sie auch Ihren Spam-Ordner',
        supportText: 'Bei Problemen kontaktieren Sie uns unter',
        backToLogin: 'Zurück zur Anmeldung'
      },
      
      // Error Messages
      errors: {
        loginFailed: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.',
        passwordMismatch: 'Passwörter stimmen nicht überein',
        passwordTooShort: 'Passwort muss mindestens 6 Zeichen lang sein',
        registrationFailed: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
        emailNotConfirmed: 'E-Mail nicht bestätigt. Bitte prüfen Sie Ihr Postfach.',
        genericError: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        emailAlreadyExists: 'Diese E-Mail-Adresse ist bereits registriert.',
        invalidCredentials: 'Ungültige Anmeldedaten. Bitte überprüfen Sie E-Mail und Passwort.',
        weakPassword: 'Passwort ist zu schwach. Verwenden Sie mindestens 6 Zeichen.',
        invalidEmail: 'Ungültige E-Mail-Adresse.'
      }
    },
    
    // Content Pages (News, Stories, Press, Private)
    content: {
      news: {
        title: 'Neuigkeiten',
        emoji: '📰',
        description: 'Aktuelle Updates und Ankündigungen'
      },
      stories: {
        title: 'Geschichten',
        emoji: '📖',
        description: 'Hinter den Kulissen und Künstlergeschichten'
      },
      press: {
        title: 'Presse',
        emoji: '📢',
        description: 'Pressemitteilungen und Medienberichterstattung'
      },
      private: {
        title: 'Privat',
        emoji: '🔒',
        description: 'Persönliche Reflexionen und Gedanken'
      },
      noArticles: 'Noch keine veröffentlichten Artikel.',
      readMore: 'Weiterlesen',
      backTo: 'Zurück zu',
      moreFrom: 'Mehr von',
      by: 'von'
    },
    
    // Common/Global
    common: {
      loading: 'Lädt...',
      error: 'Fehler',
      success: 'Erfolg',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      update: 'Aktualisieren',
      close: 'Schließen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      search: 'Suchen',
      filter: 'Filtern',
      sortBy: 'Sortieren nach',
      viewAll: 'Alle anzeigen',
      learnMore: 'Mehr erfahren',
      yes: 'Ja',
      no: 'Nein',
      confirm: 'Bestätigen'
    },
    
    // Footer
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
      widerruf: 'Widerrufsbelehrung', 
      cookies: 'Cookie-Richtlinie', 
      contactTitle: 'Kontakt', 
      monFri: 'Mo-Fr: 10-18 Uhr', 
      rights: '© 2024 ZAK Art Gallery. Alle Rechte vorbehalten.' 
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('de'); // Deutsch als Standard (Primärmarkt)

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