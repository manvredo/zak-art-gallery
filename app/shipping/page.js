'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { Package, Truck, Globe, Shield } from 'lucide-react';

export default function ShippingPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Versand & Lieferung',
      subtitle: 'Sichere und zuverlässige Lieferung Ihrer Kunstwerke',
      
      sections: [
        {
          icon: Package,
          title: 'Verpackung',
          text: 'Jedes Kunstwerk wird sorgfältig in Schutzfolie und stabilen Kartonagen verpackt. Für besonders wertvolle Stücke verwenden wir spezielle Kunsttransportkisten.'
        },
        {
          icon: Truck,
          title: 'Versandoptionen',
          items: [
            'Standardversand (5-7 Werktage) - Kostenlos ab 500€',
            'Expressversand (2-3 Werktage) - 29€',
            'Overnight Express (1 Werktag) - 59€',
            'Persönliche Übergabe in Berlin nach Vereinbarung'
          ]
        },
        {
          icon: Globe,
          title: 'Internationaler Versand',
          text: 'Wir versenden weltweit. Die Versandkosten und Lieferzeiten variieren je nach Zielland. Alle Zollgebühren sind vom Käufer zu tragen.'
        },
        {
          icon: Shield,
          title: 'Versicherung',
          text: 'Alle Sendungen sind vollständig versichert. Bei Beschädigungen während des Transports erstatten wir den vollen Kaufpreis oder senden ein Ersatzwerk.'
        }
      ],

      tracking: {
        title: 'Sendungsverfolgung',
        text: 'Nach dem Versand erhalten Sie eine E-Mail mit der Tracking-Nummer. So können Sie Ihre Lieferung jederzeit verfolgen.'
      },

      delivery: {
        title: 'Zustellung',
        items: [
          'Zustellung nur gegen Unterschrift',
          'Bei Abwesenheit hinterlässt der Kurier eine Benachrichtigung',
          'Abholung in der nächsten Filiale möglich',
          'Umleitung an eine Packstation auf Anfrage'
        ]
      }
    },
    en: {
      title: 'Shipping & Delivery',
      subtitle: 'Safe and reliable delivery of your artworks',
      
      sections: [
        {
          icon: Package,
          title: 'Packaging',
          text: 'Each artwork is carefully wrapped in protective film and sturdy cardboard. For particularly valuable pieces, we use special art transport crates.'
        },
        {
          icon: Truck,
          title: 'Shipping Options',
          items: [
            'Standard Shipping (5-7 business days) - Free over €500',
            'Express Shipping (2-3 business days) - €29',
            'Overnight Express (1 business day) - €59',
            'Personal handover in Berlin by appointment'
          ]
        },
        {
          icon: Globe,
          title: 'International Shipping',
          text: 'We ship worldwide. Shipping costs and delivery times vary by destination. All customs fees are the responsibility of the buyer.'
        },
        {
          icon: Shield,
          title: 'Insurance',
          text: 'All shipments are fully insured. In case of damage during transport, we will refund the full purchase price or send a replacement.'
        }
      ],

      tracking: {
        title: 'Package Tracking',
        text: 'After shipping, you will receive an email with the tracking number. This allows you to track your delivery at any time.'
      },

      delivery: {
        title: 'Delivery',
        items: [
          'Delivery only against signature',
          'In case of absence, the courier leaves a notification',
          'Pickup at the nearest branch possible',
          'Redirection to a parcel locker upon request'
        ]
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

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {lang.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <section.icon size={24} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                  {section.text && (
                    <p className="text-gray-600 leading-relaxed">{section.text}</p>
                  )}
                  {section.items && (
                    <ul className="space-y-2 mt-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tracking */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{lang.tracking.title}</h2>
          <p className="text-gray-700">{lang.tracking.text}</p>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{lang.delivery.title}</h2>
          <ul className="space-y-3">
            {lang.delivery.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}