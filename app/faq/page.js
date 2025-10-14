'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const content = {
    de: {
      title: 'Häufig gestellte Fragen',
      subtitle: 'Antworten auf die wichtigsten Fragen',
      
      categories: [
        {
          title: 'Bestellung & Zahlung',
          faqs: [
            {
              question: 'Wie kann ich ein Kunstwerk bestellen?',
              answer: 'Klicken Sie auf das gewünschte Kunstwerk und dann auf "In den Warenkorb". Im Warenkorb können Sie zur Kasse gehen und Ihre Bestellung abschließen.'
            },
            {
              question: 'Welche Zahlungsmethoden werden akzeptiert?',
              answer: 'Wir akzeptieren Kreditkarten (Visa, Mastercard, Amex), PayPal, Banküberweisung und Sofortüberweisung. Für Bestellungen ab 1.000€ bieten wir auch Ratenzahlung an.'
            },
            {
              question: 'Ist meine Zahlung sicher?',
              answer: 'Ja, alle Zahlungen werden über verschlüsselte SSL-Verbindungen abgewickelt. Wir speichern keine Kreditkartendaten und arbeiten nur mit zertifizierten Payment-Providern.'
            },
            {
              question: 'Erhalte ich eine Rechnung?',
              answer: 'Ja, Sie erhalten automatisch eine Rechnung per E-Mail nach Abschluss der Bestellung. Geschäftskunden können eine Rechnung mit ausgewiesener USt-IdNr. anfordern.'
            }
          ]
        },
        {
          title: 'Versand & Lieferung',
          faqs: [
            {
              question: 'Wie lange dauert der Versand?',
              answer: 'Standardversand dauert 5-7 Werktage. Expressversand ist in 2-3 Werktagen möglich. Bei personalisierten Kunstwerken kann die Lieferzeit länger sein.'
            },
            {
              question: 'Wie hoch sind die Versandkosten?',
              answer: 'Der Standardversand ist ab einem Bestellwert von 500€ kostenlos. Darunter berechnen wir 9,90€. Expressversand kostet 29€.'
            },
            {
              question: 'Liefern Sie international?',
              answer: 'Ja, wir liefern weltweit. Die Versandkosten variieren je nach Zielland. Bitte beachten Sie, dass Zollgebühren vom Käufer zu tragen sind.'
            },
            {
              question: 'Wie wird das Kunstwerk verpackt?',
              answer: 'Jedes Kunstwerk wird sorgfältig in Schutzfolie und stabilen Kartonagen verpackt. Wertvolle Stücke versenden wir in speziellen Kunsttransportkisten.'
            }
          ]
        },
        {
          title: 'Rückgabe & Umtausch',
          faqs: [
            {
              question: 'Kann ich ein Kunstwerk zurückgeben?',
              answer: 'Ja, Sie haben ein 14-tägiges Widerrufsrecht. Ausgenommen sind individuell angefertigte oder personalisierte Kunstwerke.'
            },
            {
              question: 'Wie funktioniert die Rückgabe?',
              answer: 'Kontaktieren Sie uns per E-Mail, und wir senden Ihnen ein kostenloses Rücksendeetikett zu. Nach Erhalt der Rücksendung erstatten wir den Kaufpreis innerhalb von 7 Werktagen.'
            },
            {
              question: 'Wer trägt die Rücksendekosten?',
              answer: 'Bei Widerruf trägt der Kunde die Rücksendekosten. Bei beschädigten oder fehlerhaften Artikeln übernehmen wir alle Kosten.'
            }
          ]
        },
        {
          title: 'Kunstwerke & Zertifikate',
          faqs: [
            {
              question: 'Sind alle Kunstwerke Originale?',
              answer: 'Ja, alle unsere Kunstwerke sind handgefertigte Originale. Jedes Werk ist ein Unikat und wird vom Künstler signiert.'
            },
            {
              question: 'Erhalte ich ein Echtheitszertifikat?',
              answer: 'Ja, jedes Kunstwerk wird mit einem signierten Echtheitszertifikat geliefert, das die Authentizität bestätigt.'
            },
            {
              question: 'Kann ich ein Kunstwerk reservieren lassen?',
              answer: 'Ja, kontaktieren Sie uns per E-Mail oder Telefon. Wir können Kunstwerke für 48 Stunden reservieren.'
            },
            {
              question: 'Bieten Sie Kunstwerke auf Kommission an?',
              answer: 'Ja, wir fertigen auch individuelle Kunstwerke nach Ihren Wünschen an. Kontaktieren Sie uns für ein persönliches Beratungsgespräch.'
            }
          ]
        },
        {
          title: 'Allgemeines',
          faqs: [
            {
              question: 'Wie kann ich Sie kontaktieren?',
              answer: 'Sie erreichen uns per E-Mail unter info@zakartgallery.com oder telefonisch unter +49 (0) 123 456789. Unsere Öffnungszeiten sind Mo-Fr von 10-18 Uhr.'
            },
            {
              question: 'Haben Sie eine physische Galerie?',
              answer: 'Ja, unsere Galerie befindet sich in Berlin. Besuche sind nach Terminvereinbarung möglich.'
            },
            {
              question: 'Bieten Sie Gutscheine an?',
              answer: 'Ja, Geschenkgutscheine sind in verschiedenen Beträgen erhältlich. Kontaktieren Sie uns für weitere Informationen.'
            }
          ]
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most important questions',
      
      categories: [
        {
          title: 'Orders & Payment',
          faqs: [
            {
              question: 'How can I order an artwork?',
              answer: 'Click on the desired artwork and then on "Add to Cart". In the cart, you can proceed to checkout and complete your order.'
            },
            {
              question: 'What payment methods are accepted?',
              answer: 'We accept credit cards (Visa, Mastercard, Amex), PayPal, bank transfer, and instant transfer. For orders over €1,000, we also offer installment payments.'
            },
            {
              question: 'Is my payment secure?',
              answer: 'Yes, all payments are processed via encrypted SSL connections. We do not store credit card data and only work with certified payment providers.'
            },
            {
              question: 'Will I receive an invoice?',
              answer: 'Yes, you will automatically receive an invoice via email after completing your order. Business customers can request an invoice with VAT ID.'
            }
          ]
        },
        {
          title: 'Shipping & Delivery',
          faqs: [
            {
              question: 'How long does shipping take?',
              answer: 'Standard shipping takes 5-7 business days. Express shipping is possible in 2-3 business days. Personalized artworks may take longer.'
            },
            {
              question: 'What are the shipping costs?',
              answer: 'Standard shipping is free for orders over €500. Below that, we charge €9.90. Express shipping costs €29.'
            },
            {
              question: 'Do you deliver internationally?',
              answer: 'Yes, we deliver worldwide. Shipping costs vary by destination. Please note that customs fees are the buyer\'s responsibility.'
            },
            {
              question: 'How is the artwork packaged?',
              answer: 'Each artwork is carefully wrapped in protective film and sturdy cardboard. Valuable pieces are shipped in special art transport crates.'
            }
          ]
        },
        {
          title: 'Returns & Exchange',
          faqs: [
            {
              question: 'Can I return an artwork?',
              answer: 'Yes, you have a 14-day right of withdrawal. Exceptions are custom-made or personalized artworks.'
            },
            {
              question: 'How does the return process work?',
              answer: 'Contact us via email and we will send you a free return label. After receiving the return, we will refund the purchase price within 7 business days.'
            },
            {
              question: 'Who bears the return shipping costs?',
              answer: 'For cancellations, the customer bears the return shipping costs. For damaged or defective items, we cover all costs.'
            }
          ]
        },
        {
          title: 'Artworks & Certificates',
          faqs: [
            {
              question: 'Are all artworks originals?',
              answer: 'Yes, all our artworks are handcrafted originals. Each work is unique and signed by the artist.'
            },
            {
              question: 'Will I receive a certificate of authenticity?',
              answer: 'Yes, each artwork comes with a signed certificate of authenticity confirming its authenticity.'
            },
            {
              question: 'Can I have an artwork reserved?',
              answer: 'Yes, contact us via email or phone. We can reserve artworks for 48 hours.'
            },
            {
              question: 'Do you offer commissioned artworks?',
              answer: 'Yes, we also create custom artworks according to your wishes. Contact us for a personal consultation.'
            }
          ]
        },
        {
          title: 'General',
          faqs: [
            {
              question: 'How can I contact you?',
              answer: 'You can reach us via email at info@zakartgallery.com or by phone at +49 (0) 123 456789. Our opening hours are Mon-Fri from 10am-6pm.'
            },
            {
              question: 'Do you have a physical gallery?',
              answer: 'Yes, our gallery is located in Berlin. Visits are possible by appointment.'
            },
            {
              question: 'Do you offer gift vouchers?',
              answer: 'Yes, gift vouchers are available in various amounts. Contact us for more information.'
            }
          ]
        }
      ]
    }
  };

  const lang = language === 'de' ? content.de : content.en;

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const index = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{lang.title}</h1>
          <p className="text-xl text-gray-600">{lang.subtitle}</p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {lang.categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{category.title}</h2>
              <div className="space-y-3">
                {category.faqs.map((faq, faqIndex) => {
                  const index = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openIndex === index;
                  
                  return (
                    <div 
                      key={faqIndex}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp size={20} className="text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-600 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 pt-2">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-3">
            {language === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
          </h3>
          <p className="text-gray-300 mb-6">
            {language === 'de' 
              ? 'Unser Team hilft Ihnen gerne weiter!' 
              : 'Our team is happy to help!'}
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {language === 'de' ? 'Kontakt aufnehmen' : 'Contact us'}
          </a>
        </div>

      </div>
    </div>
  );
}