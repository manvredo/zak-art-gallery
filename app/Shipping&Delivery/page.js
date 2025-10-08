"use client";

import React from 'react';
import Link from 'next/link';

export default function ShippingPage() {
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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Shipping & Delivery</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Shipping Costs</h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900 mb-2">Germany</p>
                <p>Standard shipping: €15.00</p>
                <p className="text-sm text-gray-600 mt-1">Free shipping for orders over €500</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900 mb-2">European Union</p>
                <p>Standard shipping: €25.00</p>
                <p className="text-sm text-gray-600 mt-1">Free shipping for orders over €1,000</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900 mb-2">International (Worldwide)</p>
                <p>Standard shipping: €45.00</p>
                <p className="text-sm text-gray-600 mt-1">Free shipping for orders over €2,000</p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Delivery Time</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium text-gray-900">Germany</p>
                <p>2-4 business days after dispatch</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-900">European Union</p>
                <p>5-7 business days after dispatch</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-900">International</p>
                <p>7-14 business days after dispatch</p>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Please note: Delivery times may vary depending on customs clearance for international shipments.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Packaging & Handling</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                All artworks are carefully packaged to ensure safe delivery. We use professional art packaging materials including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Protective corner guards</li>
                <li>Bubble wrap and foam padding</li>
                <li>Sturdy cardboard boxes or wooden crates for larger pieces</li>
                <li>Waterproof outer packaging</li>
              </ul>
              <p>
                Each shipment is fully insured for the purchase value of the artwork.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Tracking & Delivery</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Once your order has been dispatched, you will receive a confirmation email with a tracking number. 
                You can use this to track your shipment online.
              </p>
              <p>
                We ship with trusted carriers including DHL, UPS, and FedEx, depending on your location.
              </p>
              <p className="font-medium text-gray-900">
                Signature Required
              </p>
              <p>
                For security reasons, all deliveries require a signature upon receipt. If you are not available, 
                the carrier will leave a notice with instructions for collection or redelivery.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Customs & Import Duties</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                For shipments outside the European Union, customs duties and import taxes may apply. 
                These charges are the responsibility of the buyer and are not included in our shipping costs.
              </p>
              <p>
                We declare all shipments with their actual value for customs purposes. We cannot mark items 
                as gifts or undervalue items on customs forms.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Damaged or Lost Shipments</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                If your artwork arrives damaged, please contact us immediately at info@zakartgallery.com 
                with photos of the damage and the packaging. Do not dispose of the packaging materials.
              </p>
              <p>
                All shipments are fully insured. We will work with you to resolve any issues quickly, 
                either through repair, replacement, or full refund.
              </p>
              <p>
                If your shipment is lost in transit, please contact us. We will file a claim with the 
                carrier and arrange for a replacement or refund.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Contact Us</h2>
            <div className="text-gray-700">
              <p className="mb-4">
                If you have any questions about shipping or delivery, please don't hesitate to contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p>Email: info@zakartgallery.com</p>
                <p>Phone: +49 (0) 123 456789</p>
                <p>Monday - Friday: 10:00 - 18:00</p>
              </div>
            </div>
          </section>

          <p className="text-sm text-gray-600 mt-8 pt-4 border-t border-gray-200">
            Last updated: October 2024
          </p>
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