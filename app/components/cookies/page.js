'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';

export default function CookiesPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Cookie-Richtlinie',
      description: 'Informationen über die Verwendung von Cookies auf unserer Website',
      sections: [
        {
          heading: 'Was sind Cookies?',
          text: 'Cookies sind kleine Textdateien, die auf deinem Gerät gespeichert werden, wenn du unsere Website besuchst. Sie ermöglichen es uns, dein Browsererlebnis zu verbessern und die Website besser zu verstehen.'
        },
        {
          heading: 'Arten von Cookies',
          items: [
            {
              title: 'Notwendige Cookies',
              desc: 'Diese Cookies sind erforderlich, damit die Website korrekt funktioniert. Sie können nicht deaktiviert werden.'
            },
            {
              title: 'Analytics Cookies',
              desc: 'Diese Cookies helfen uns zu verstehen, wie Besucher die Website nutzen. Sie werden von Vercel Analytics verwendet.'
            },
            {
              title: 'Marketing Cookies',
              desc: 'Diese Cookies werden verwendet, um dir relevante Inhalte zu zeigen und Anzeigen zu personalisieren.'
            }
          ]
        },
        {
          heading: 'Wie wir Cookies verwenden',
          list: [
            'Authentifizierung und Sicherheit (Supabase)',
            'Analytics und Website-Nutzung (Vercel Analytics)',
            'Benutzereinstellungen speichern',
            'Cookie-Zustimmung speichern'
          ]
        },
        {
          heading: 'Deine Rechte',
          text: 'Du kannst deine Cookie-Einstellungen jederzeit in den Browsereinstellungen ändern oder ablehnen. Beachte, dass dies die Funktionalität der Website beeinträchtigen kann.'
        },
        {
          heading: 'Kontakt',
          text: 'Wenn du Fragen zur Verwendung von Cookies hast, kontaktiere uns bitte unter info@zakartgallery.com'
        }
      ]
    },
    en: {
      title: 'Cookie Policy',
      description: 'Information about cookie usage on our website',
      sections: [
        {
          heading: 'What are Cookies?',
          text: 'Cookies are small text files stored on your device when you visit our website. They allow us to improve your browsing experience and better understand how you use our site.'
        },
        {
          heading: 'Types of Cookies',
          items: [
            {
              title: 'Necessary Cookies',
              desc: 'These cookies are required for the website to function correctly. They cannot be disabled.'
            },
            {
              title: 'Analytics Cookies',
              desc: 'These cookies help us understand how visitors use the website. They are used by Vercel Analytics.'
            },
            {
              title: 'Marketing Cookies',
              desc: 'These cookies are used to show you relevant content and personalize advertisements.'
            }
          ]
        },
        {
          heading: 'How We Use Cookies',
          list: [
            'Authentication and security (Supabase)',
            'Analytics and website usage (Vercel Analytics)',
            'Saving user preferences',
            'Storing cookie consent'
          ]
        },
        {
          heading: 'Your Rights',
          text: 'You can change your cookie settings at any time in your browser settings or decline them. Please note that this may affect the functionality of the website.'
        },
        {
          heading: 'Contact',
          text: 'If you have questions about cookie usage, please contact us at info@zakartgallery.com'
        }
      ]
    }
  };

  const t = content[language] || content.de;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Zurück
          </Link>
          <h1 className="text-4xl font-light text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-600">{t.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          {t.sections.map((section, idx) => (
            <section key={idx} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.heading}
              </h2>

              {section.text && (
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {section.text}
                </p>
              )}

              {section.items && (
                <div className="space-y-4 mb-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {section.list && (
                <ul className="space-y-2 mb-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Updated Date */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}