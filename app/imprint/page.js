"use client";

import React from 'react';
import Link from 'next/link';

export default function ImprintPage() {
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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Imprint</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Information obligation according to § 5 TMG
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium text-gray-900">Company Name</p>
                <p>ZAK Art Gallery</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p>Großbeerenstr. 15</p>
                <p>10963 Berlin</p>
                <p>Germany</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Contact</p>
                <p>Email: info@thefroggers.io</p>
                <p>Phone: +49 (0) 123 456789</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Represented by</p>
                <p>Manfred Zak</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">VAT ID</p>
                <p>DE243487042</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Business ID</p>
                <p>14/603/00081</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Supervisory Authority</p>
                <p>Tax Office Berlin Kreuzberg Friedrichshain</p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Responsible for content according to § 55 Abs. 2 RStV
            </h2>
            <div className="text-gray-700">
              <p>Manfred Zak</p>
              <p>Großbeerenstr. 15</p>
              <p>10963 Berlin</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Dispute Resolution
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                The European Commission provides a platform for online dispute resolution (ODR): 
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
                We are not willing or obliged to participate in dispute resolution proceedings 
                before a consumer arbitration board.
              </p>
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