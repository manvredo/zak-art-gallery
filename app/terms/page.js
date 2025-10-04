 
"use client";

import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK ART GALLERY
              </h1>
            </a>
            <a href="/" className="text-gray-700 hover:text-gray-900">
              ← Back to Shop
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Scope and Conclusion of Contract</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These General Terms and Conditions (GTC) apply to all contracts concluded between 
              ZAK Art Gallery (hereinafter "Seller") and customers (hereinafter "Buyer") for the 
              purchase of original oil paintings through the online shop.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The presentation of products in the online shop does not constitute a legally binding 
              offer but an invitation to place an order. By clicking the "Order with obligation to pay" 
              button, the Buyer submits a binding offer to purchase the products in the shopping cart. 
              The Seller can accept this offer within 5 days by sending an order confirmation by email.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">2. Subject of the Contract</h2>
            <p className="text-gray-700 leading-relaxed">
              The subject of the contract is the sale of original oil paintings. All artworks are 
              unique pieces unless expressly stated otherwise in the product description. Each painting 
              is hand-signed by the artist and comes with a certificate of authenticity.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">3. Prices and Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All prices stated are final prices including statutory VAT. Shipping costs are calculated 
              separately and displayed before completing the order.
            </p>
            
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Accepted Payment Methods:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Credit card (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Bank transfer (prepayment)</li>
              <li>SEPA Direct Debit</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              Payment is due immediately upon conclusion of the contract. For bank transfer prepayment, 
              the goods are reserved for 7 days. If payment is not received within this period, the 
              order is automatically cancelled.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">4. Delivery and Shipping</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Delivery is made to the delivery address specified by the Buyer. Shipping is insured 
              and tracked. Delivery times are stated in the product description:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Germany: 2-5 business days</li>
              <li>EU: 5-10 business days</li>
              <li>International: 10-20 business days</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              All artworks are carefully packaged and shipped insured. We use specialized art transport 
              companies for larger works. The risk of loss or damage passes to the Buyer upon handover 
              to the carrier.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">5. Right of Withdrawal (for Consumers)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Consumers have a right of withdrawal in accordance with the following provisions:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Right of Withdrawal</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to withdraw from this contract within 14 days without giving reasons. 
                The withdrawal period is 14 days from the day on which you or a third party named by you, 
                who is not the carrier, has taken possession of the goods.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                To exercise your right of withdrawal, you must inform us:
              </p>
              <div className="mt-2 pl-4 text-gray-700">
                <p className="font-medium text-gray-900">ZAK Art Gallery</p>
                <p>Großbeerenstr. 15</p>
                <p>10963 Berlin, Germany</p>
                <p>Email: info@thefroggers.io</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                of your decision to withdraw from this contract by means of a clear declaration 
                (e.g., letter sent by post or email).
              </p>
            </div>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Consequences of Withdrawal</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you withdraw from this contract, we shall reimburse you all payments we have received 
              from you, including delivery costs (except for additional costs resulting from your choice 
              of a type of delivery other than the cheapest standard delivery offered by us), without 
              delay and at the latest within 14 days from the day on which we received notification of 
              your withdrawal.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must return or hand over the goods to us immediately and in any event no later than 
              14 days from the day on which you notify us of the withdrawal from this contract. The 
              deadline is met if you send the goods before the 14-day period expires.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Return shipping costs for withdrawal are borne by the Buyer unless the delivered goods 
              correspond to the goods ordered and the price of the goods to be returned does not exceed 
              EUR 40.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">6. Retention of Title</h2>
            <p className="text-gray-700 leading-relaxed">
              The goods remain the property of the Seller until full payment of the purchase price.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">7. Warranty and Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The statutory warranty provisions apply. Each artwork is carefully inspected before 
              shipping. Nevertheless, minor color deviations from the screen representation are possible 
              due to individual monitor settings.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All artworks are original, hand-painted oil paintings. Natural characteristics of the 
              materials used (canvas texture, brush strokes, slight color variations) are not defects 
              but proof of authenticity.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">8. Copyright and Image Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              All images and descriptions of the artworks are protected by copyright and remain the 
              property of the artist or Seller. Any reproduction, distribution, or public display 
              requires written permission.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">9. Alternative Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              The European Commission provides a platform for online dispute resolution (ODR), which 
              can be accessed at{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-900 underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . We are not obliged to participate in dispute resolution proceedings before a consumer 
              arbitration board, but are generally willing to do so.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">10. Final Provisions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The law of the Federal Republic of Germany applies exclusively, excluding the UN 
              Convention on Contracts for the International Sale of Goods. For consumers, this choice 
              of law only applies insofar as the protection granted is not withdrawn by mandatory 
              provisions of the law of the country in which the consumer has his habitual residence.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Should individual provisions of these GTC be or become invalid, the validity of the 
              remaining provisions remains unaffected. The invalid provision shall be replaced by a 
              provision that comes closest to the economic purpose of the invalid provision.
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-8 pt-4 border-t border-gray-200">
            Last updated: October 2024
          </p>
        </div>
      </main>

      {/* Footer */}
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