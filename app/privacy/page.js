"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Data Protection at a Glance</h2>
            
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">General Information</h3>
            <p className="text-gray-700 leading-relaxed">
              The following information provides a simple overview of what happens to your personal 
              data when you visit our website. Personal data is any data that can be used to identify 
              you personally.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Who is responsible for data collection on this website?</h3>
            <p className="text-gray-700 leading-relaxed">
              Data processing on this website is carried out by the website operator. Contact details 
              can be found in the imprint.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">How do we collect your data?</h3>
            <p className="text-gray-700 leading-relaxed">
              Your data is collected when you provide it to us. This could be data you enter in a 
              contact form or when placing an order, for example. Other data is collected automatically 
              by our IT systems when you visit the website. This is primarily technical data (e.g., 
              internet browser, operating system, or time of page access).
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">What do we use your data for?</h3>
            <p className="text-gray-700 leading-relaxed">
              Part of the data is collected to ensure error-free provision of the website. Other data 
              may be used to analyze your user behavior and to process your orders.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">What rights do you have regarding your data?</h3>
            <p className="text-gray-700 leading-relaxed">
              You have the right to receive information about the origin, recipient, and purpose of 
              your stored personal data free of charge at any time. You also have the right to request 
              the correction or deletion of this data. You also have the right to request the 
              restriction of the processing of your personal data under certain circumstances.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">2. General Information and Mandatory Information</h2>
            
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Data Protection</h3>
            <p className="text-gray-700 leading-relaxed">
              The operators of these pages take the protection of your personal data very seriously. 
              We treat your personal data confidentially and in accordance with statutory data 
              protection regulations and this privacy policy.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Responsible Party</h3>
            <div className="bg-gray-50 p-4 rounded text-gray-700">
              <p className="mb-2 font-medium text-gray-900">ZAK Art Gallery</p>
              <p>Rudolf-Breitscheid-Str. 24</p>
              <p>17326 Brüssow, Germany</p>
              <p>Email: info@manfredzak.com</p>
              <p>VAT ID: DE243487042</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">3. Data Collection on This Website</h2>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Server Log Files</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The website provider automatically collects and stores information in so-called server 
              log files, which your browser automatically transmits to us. These are:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Browser type and version</li>
              <li>Operating system used</li>
              <li>Referrer URL</li>
              <li>Hostname of the accessing computer</li>
              <li>Time of server request</li>
              <li>IP address</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              This data is not merged with other data sources. Data processing is based on 
              Art. 6 Para. 1 lit. f GDPR.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Contact Form and Order Processing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you send us inquiries via the contact form or place an order, your details from 
              the inquiry form or order form, including the contact data you provided there, will be 
              stored by us for the purpose of processing the inquiry or order and in case of 
              follow-up questions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">When you place an order, we collect:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name and delivery address</li>
              <li>Email address and phone number</li>
              <li>Payment information</li>
              <li>Ordered products and quantities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              This data is necessary for contract fulfillment and is processed based on 
              Art. 6 Para. 1 lit. b GDPR.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Payment Service Providers</h3>
            <p className="text-gray-700 leading-relaxed">
              We use external payment service providers (e.g., Stripe, PayPal) through whose platforms 
              users and we can make payment transactions. We do not store credit card data ourselves. 
              The payment data is processed directly by the payment service provider.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">4. Your Rights</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">You have the following rights:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Right to information</strong> (Art. 15 GDPR)</li>
              <li><strong>Right to correction</strong> (Art. 16 GDPR)</li>
              <li><strong>Right to deletion</strong> (Art. 17 GDPR)</li>
              <li><strong>Right to restriction of processing</strong> (Art. 18 GDPR)</li>
              <li><strong>Right to data portability</strong> (Art. 20 GDPR)</li>
              <li><strong>Right to object</strong> (Art. 21 GDPR)</li>
              <li><strong>Right to complain to a supervisory authority</strong> (Art. 77 GDPR)</li>
            </ul>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Supervisory Authority</h3>
            <div className="bg-gray-50 p-4 rounded text-gray-700">
              <p className="font-medium text-gray-900">Berlin Commissioner for Data Protection and Freedom of Information</p>
              <p>Friedrichstr. 219</p>
              <p>10969 Berlin</p>
              <p>Phone: +49 30 13889-0</p>
              <p>Email: mailbox@datenschutz-berlin.de</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">5. Storage Duration</h2>
            <p className="text-gray-700 leading-relaxed">
              Unless a specific storage period is specified in this privacy policy, your personal 
              data will remain with us until the purpose for data processing no longer applies. If you 
              assert a legitimate request for deletion or revoke consent to data processing, your data 
              will be deleted unless we have other legally permissible reasons for storing your 
              personal data.
            </p>
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