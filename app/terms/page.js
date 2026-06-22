"use client";

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
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
              ← Back to Shop
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* --- English --- */}
        <h1 className="text-4xl font-light text-gray-900 mb-8">Terms &amp; Conditions</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 mb-16">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Scope and Conclusion of Contract</h2>
            <p className="text-gray-700 leading-relaxed mb-4">These General Terms and Conditions (GTC) apply to all contracts concluded between ZAK Fine Art (hereinafter &quot;Seller&quot;) and customers (hereinafter &quot;Buyer&quot;) for the purchase of original oil paintings through the online shop.</p>
            <p className="text-gray-700 leading-relaxed">The presentation of products in the online shop does not constitute a legally binding offer but an invitation to place an order. By clicking the &quot;Order with obligation to pay&quot; button, the Buyer submits a binding offer to purchase the products in the shopping cart. The Seller can accept this offer within 5 days by sending an order confirmation by email.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">2. Subject of the Contract</h2>
            <p className="text-gray-700 leading-relaxed">The subject of the contract is the sale of original oil paintings. All artworks are unique pieces unless expressly stated otherwise in the product description. Each painting is hand-signed by the artist and comes with a certificate of authenticity.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">3. Prices and Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">All prices stated are final prices including statutory VAT. Shipping costs are calculated separately and displayed before completing the order.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Accepted Payment Methods:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Credit card (Visa, Mastercard)</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
              <li>Klarna</li>
              <li>Bank transfer (prepayment)</li>
              <li>Stripe</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">Payment is due immediately upon conclusion of the contract. For bank transfer prepayment, the goods are reserved for 7 days. If payment is not received within this period, the order is automatically cancelled.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">4. Delivery and Shipping</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Delivery is made to the delivery address specified by the Buyer. Shipping is insured and tracked. Delivery times are stated in the product description:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Germany: 2-5 business days</li>
              <li>EU: 5-10 business days</li>
              <li>International: 10-20 business days</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">All artworks are carefully packaged and shipped insured. We use specialized art transport companies for larger works. The risk of loss or damage passes to the Buyer upon handover to the carrier.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">5. Right of Withdrawal (for Consumers)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Consumers have a right of withdrawal in accordance with the following provisions:</p>
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Right of Withdrawal</h3>
              <p className="text-gray-700 leading-relaxed mb-4">You have the right to withdraw from this contract within 14 days without giving reasons. The withdrawal period is 14 days from the day on which you or a third party named by you, who is not the carrier, has taken possession of the goods.</p>
              <p className="text-gray-700 leading-relaxed mb-2">To exercise your right of withdrawal, you must inform us:</p>
              <div className="mt-2 pl-4 text-gray-700">
                <p className="font-medium text-gray-900">ZAK Fine Art</p>
                <p>Großbeerenstr. 15</p>
                <p>10963 Berlin, Germany</p>
                <p>Email: info@manfredzak.com</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">of your decision to withdraw from this contract by means of a clear declaration (e.g., letter sent by post or email).</p>
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Consequences of Withdrawal</h3>
            <p className="text-gray-700 leading-relaxed mb-4">If you withdraw from this contract, we shall reimburse you all payments we have received from you, including delivery costs (except for additional costs resulting from your choice of a type of delivery other than the cheapest standard delivery offered by us), without delay and at the latest within 14 days from the day on which we received notification of your withdrawal.</p>
            <p className="text-gray-700 leading-relaxed mb-4">You must return or hand over the goods to us immediately and in any event no later than 14 days from the day on which you notify us of the withdrawal from this contract. The deadline is met if you send the goods before the 14-day period expires.</p>
            <p className="text-gray-700 leading-relaxed">Return shipping costs for withdrawal are borne by the Buyer unless the delivered goods correspond to the goods ordered and the price of the goods to be returned does not exceed EUR 40.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">6. Retention of Title</h2>
            <p className="text-gray-700 leading-relaxed">The goods remain the property of the Seller until full payment of the purchase price.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">7. Warranty and Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">The statutory warranty provisions apply. Each artwork is carefully inspected before shipping. Nevertheless, minor color deviations from the screen representation are possible due to individual monitor settings.</p>
            <p className="text-gray-700 leading-relaxed">All artworks are original, hand-painted oil paintings. Natural characteristics of the materials used (canvas texture, brush strokes, slight color variations) are not defects but proof of authenticity.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">8. Copyright and Image Rights</h2>
            <p className="text-gray-700 leading-relaxed">All images and descriptions of the artworks are protected by copyright and remain the property of the artist or Seller. Any reproduction, distribution, or public display requires written permission.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">9. Alternative Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">The European Commission provides a platform for online dispute resolution (ODR), which can be accessed at <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline">https://ec.europa.eu/consumers/odr/</a>. We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board, but are generally willing to do so.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">10. Final Provisions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">The law of the Federal Republic of Germany applies exclusively, excluding the UN Convention on Contracts for the International Sale of Goods. For consumers, this choice of law only applies insofar as the protection granted is not withdrawn by mandatory provisions of the law of the country in which the consumer has his habitual residence.</p>
            <p className="text-gray-700 leading-relaxed">Should individual provisions of these GTC be or become invalid, the validity of the remaining provisions remains unaffected. The invalid provision shall be replaced by a provision that comes closest to the economic purpose of the invalid provision.</p>
          </section>
          <p className="text-sm text-gray-600 mt-8 pt-4 border-t border-gray-200">Last updated: June 2026</p>
        </div>

        {/* --- Deutsch --- */}
        <div className="relative pt-16 mb-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 h-px w-1/2"></div>
        </div>
        <h1 className="text-4xl font-light text-gray-900 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Geltungsbereich und Vertragsschluss</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen ZAK Fine Art (nachfolgend "Verkäufer") und Kunden (nachfolgend "Käufer") über den Kauf von originalen Ölgemälden über den Online-Shop.</p>
            <p className="text-gray-700 leading-relaxed">Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Bestellung. Durch Anklicken des Buttons "Zahlungspflichtig bestellen" gibt der Käufer ein verbindliches Angebot zum Kauf der im Warenkorb befindlichen Produkte ab. Der Verkäufer kann dieses Angebot innerhalb von 5 Tagen durch Zusendung einer Auftragsbestätigung per E-Mail annehmen.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">2. Vertragsgegenstand</h2>
            <p className="text-gray-700 leading-relaxed">Vertragsgegenstand ist der Kauf von originalen Ölgemälden. Alle Kunstwerke sind Unikate, sofern in der Produktbeschreibung nicht ausdrücklich anders angegeben. Jedes Gemälde ist vom Künstler handsigniert und wird mit einem Echtheitszertifikat geliefert.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">3. Preise und Zahlungsbedingungen</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Alle angegebenen Preise sind Endpreise inklusive gesetzlicher Mehrwertsteuer. Versandkosten werden separat berechnet und vor Abschluss der Bestellung angezeigt.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Akzeptierte Zahlungsmethoden:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Kreditkarte (Visa, Mastercard)</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
              <li>Klarna</li>
              <li>Banküberweisung (Vorkasse)</li>
              <li>Stripe</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">Die Zahlung ist sofort nach Vertragsschluss fällig. Bei Vorkasse per Banküberweisung werden die Waren 7 Tage reserviert. Geht die Zahlung innerhalb dieser Frist nicht ein, wird die Bestellung automatisch storniert.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">4. Lieferung und Versand</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Die Lieferung erfolgt an die vom Käufer angegebene Lieferadresse. Der Versand erfolgt versichert und sendungsverfolgt. Die Lieferzeiten sind in der Produktbeschreibung angegeben:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Deutschland: 2-5 Werktage</li>
              <li>EU: 5-10 Werktage</li>
              <li>International: 10-20 Werktage</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">Alle Kunstwerke werden sorgfältig verpackt und versichert versandt. Für größere Werke beauftragen wir spezialisierte Kunsttransportunternehmen.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">5. Widerrufsrecht (für Verbraucher)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Verbrauchern steht ein Widerrufsrecht nach den folgenden Bestimmungen zu.</p>
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Widerrufsrecht</h3>
              <p className="text-gray-700 leading-relaxed mb-4">Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben.</p>
              <p className="text-gray-700 leading-relaxed mb-2">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:</p>
              <div className="mt-2 pl-4 text-gray-700">
                <p className="font-medium text-gray-900">ZAK Fine Art</p>
                <p>Großbeerenstr. 15</p>
                <p>10963 Berlin, Deutschland</p>
                <p>E-Mail: info@manfredzak.com</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Widerrufsfolgen</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Im Falle eines Widerrufs erstatten wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.</p>
            <p className="text-gray-700 leading-relaxed mb-4">Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.</p>
            <p className="text-gray-700 leading-relaxed">Die Rücksendekosten für den Widerruf trägt der Käufer, sofern die gelieferte Ware der bestellten entspricht und der Preis der zurückzusendenden Ware EUR 40 nicht übersteigt.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">6. Eigentumsvorbehalt</h2>
            <p className="text-gray-700 leading-relaxed">Die Ware bleibt bis zur vollständigen Bezahlung des Kaufpreises Eigentum des Verkäufers.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">7. Gewährleistung und Haftung</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Es gelten die gesetzlichen Gewährleistungsbestimmungen. Jedes Kunstwerk wird vor dem Versand sorgfältig geprüft.</p>
            <p className="text-gray-700 leading-relaxed">Alle Kunstwerke sind originale, handgemalte Ölgemälde. Natürliche Eigenschaften der verwendeten Materialien (Leinwandstruktur, Pinselspuren, leichte Farbabweichungen) stellen keine Mängel dar, sondern sind ein Beweis der Authentizität.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">8. Urheberrecht und Bildrechte</h2>
            <p className="text-gray-700 leading-relaxed">Alle Abbildungen und Beschreibungen der Kunstwerke sind urheberrechtlich geschützt und verbleiben im Eigentum des Künstlers bzw. Verkäufers. Jede Vervielfältigung, Verbreitung oder öffentliche Wiedergabe bedarf der schriftlichen Genehmigung.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">9. Alternative Streitbeilegung</h2>
            <p className="text-gray-700 leading-relaxed">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sind jedoch grundsätzlich dazu bereit.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">10. Schlussbestimmungen</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Für Verbraucher gilt diese Rechtswahl nur insoweit, als nicht der Schutz durch zwingende Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entzogen wird.</p>
            <p className="text-gray-700 leading-relaxed">Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt eine Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.</p>
          </section>
          <p className="text-sm text-gray-600 mt-8 pt-4 border-t border-gray-200">Stand: Juni 2026</p>
        </div>

      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2026 ZAK Fine Art. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
