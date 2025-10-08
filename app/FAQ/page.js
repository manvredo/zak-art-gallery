"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Orders & Purchasing",
      questions: [
        {
          q: "How do I place an order?",
          a: "Browse our gallery, click on an artwork you like, and click 'Add to Cart'. Once you've finished shopping, go to your cart and click 'Proceed to Checkout'. Follow the steps to enter your shipping information and payment details to complete your order."
        },
        {
          q: "Can I purchase art as a gift?",
          a: "Yes! During checkout, you can specify a different shipping address. You can also add a gift message in the order notes section. We'll include a gift receipt without pricing information."
        },
        {
          q: "Are the artworks original or prints?",
          a: "All artworks in our gallery are original, hand-painted oil paintings. Each piece is unique and comes with a certificate of authenticity signed by the artist."
        },
        {
          q: "Can I reserve an artwork before purchasing?",
          a: "Yes, we can hold an artwork for you for up to 48 hours. Please contact us at info@zakartgallery.com with the artwork details and we'll reserve it for you."
        },
        {
          q: "Do you offer custom commissions?",
          a: "Yes! We work with artists who accept commissions. Please contact us with details about the size, style, and subject matter you're interested in, and we'll connect you with an appropriate artist."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Shipping times vary by location: Germany (2-4 business days), EU (5-7 business days), International (7-14 business days). All times are after dispatch."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship worldwide! Shipping costs and delivery times vary by destination. International customers may be responsible for customs duties and import taxes."
        },
        {
          q: "How are artworks packaged?",
          a: "We use professional art packaging including protective corner guards, bubble wrap, foam padding, and sturdy boxes or wooden crates for larger pieces. All shipments are fully insured."
        },
        {
          q: "Can I track my order?",
          a: "Yes! Once your order ships, you'll receive a tracking number via email. You can use this to monitor your shipment's progress online."
        },
        {
          q: "What if my artwork arrives damaged?",
          a: "Please contact us immediately at info@zakartgallery.com with photos of the damage and packaging. All shipments are fully insured, and we'll arrange for repair, replacement, or full refund."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 14-day return policy. If you're not completely satisfied, you can return the artwork within 14 days of receipt for a full refund. The artwork must be in original condition with all packaging."
        },
        {
          q: "How do I return an item?",
          a: "Contact us at info@zakartgallery.com to request a return authorization number (RMA). We'll provide return instructions. Repack the artwork carefully in its original packaging and ship it to the provided address."
        },
        {
          q: "Who pays for return shipping?",
          a: "Return shipping costs are the customer's responsibility unless the item was damaged, defective, or sent in error."
        },
        {
          q: "How long does it take to receive a refund?",
          a: "Once we receive and inspect your return (2-3 business days), we'll process your refund within 5-7 business days. It may take an additional 3-5 days for the refund to appear in your account."
        },
        {
          q: "Can I exchange an artwork?",
          a: "We don't offer direct exchanges. Please return the original item for a refund and place a new order for the artwork you'd like."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept credit/debit cards (Visa, Mastercard, Amex, Maestro), PayPal, bank transfer (SEPA), Klarna, Sofort, Apple Pay, and Google Pay. All transactions are secure and encrypted."
        },
        {
          q: "Are prices negotiable?",
          a: "Prices are generally fixed, but we may consider offers on select high-value pieces. Contact us at info@zakartgallery.com to discuss."
        },
        {
          q: "Do you offer payment plans?",
          a: "Yes! For artworks over €2,000, we offer customized payment plans. We also accept Klarna for buy now, pay later options. Contact us for details."
        },
        {
          q: "Are prices inclusive of VAT?",
          a: "Yes, all prices include 19% German VAT where applicable. Non-EU customers may be exempt from VAT at checkout."
        },
        {
          q: "What currency are prices in?",
          a: "All prices are in Euros (€). If you pay with a card in a different currency, your bank will convert the amount at their exchange rate."
        }
      ]
    },
    {
      category: "Art Care & Authenticity",
      questions: [
        {
          q: "How do I care for my oil painting?",
          a: "Keep your painting away from direct sunlight, humidity, and extreme temperatures. Dust gently with a soft, dry cloth. Never use water or cleaning products. For professional cleaning, consult an art conservator."
        },
        {
          q: "Do artworks come with a certificate of authenticity?",
          a: "Yes! Every artwork includes a certificate of authenticity signed by the artist, including details about the piece, provenance, and artist information."
        },
        {
          q: "Are the paintings framed?",
          a: "Most paintings are sold unframed unless specified in the product description. We can recommend professional framers in your area or discuss custom framing options."
        },
        {
          q: "Can I see the artwork in person before buying?",
          a: "Unfortunately, we operate exclusively online. However, we provide detailed photos and descriptions. If you're in the Berlin area, we may be able to arrange a private viewing for high-value pieces."
        },
        {
          q: "How do I hang my artwork?",
          a: "Most paintings come with hanging hardware attached. Use appropriate wall anchors based on the weight of the piece. For large or heavy artworks, we recommend professional installation."
        }
      ]
    },
    {
      category: "About Artists & Gallery",
      questions: [
        {
          q: "Who are the artists you work with?",
          a: "We collaborate with both emerging and established contemporary artists specializing in oil paintings. Each artist is carefully selected for their unique style and quality of work."
        },
        {
          q: "Can I meet the artist?",
          a: "For select artworks, we may be able to arrange an introduction to the artist. Please contact us to inquire about specific pieces."
        },
        {
          q: "Do you buy or consign artwork?",
          a: "We're always interested in working with talented artists. If you're an artist interested in selling through our gallery, please send your portfolio to artists@zakartgallery.com."
        },
        {
          q: "Where is the gallery located?",
          a: "We are based in Berlin, Germany, but operate primarily online to reach art lovers worldwide."
        },
        {
          q: "Do you have a physical gallery space?",
          a: "We operate as an online gallery, which allows us to offer competitive prices and reach a global audience. For Berlin-based customers, private viewings may be arranged by appointment."
        }
      ]
    },
    {
      category: "Technical & Account",
      questions: [
        {
          q: "Do I need an account to make a purchase?",
          a: "No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and enjoy faster checkout in the future."
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Login' at the top of the page, then click 'Forgot Password'. Enter your email address and we'll send you a password reset link."
        },
        {
          q: "Is my personal information secure?",
          a: "Yes! We use SSL encryption and industry-standard security measures. We never store credit card information. For details, see our Privacy Policy."
        },
        {
          q: "Can I change or cancel my order?",
          a: "You can cancel your order before it ships by contacting us immediately. Once shipped, our standard return policy applies."
        },
        {
          q: "I didn't receive my order confirmation email.",
          a: "Check your spam folder first. If you still can't find it, contact us at info@zakartgallery.com with your order details and we'll resend it."
        }
      ]
    }
  ];

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
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              ← Back to Shop
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-12">
          Find answers to common questions about ordering, shipping, returns, and more.
        </p>
        
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={questionIndex} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full py-4 flex justify-between items-start text-left hover:text-gray-600 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-8">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="flex-shrink-0 mt-1" size={20} />
                        ) : (
                          <ChevronDown className="flex-shrink-0 mt-1" size={20} />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="pb-4 pr-8 text-gray-700 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <div className="bg-gray-50 p-6 rounded inline-block">
            <p className="text-gray-700 mb-2">📧 Email: info@zakartgallery.com</p>
            <p className="text-gray-700 mb-2">📞 Phone: +49 (0) 123 456789</p>
            <p className="text-gray-600 text-sm">Monday - Friday: 10:00 - 18:00</p>
          </div>
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