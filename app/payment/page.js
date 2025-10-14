'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { CreditCard, Wallet, Building, Shield, Lock } from 'lucide-react';

export default function PaymentPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Zahlungsmethoden',
      subtitle: 'Sichere und bequeme Zahlungsoptionen',
      
      methods: [
        {
          icon: CreditCard,
          title: 'Kreditkarte',
          text: 'Visa, Mastercard, American Express',
          features: ['Sofortige Bestätigung', 'Käuferschutz', '3D Secure']
        },
        {
          icon: Wallet,
          title: 'PayPal',
          text: 'Schnell und sicher mit PayPal bezahlen',
          features: ['Käuferschutz', 'Keine Gebühren', 'Express Checkout']
        },
        {
          icon: Building,
          title: 'Banküberweisung',
          text: 'SEPA-Überweisung',
          features: ['Keine zusätzlichen Kosten', 'Versand nach Zahlungseingang', 'Für große Bestellungen']
        },
        {
          icon: CreditCard,
          title: 'Sofortüberweisung',
          text: 'Direkte Überweisung via Klarna',
          features: ['Sofortige Bestätigung', 'TÜV-zertifiziert', 'Keine Registrierung']
        }
      ],

      security: {
        title: 'Sicherheit',
        text: 'Alle Zahlungen werden über verschlüsselte SSL-Verbindungen abgewickelt. Wir speichern keine Kreditkartendaten auf unseren Servern.',
        features: [
          'SSL-Verschlüsselung',
          'PCI-DSS konform',
          'Zertifizierte Payment-Provider',
          'Fraud Detection System'
        ]
      },

      installment: {
        title: 'Ratenzahlung',
        text: 'Für Kunstwerke ab 1.000€ bieten wir Ratenzahlung über Klarna an:',
        options: [
          '3 Raten - Zinsfrei',
          '6 Raten - Zinsfrei',
          '12 Raten - Ab 4,9% Jahreszins'
        ]
      },

      billing: {
        title: 'Rechnung',
        items: [
          'Sie erhalten eine Rechnung per E-Mail',
          'Alle Preise inkl. gesetzlicher MwSt.',
          'Ausgewiesene MwSt. kann bei Auslandslieferungen variieren',
          'Geschäftskunden können auf Rechnung kaufen (nach Prüfung)'
        ]
      },

      currencies: {
        title: 'Währungen',
        text: 'Wir akzeptieren Zahlungen in EUR, USD, GBP und CHF. Die Umrechnung erfolgt zum aktuellen Wechselkurs.'
      }
    },
    en: {
      title: 'Payment Methods',
      subtitle: 'Secure and convenient payment options',
      
      methods: [
        {
          icon: CreditCard,
          title: 'Credit Card',
          text: 'Visa, Mastercard, American Express',
          features: ['Instant confirmation', 'Buyer protection', '3D Secure']
        },
        {
          icon: Wallet,
          title: 'PayPal',
          text: 'Pay quickly and securely with PayPal',
          features: ['Buyer protection', 'No fees', 'Express Checkout']
        },
        {
          icon: Building,
          title: 'Bank Transfer',
          text: 'SEPA transfer',
          features: ['No additional costs', 'Shipping after payment', 'For large orders']
        },
        {
          icon: CreditCard,
          title: 'Instant Transfer',
          text: 'Direct transfer via Klarna',
          features: ['Instant confirmation', 'TÜV certified', 'No registration']
        }
      ],

      security: {
        title: 'Security',
        text: 'All payments are processed via encrypted SSL connections. We do not store credit card data on our servers.',
        features: [
          'SSL encryption',
          'PCI-DSS compliant',
          'Certified payment providers',
          'Fraud detection system'
        ]
      },

      installment: {
        title: 'Installment Payment',
        text: 'For artworks from €1,000, we offer installment payments via Klarna:',
        options: [
          '3 installments - Interest-free',
          '6 installments - Interest-free',
          '12 installments - From 4.9% APR'
        ]
      },

      billing: {
        title: 'Invoice',
        items: [
          'You will receive an invoice via email',
          'All prices include statutory VAT',
          'VAT shown may vary for international deliveries',
          'Business customers can buy on invoice (after verification)'
        ]
      },

      currencies: {
        title: 'Currencies',
        text: 'We accept payments in EUR, USD, GBP, and CHF. Conversion is done at the current exchange rate.'
      }
    }
  };

  const lang = language === 'de' ? content.de : content.en;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{lang.title}</h1>
          <p className="text-xl text-gray-600">{lang.subtitle}</p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {lang.methods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <method.icon size={24} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-600">{method.text}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {method.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security Section */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mb-8">
          <div className="flex items-start gap-4">
            <Shield size={32} className="text-blue-600 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{lang.security.title}</h2>
              <p className="text-gray-700 mb-4">{lang.security.text}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {lang.security.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Lock size={16} className="text-blue-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Installment Payment */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{lang.installment.title}</h2>
          <p className="text-gray-600 mb-4">{lang.installment.text}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {lang.installment.options.map((option, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <p className="font-semibold text-gray-900">{option}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{lang.billing.title}</h2>
          <ul className="space-y-3">
            {lang.billing.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Currencies */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{lang.currencies.title}</h2>
          <p className="text-gray-700">{lang.currencies.text}</p>
        </div>

      </div>
    </div>
  );
}