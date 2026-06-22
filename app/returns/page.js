'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Rücksendungen & Erstattungen',
      subtitle: 'Ihre Zufriedenheit ist unsere Priorität',
      
      policy: {
        title: 'Rückgaberecht',
        text: 'Sie haben das Recht, Ihre Bestellung innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen. Diese Frist beginnt am Tag, an dem Sie das Kunstwerk erhalten haben.',
        note: 'Bitte beachten Sie: Individuell angefertigte oder personalisierte Kunstwerke sind vom Widerrufsrecht ausgeschlossen.'
      },

      process: {
        title: 'Rückgabeprozess',
        steps: [
          {
            number: '1',
            title: 'Kontaktaufnahme',
            text: 'Senden Sie uns eine E-Mail an info@manfredzak.com mit Ihrer Bestellnummer.'
          },
          {
            number: '2',
            title: 'Rücksendeetikett',
            text: 'Wir senden Ihnen ein kostenloses Rücksendeetikett per E-Mail zu.'
          },
          {
            number: '3',
            title: 'Verpackung',
            text: 'Verpacken Sie das Kunstwerk in der Originalverpackung. Falls nicht vorhanden, verwenden Sie bitte eine sichere Verpackung.'
          },
          {
            number: '4',
            title: 'Versand',
            text: 'Übergeben Sie das Paket an den Versanddienstleister oder lassen Sie es abholen.'
          }
        ]
      },

      refund: {
        title: 'Erstattung',
        items: [
          'Erstattung innerhalb von 7 Werktagen nach Erhalt der Rücksendung',
          'Rückerstattung auf die ursprüngliche Zahlungsmethode',
          'Bei beschädigten oder fehlerhaften Artikeln übernehmen wir die Versandkosten',
          'Bei Widerruf trägt der Kunde die Rücksendekosten'
        ]
      },

      conditions: {
        title: 'Bedingungen',
        items: [
          'Das Kunstwerk muss sich im Originalzustand befinden',
          'Alle Zertifikate und Dokumentationen müssen beigefügt sein',
          'Das Kunstwerk darf nicht beschädigt oder verändert sein',
          'Die Originalverpackung sollte wenn möglich verwendet werden'
        ]
      },

      exceptions: {
        title: 'Ausnahmen',
        text: 'Folgende Artikel sind vom Widerrufsrecht ausgeschlossen:',
        items: [
          'Individuell angefertigte oder personalisierte Kunstwerke',
          'Kunstwerke auf Kommission',
          'Artikel im Sale oder mit Sonderrabatt über 50%'
        ]
      }
    },
    en: {
      title: 'Returns & Refunds',
      subtitle: 'Your satisfaction is our priority',
      
      policy: {
        title: 'Return Policy',
        text: 'You have the right to cancel your order within 14 days without giving any reason. This period begins on the day you receive the artwork.',
        note: 'Please note: Custom-made or personalized artworks are excluded from the right of withdrawal.'
      },

      process: {
        title: 'Return Process',
        steps: [
          {
            number: '1',
            title: 'Contact Us',
            text: 'Send us an email at info@manfredzak.com with your order number.'
          },
          {
            number: '2',
            title: 'Return Label',
            text: 'We will send you a free return label via email.'
          },
          {
            number: '3',
            title: 'Packaging',
            text: 'Pack the artwork in its original packaging. If not available, please use secure packaging.'
          },
          {
            number: '4',
            title: 'Shipping',
            text: 'Hand over the package to the shipping service or arrange pickup.'
          }
        ]
      },

      refund: {
        title: 'Refund',
        items: [
          'Refund within 7 business days after receiving the return',
          'Refund to the original payment method',
          'For damaged or defective items, we cover shipping costs',
          'For cancellations, customer bears return shipping costs'
        ]
      },

      conditions: {
        title: 'Conditions',
        items: [
          'The artwork must be in its original condition',
          'All certificates and documentation must be included',
          'The artwork must not be damaged or altered',
          'Original packaging should be used if possible'
        ]
      },

      exceptions: {
        title: 'Exceptions',
        text: 'The following items are excluded from the right of withdrawal:',
        items: [
          'Custom-made or personalized artworks',
          'Commission artworks',
          'Sale items or items with special discounts over 50%'
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

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-8">
            <div className="flex items-start gap-4">
              <CheckCircle size={32} className="text-gray-900 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.en.policy.title}</h2>
                <p className="text-gray-700 mb-3">{content.en.policy.text}</p>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{content.en.policy.note}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{content.en.process.title}</h2>
            <div className="space-y-6">
              {content.en.process.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <RotateCcw size={24} className="text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">{content.en.refund.title}</h2>
            </div>
            <ul className="space-y-3">
              {content.en.refund.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.en.conditions.title}</h2>
            <ul className="space-y-3">
              {content.en.conditions.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4">
              <AlertCircle size={24} className="text-gray-900 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.en.exceptions.title}</h2>
                <p className="text-gray-700 mb-3">{content.en.exceptions.text}</p>
                <ul className="space-y-2">
                  {content.en.exceptions.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <span className="text-gray-900">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ——— Deutsch ——— */}
        <div className="relative pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 h-px w-1/2"></div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.de.title}</h1>
            <p className="text-xl text-gray-600">{content.de.subtitle}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-8">
            <div className="flex items-start gap-4">
              <CheckCircle size={32} className="text-gray-900 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.de.policy.title}</h2>
                <p className="text-gray-700 mb-3">{content.de.policy.text}</p>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{content.de.policy.note}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{content.de.process.title}</h2>
            <div className="space-y-6">
              {content.de.process.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <RotateCcw size={24} className="text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">{content.de.refund.title}</h2>
            </div>
            <ul className="space-y-3">
              {content.de.refund.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.de.conditions.title}</h2>
            <ul className="space-y-3">
              {content.de.conditions.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4">
              <AlertCircle size={24} className="text-gray-900 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.de.exceptions.title}</h2>
                <p className="text-gray-700 mb-3">{content.de.exceptions.text}</p>
                <ul className="space-y-2">
                  {content.de.exceptions.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <span className="text-gray-900">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}