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
            'Standardversand Deutschland (5-7 Werktage) - 15€',
            'Standardversand ab 500€ Warenwert - Kostenlos',
            'Expressversand (2-3 Werktage) - 45€',
            'Overnight Express (1 Werktag) - 75€',
            'Persönliche Übergabe in Berlin nach Vereinbarung - Kostenlos'
          ]
        },
        {
          icon: Globe,
          title: 'Internationaler Versand',
          text: 'Wir versenden weltweit. Die Versandkosten variieren je nach Zielland:\n• Europa: ab 35€\n• Übersee: ab 60€\n\nAlle Sendungen sind vollständig versichert. Zollgebühren und Einfuhrsteuern sind vom Käufer zu tragen. Für genaue Kosten und Lieferzeiten kontaktieren Sie uns bitte vor der Bestellung.'
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
            'Standard Shipping Germany (5-7 business days) - €15',
            'Standard Shipping over €500 - Free',
            'Express Shipping (2-3 business days) - €45',
            'Overnight Express (1 business day) - €75',
            'Personal handover in Berlin by appointment - Free'
          ]
        },
        {
          icon: Globe,
          title: 'International Shipping',
          text: 'We ship worldwide. Shipping costs vary by destination:\n• Europe: from €35\n• Overseas: from €60\n\nAll shipments are fully insured. Customs fees and import taxes are the responsibility of the buyer. Please contact us before ordering for exact costs and delivery times.'
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

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ——— English ——— */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.en.title}</h1>
            <p className="text-xl text-gray-600">{content.en.subtitle}</p>
          </div>

          <div className="space-y-8 mb-12">
            {content.en.sections.map((section, index) => (
              <div key={index}>
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <section.icon size={24} className="text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                      {section.text && (
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.text}</p>
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
                {index === 0 && (
                  <div className="mt-8 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src="https://res.cloudinary.com/dhjcx2xdd/image/upload/v1764411602/ph4js0yzkflpljq9wc6y.png"
                      alt="Professional art packaging"
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.en.tracking.title}</h2>
            <p className="text-gray-700">{content.en.tracking.text}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.en.delivery.title}</h2>
            <ul className="space-y-3">
              {content.en.delivery.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ——— Deutsch ——— */}
        <div className="relative pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 h-px w-1/2"></div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.de.title}</h1>
            <p className="text-xl text-gray-600">{content.de.subtitle}</p>
          </div>

          <div className="space-y-8 mb-12">
            {content.de.sections.map((section, index) => (
              <div key={index}>
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <section.icon size={24} className="text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                      {section.text && (
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.text}</p>
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
                {index === 0 && (
                  <div className="mt-8 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src="https://res.cloudinary.com/dhjcx2xdd/image/upload/v1764411602/ph4js0yzkflpljq9wc6y.png"
                      alt="Professionelle Kunstverpackung"
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.de.tracking.title}</h2>
            <p className="text-gray-700">{content.de.tracking.text}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.de.delivery.title}</h2>
            <ul className="space-y-3">
              {content.de.delivery.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}