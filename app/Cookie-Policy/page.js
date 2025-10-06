"use client";

import React from 'react';
import Link from 'next/link';

export default function CookiesPage() {
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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Was sind Cookies?</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine 
                Website besuchen. Sie ermöglichen es der Website, Ihre Aktionen und Präferenzen 
                (wie Login, Sprache, Schriftgröße und andere Anzeigeeinstellungen) über einen 
                bestimmten Zeitraum zu speichern.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Welche Cookies verwenden wir?</h2>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">1. Notwendige Cookies</h3>
                <p className="mb-2">
                  Diese Cookies sind für das Funktionieren der Website unbedingt erforderlich und 
                  können in unseren Systemen nicht deaktiviert werden.
                </p>
                
                <div className="bg-gray-50 p-4 rounded mt-4">
                  <p className="font-medium mb-2">Warenkorb-Funktionalität</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Speichert Ihre Warenkorbauswahl während des Besuchs</li>
                    <li>Wird automatisch gelöscht, wenn Sie die Website verlassen</li>
                    <li>Keine personenbezogenen Daten werden gespeichert</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">2. Zahlungsabwicklung (Stripe)</h3>
                <p className="mb-2">
                  Bei der Nutzung unserer Checkout-Funktion werden Sie zu Stripe weitergeleitet. 
                  Stripe verwendet eigene Cookies zur sicheren Zahlungsabwicklung.
                </p>
                
                <div className="bg-gray-50 p-4 rounded mt-4">
                  <p className="font-medium mb-2">Stripe Cookies</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Betrugsschutz und Sicherheit</li>
                    <li>Zahlungsabwicklung</li>
                    <li>Siehe Stripe Privacy Policy für Details</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    <a 
                      href="https://stripe.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-900 underline"
                    >
                      Stripe Datenschutzerklärung
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">3. Spracheinstellungen</h3>
                <p className="mb-2">
                  Wir speichern Ihre Sprachpräferenz (Deutsch/Englisch), damit Sie beim nächsten 
                  Besuch Ihre bevorzugte Sprache automatisch sehen.
                </p>
                
                <div className="bg-gray-50 p-4 rounded mt-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Speichert nur die Sprachwahl (DE/EN)</li>
                    <li>Keine personenbezogenen Daten</li>
                    <li>Kann jederzeit zurückgesetzt werden</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Cookies von Drittanbietern</h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Vercel (Hosting)</h3>
                <p>
                  Unsere Website wird auf Vercel gehostet. Vercel kann technische Cookies zur 
                  Performance-Optimierung und Sicherheit setzen.
                </p>
                <p className="mt-2 text-sm">
                  <a 
                    href="https://vercel.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 underline"
                  >
                    Vercel Privacy Policy
                  </a>
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Supabase (Datenbank)</h3>
                <p>
                  Wir nutzen Supabase zur Speicherung von Bestelldaten. Supabase verarbeitet 
                  Daten gemäß DSGVO.
                </p>
                <p className="mt-2 text-sm">
                  <a 
                    href="https://supabase.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 underline"
                  >
                    Supabase Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Welche Cookies verwenden wir NICHT?</h2>
            
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc list-inside space-y-2">
                <li>Keine Tracking-Cookies (Google Analytics, Facebook Pixel, etc.)</li>
                <li>Keine Werbe-Cookies</li>
                <li>Keine Social Media Cookies</li>
                <li>Keine verhaltensbasierten Analyse-Tools</li>
              </ul>
              
              <p className="mt-4 font-medium">
                Wir respektieren Ihre Privatsphäre und verwenden nur die absolut notwendigen Cookies 
                für den Betrieb des Shops.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Wie können Sie Cookies kontrollieren?</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Sie können Cookies in Ihren Browser-Einstellungen verwalten und löschen:
              </p>
              
              <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
                <p><strong>Chrome:</strong> Einstellungen → Datenschutz und Sicherheit → Cookies</p>
                <p><strong>Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies</p>
                <p><strong>Safari:</strong> Einstellungen → Datenschutz → Cookies</p>
                <p><strong>Edge:</strong> Einstellungen → Cookies und Websiteberechtigungen</p>
              </div>
              
              <p className="mt-4">
                <strong>Hinweis:</strong> Wenn Sie alle Cookies deaktivieren, funktionieren bestimmte 
                Funktionen der Website möglicherweise nicht mehr ordnungsgemäß (z.B. Warenkorb, 
                Sprachauswahl).
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Änderungen dieser Cookie-Richtlinie</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in 
                unseren Praktiken oder aus anderen betrieblichen, rechtlichen oder regulatorischen 
                Gründen zu berücksichtigen.
              </p>
              
              <p>
                Letzte Aktualisierung: Oktober 2024
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Kontakt</h2>
            
            <div className="text-gray-700">
              <p className="mb-4">
                Bei Fragen zu unserer Cookie-Verwendung kontaktieren Sie uns:
              </p>
              
              <div className="bg-gray-50 p-4 rounded">
                <p>ZAK Art Gallery</p>
                <p>Manfred Zak</p>
                <p>Großbeerenstr. 15</p>
                <p>10963 Berlin</p>
                <p className="mt-2">E-Mail: info@manfredzak.com</p>
                <p>Telefon: +49 (0) 123 456789</p>
              </div>
            </div>
          </section>
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