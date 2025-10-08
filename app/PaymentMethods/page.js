"use client";

import React from 'react';
import Link from 'next/link';

export default function PaymentPage() {
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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Payment Methods</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Secure Payment Options</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                At ZAK Art Gallery, we offer a variety of secure payment methods to make your 
                purchase convenient and safe. All transactions are encrypted and processed through 
                trusted payment providers.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-medium text-green-900">🔒 100% Secure Payments</p>
                <p className="text-green-800 text-sm mt-2">
                  All payment information is encrypted using SSL technology. We never store your 
                  credit card details on our servers.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Available Payment Methods</h2>
            
            <div className="space-y-6">
              {/* Credit Cards */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-light text-gray-900 mb-3">Credit & Debit Cards</h3>
                <p className="text-gray-700 mb-4">
                  We accept all major credit and debit cards including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Visa</li>
                  <li>Mastercard</li>
                  <li>American Express</li>
                  <li>Maestro</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Payment is processed immediately and your order will be confirmed once the 
                  transaction is approved.
                </p>
              </div>

              {/* PayPal */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-light text-gray-900 mb-3">PayPal</h3>
                <p className="text-gray-700 mb-4">
                  Pay securely using your PayPal account or PayPal Guest Checkout (credit/debit card 
                  without a PayPal account).
                </p>
                <p className="text-sm text-gray-600">
                  Benefits: Buyer protection, fast checkout, no need to enter card details.
                </p>
              </div>

              {/* Bank Transfer */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-light text-gray-900 mb-3">Bank Transfer (SEPA)</h3>
                <p className="text-gray-700 mb-4">
                  Pay via direct bank transfer within the European SEPA zone.
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Please note: Your order will be processed once payment has been received in our 
                  account (typically 1-3 business days).
                </p>
                <p className="text-sm text-gray-600">
                  Bank details will be provided in your order confirmation email.
                </p>
              </div>

              {/* Klarna */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-light text-gray-900 mb-3">Klarna</h3>
                <p className="text-gray-700 mb-4">
                  Buy now, pay later with Klarna. Choose from flexible payment options:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Pay in 30 days</li>
                  <li>Pay in 3 installments</li>
                  <li>Financing options available</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Available for customers in Germany, Austria, Netherlands, and other selected countries. 
                  Subject to credit approval.
                </p>
              </div>

              {/* Sofort */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-light text-gray-900 mb-3">Sofort / Klarna Sofort</h3>
                <p className="text-gray-700 mb-4">
                  Instant bank transfer payment method popular in Germany and Austria.
                </p>
                <p className="text-sm text-gray-600">
                  Your order is processed immediately after payment confirmation.
                </p>
              </div>

              {/* Apple Pay / Google Pay */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-light text-gray-900 mb-3">Apple Pay & Google Pay</h3>
                <p className="text-gray-700 mb-4">
                  Fast and secure checkout using your mobile device.
                </p>
                <p className="text-sm text-gray-600">
                  Available on compatible devices. Your card details are never shared with us.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Payment Security</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Your payment security is our top priority. We use industry-standard security measures 
                to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for all transactions</li>
                <li>PCI DSS compliant payment processing</li>
                <li>3D Secure authentication for credit card payments</li>
                <li>Fraud detection and prevention systems</li>
                <li>No storage of credit card data on our servers</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                All payment processing is handled by certified payment service providers (Stripe, PayPal) 
                who meet the highest security standards.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Currency</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                All prices are displayed in Euros (€). If you pay with a card in a different currency, 
                your bank will convert the amount at their current exchange rate.
              </p>
              <p className="text-sm text-gray-600">
                Please note: Your bank may charge a currency conversion fee for international transactions.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Value Added Tax (VAT)</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                All prices include German VAT (19%) where applicable. For customers outside the 
                European Union, VAT may be removed at checkout depending on your location.
              </p>
              <p>
                Business customers within the EU with a valid VAT ID may be exempt from VAT under 
                the reverse charge mechanism. Please contact us before placing your order.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Payment Confirmation</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Once your payment is processed successfully, you will receive:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Immediate on-screen confirmation</li>
                <li>Order confirmation email with order number</li>
                <li>Invoice (sent separately within 24 hours)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Please check your spam folder if you don't receive the confirmation email within a few minutes.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Failed Payments</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                If your payment fails, please check the following:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ensure your card details are entered correctly</li>
                <li>Check that your card has sufficient funds or credit available</li>
                <li>Verify that your card is authorized for online international transactions</li>
                <li>Contact your bank if the problem persists</li>
              </ul>
              <p className="mt-4">
                If you continue to experience issues, please try an alternative payment method or 
                contact us at info@zakartgallery.com for assistance.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Installment Plans for High-Value Purchases</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                For artworks over €2,000, we offer customized payment plans. Please contact us to 
                discuss flexible payment options tailored to your needs.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium text-gray-900 mb-2">Contact our Sales Team:</p>
                <p>Email: sales@zakartgallery.com</p>
                <p>Phone: +49 (0) 123 456789</p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Questions About Payment?</h2>
            <div className="text-gray-700">
              <p className="mb-4">
                If you have any questions about payment methods or encounter any issues during checkout:
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