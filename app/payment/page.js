'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { CreditCard, Wallet, Shield, Lock } from 'lucide-react';

export default function PaymentPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Zahlungsmethoden',
      subtitle: 'Sichere Zahlungsabwicklung über Stripe',

      intro: 'Der gesamte Bezahlvorgang läuft über Stripe, einen der weltweit führenden Anbieter für verschlüsselte Zahlungsabwicklung. Du wählst beim Checkout einfach deine bevorzugte Methode aus:',

      methods: [
        {
          icon: CreditCard,
          title: 'Kredit- / Debitkarte',
          text: 'Visa, Mastercard, sowie Apple Pay auf unterstützten Geräten',
          features: ['Sofortige Bestätigung', '3D Secure', 'Keine Kartendaten auf unseren Servern']
        },
        {
          icon: Wallet,
          title: 'PayPal',
          text: 'Schnell und sicher mit PayPal bezahlen',
          features: ['Käuferschutz', 'Express Checkout']
        },
        {
          icon: Wallet,
          title: 'Amazon Pay',
          text: 'Bezahlen mit deinem Amazon-Konto',
          features: ['Keine neue Registrierung nötig', 'Adress- & Zahlungsdaten aus Amazon']
        },
        {
          icon: CreditCard,
          title: 'Klarna',
          text: 'Zahlung direkt über Klarna abwickeln',
          features: ['TÜV-zertifiziert', 'Sofortige Bestätigung']
        }
      ],

      security: {
        title: 'Sicherheit',
        text: 'Alle Zahlungen werden verschlüsselt über Stripe abgewickelt. Wir speichern zu keinem Zeitpunkt Kreditkarten- oder Zahlungsdaten auf unseren eigenen Servern.',
        features: [
          'SSL-Verschlüsselung',
          'PCI-DSS konform',
          'Zahlungsabwicklung durch Stripe',
          'Automatische Rechnungserstellung per E-Mail'
        ]
      },

      billing: {
        title: 'Rechnung',
        items: [
          'Nach erfolgreicher Zahlung erhältst du automatisch eine Rechnung per E-Mail',
          'Alle Preise verstehen sich inkl. gesetzlicher MwSt.'
        ]
      },

      currencies: {
        title: 'Währung',
        text: 'Alle Preise im Shop sind in Euro (EUR) angegeben, die Zahlung erfolgt ebenfalls in Euro.'
      }
    },
    en: {
      title: 'Payment Methods',
      subtitle: 'Secure payment processing via Stripe',

      intro: 'The entire checkout runs through Stripe, one of the world\'s leading providers of encrypted payment processing. At checkout, simply choose your preferred method:',

      methods: [
        {
          icon: CreditCard,
          title: 'Credit / Debit Card',
          text: 'Visa, Mastercard, as well as Apple Pay on supported devices',
          features: ['Instant confirmation', '3D Secure', 'No card data stored on our servers']
        },
        {
          icon: Wallet,
          title: 'PayPal',
          text: 'Pay quickly and securely with PayPal',
          features: ['Buyer protection', 'Express Checkout']
        },
        {
          icon: Wallet,
          title: 'Amazon Pay',
          text: 'Pay using your Amazon account',
          features: ['No new registration needed', 'Address & payment details from Amazon']
        },
        {
          icon: CreditCard,
          title: 'Klarna',
          text: 'Complete your payment directly via Klarna',
          features: ['TÜV certified', 'Instant confirmation']
        }
      ],

      security: {
        title: 'Security',
        text: 'All payments are processed securely through Stripe. We never store credit card or payment data on our own servers.',
        features: [
          'SSL encryption',
          'PCI-DSS compliant',
          'Payments processed by Stripe',
          'Automatic invoice by email'
        ]
      },

      billing: {
        title: 'Invoice',
        items: [
          'After successful payment you automatically receive an invoice by email',
          'All prices include statutory VAT'
        ]
      },

      currencies: {
        title: 'Currency',
        text: 'All prices in the shop are listed in Euro (EUR), and payment is also made in Euro.'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ——— English ——— */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.en.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{content.en.subtitle}</p>
            <p className="text-gray-600 max-w-2xl mx-auto">{content.en.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {content.en.methods.map((method, index) => (
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
                      <span className="text-gray-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-8">
            <div className="flex items-start gap-4">
              <Shield size={32} className="text-gray-900 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.en.security.title}</h2>
                <p className="text-gray-700 mb-4">{content.en.security.text}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {content.en.security.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Lock size={16} className="text-gray-900" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.en.billing.title}</h2>
            <ul className="space-y-3">
              {content.en.billing.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{content.en.currencies.title}</h2>
            <p className="text-gray-700">{content.en.currencies.text}</p>
          </div>
        </div>

        {/* ——— Deutsch ——— */}
        <div className="relative pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 h-px w-1/2"></div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.de.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{content.de.subtitle}</p>
            <p className="text-gray-600 max-w-2xl mx-auto">{content.de.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {content.de.methods.map((method, index) => (
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
                      <span className="text-gray-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-8">
            <div className="flex items-start gap-4">
              <Shield size={32} className="text-gray-900 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.de.security.title}</h2>
                <p className="text-gray-700 mb-4">{content.de.security.text}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {content.de.security.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Lock size={16} className="text-gray-900" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.de.billing.title}</h2>
            <ul className="space-y-3">
              {content.de.billing.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{content.de.currencies.title}</h2>
            <p className="text-gray-700">{content.de.currencies.text}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
