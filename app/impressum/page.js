"use client";

import React from 'react';
import Link from 'next/link';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK FINE ART
              </h1>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              ← Zurück zum Shop
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light text-gray-900 mb-8">Impressum</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Angaben gemäß § 5 TMG
            </h2>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium text-gray-900">Firmenname</p>
                <p>ZAK Fine Art</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Adresse</p>
                <p>Rudolf-Breitscheid-Str. 24</p>
                <p>17326 Brüssow</p>
                <p>Deutschland</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Kontakt</p>
                <p>E-Mail: info@manfredzak.com</p>
                <p>Telefon: +49 179 4824 300</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Vertreten durch</p>
                <p>Manfred Zak</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Umsatzsteuer-ID</p>
                <p>DE243487042</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Wirtschafts-ID</p>
                <p>14/603/00081</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Zuständige Aufsichtsbehörde</p>
                <p>Finanzamt Berlin Kreuzberg Friedrichshain</p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="text-gray-700">
              <p>Manfred Zak</p>
              <p>Rudolf-Breitscheid-Str. 24</p>
              <p>17326 Brüssow</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Streitbeilegung
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2026 ZAK Fine Art. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
