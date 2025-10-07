"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Mail, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function SuccessPage() {
  const { cart, clearCart } = useCart();
  const { language } = useLanguage();

  useEffect(() => {
    // Clear cart after successful purchase
    if (cart.length > 0) {
      clearCart();
    }
  }, []);

  const texts = {
    en: {
      title: 'Order Confirmed!',
      subtitle: 'Thank you for your purchase',
      message: 'Your order has been successfully processed. You will receive a confirmation email shortly with your order details and tracking information.',
      orderNumber: 'Order Number',
      whatNext: 'What happens next?',
      step1Title: 'Order Confirmation',
      step1Desc: 'You will receive an email confirmation with your order details.',
      step2Title: 'Packaging',
      step2Desc: 'Your artwork will be carefully packaged with professional materials.',
      step3Title: 'Shipping',
      step3Desc: 'We will ship your order within 2-3 business days with insured delivery.',
      step4Title: 'Delivery',
      step4Desc: 'Track your shipment and receive your artwork safely at your doorstep.',
      needHelp: 'Need help?',
      contactUs: 'If you have any questions about your order, please contact us at',
      continueShopping: 'Continue Shopping',
      backHome: 'Back to Home'
    },
    de: {
      title: 'Bestellung Bestätigt!',
      subtitle: 'Vielen Dank für Ihren Einkauf',
      message: 'Ihre Bestellung wurde erfolgreich verarbeitet. Sie erhalten in Kürze eine Bestätigungs-E-Mail mit Ihren Bestelldetails und Tracking-Informationen.',
      orderNumber: 'Bestellnummer',
      whatNext: 'Wie geht es weiter?',
      step1Title: 'Bestellbestätigung',
      step1Desc: 'Sie erhalten eine E-Mail mit Ihren Bestelldetails.',
      step2Title: 'Verpackung',
      step2Desc: 'Ihr Kunstwerk wird sorgfältig mit professionellen Materialien verpackt.',
      step3Title: 'Versand',
      step3Desc: 'Wir versenden Ihre Bestellung innerhalb von 2-3 Werktagen mit versicherter Lieferung.',
      step4Title: 'Lieferung',
      step4Desc: 'Verfolgen Sie Ihre Sendung und erhalten Sie Ihr Kunstwerk sicher an Ihrer Haustür.',
      needHelp: 'Brauchen Sie Hilfe?',
      contactUs: 'Wenn Sie Fragen zu Ihrer Bestellung haben, kontaktieren Sie uns unter',
      continueShopping: 'Weiter einkaufen',
      backHome: 'Zurück zur Startseite'
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK ART GALLERY
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon and Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500" size={80} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{t.subtitle}</p>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {t.message}
          </p>
        </div>

        {/* Order Number (Optional - you can add order ID from Stripe) */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center">
          <p className="text-sm text-gray-600 mb-2">{t.orderNumber}</p>
          <p className="text-2xl font-light text-gray-900">#ORD-{Date.now().toString().slice(-8)}</p>
        </div>

        {/* What's Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">{t.whatNext}</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="text-gray-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{t.step1Title}</h3>
                <p className="text-gray-600 text-sm">{t.step1Desc}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="text-gray-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{t.step2Title}</h3>
                <p className="text-gray-600 text-sm">{t.step2Desc}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="text-gray-600" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{t.step3Title}</h3>
                <p className="text-gray-600 text-sm">{t.step3Desc}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Home className="text-gray-600" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{t.step4Title}</h3>
                <p className="text-gray-600 text-sm">{t.step4Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-medium text-gray-900 mb-2">{t.needHelp}</h3>
          <p className="text-gray-700 text-sm">
            {t.contactUs} <a href="mailto:info@zakartgallery.com" className="text-blue-600 hover:text-blue-700 underline">info@zakartgallery.com</a>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded text-center cursor-pointer"
          >
            {t.backHome}
          </Link>
          <Link 
            href="/"
            className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-50 transition rounded text-center cursor-pointer"
          >
            {t.continueShopping}
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 ZAK Art Gallery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}