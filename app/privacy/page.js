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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 mb-16">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Data Protection at a Glance</h2>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">General Information</h3>
            <p className="text-gray-700 leading-relaxed">The following information provides a simple overview of what happens to your personal data when you visit our website. Personal data is any data that can be used to identify you personally.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Who is responsible for data collection on this website?</h3>
            <p className="text-gray-700 leading-relaxed">Data processing on this website is carried out by the website operator. Contact details can be found in the imprint.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">How do we collect your data?</h3>
            <p className="text-gray-700 leading-relaxed">Your data is collected when you provide it to us. This could be data you enter in a contact form or when placing an order, for example. Other data is collected automatically by our IT systems when you visit the website. This is primarily technical data (e.g., internet browser, operating system, or time of page access).</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">What do we use your data for?</h3>
            <p className="text-gray-700 leading-relaxed">Part of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior and to process your orders.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">What rights do you have regarding your data?</h3>
            <p className="text-gray-700 leading-relaxed">You have the right to receive information about the origin, recipient, and purpose of your stored personal data free of charge at any time. You also have the right to request the correction or deletion of this data. You also have the right to request the restriction of the processing of your personal data under certain circumstances.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">2. General Information and Mandatory Information</h2>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Data Protection</h3>
            <p className="text-gray-700 leading-relaxed">The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Responsible Party</h3>
            <div className="bg-gray-50 p-4 rounded text-gray-700">
              <p className="mb-2 font-medium text-gray-900">ZAK Fine Art</p>
              <p>Rudolf-Breitscheid-Str. 24</p>
              <p>17326 Brüssow, Germany</p>
              <p>Email: info@manfredzak.com</p>
              <p>VAT ID: DE243487042</p>
            </div>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">3. Data Collection on This Website</h2>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Server Log Files</h3>
            <p className="text-gray-700 leading-relaxed mb-4">The website provider automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Browser type and version</li>
              <li>Operating system used</li>
              <li>Referrer URL</li>
              <li>Hostname of the accessing computer</li>
              <li>Time of server request</li>
              <li>IP address</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">This data is not merged with other data sources. Data processing is based on Art. 6 Para. 1 lit. f GDPR.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Contact Form and Order Processing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">If you send us inquiries via the contact form or place an order, your details from the inquiry form or order form, including the contact data you provided there, will be stored by us for the purpose of processing the inquiry or order and in case of follow-up questions.</p>
            <p className="text-gray-700 leading-relaxed mb-2">When you place an order, we collect:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name and delivery address</li>
              <li>Email address and phone number</li>
              <li>Payment information</li>
              <li>Ordered products and quantities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">This data is necessary for contract fulfillment and is processed based on Art. 6 Para. 1 lit. b GDPR.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Newsletter</h3>
            <p className="text-gray-700 leading-relaxed mb-4">If you subscribe to our newsletter, we use the double opt-in procedure: after signing up with your email address, you will receive a confirmation email with a link. Only after you click this link is your subscription activated and your email address added to our newsletter list. This procedure protects you from someone subscribing your email address without your knowledge.</p>
            <p className="text-gray-700 leading-relaxed mb-4">We send the newsletter approximately 1–2 times a month. Your email address is stored for the purpose of sending the newsletter until you unsubscribe, which you can do at any time via the unsubscribe link in every newsletter or by contacting us. Processing is based on your consent (Art. 6 Para. 1 lit. a GDPR), which you may revoke at any time with effect for the future.</p>
            <p className="text-gray-700 leading-relaxed">We use the email service provider Resend (Resend Inc.) to manage the newsletter list and send emails. Your data may therefore also be processed on servers operated by Resend.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Payment Service Providers</h3>
            <p className="text-gray-700 leading-relaxed">We use external payment service providers (e.g., Stripe, PayPal) through whose platforms users and we can make payment transactions. We do not store credit card data ourselves. The payment data is processed directly by the payment service provider.</p>
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
            <p className="text-gray-700 leading-relaxed">Unless a specific storage period is specified in this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data.</p>
          </section>
          <p className="text-sm text-gray-600 mt-8 pt-4 border-t border-gray-200">Last updated: June 2026</p>
        </div>

        {/* --- Deutsch --- */}
        <div className="relative pt-16 mb-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 h-px w-1/2"></div>
        </div>
        <h1 className="text-4xl font-light text-gray-900 mb-8">Datenschutzerklärung</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Allgemeine Hinweise</h3>
            <p className="text-gray-700 leading-relaxed">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
            <p className="text-gray-700 leading-relaxed">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten finden Sie im Impressum.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Wie erfassen wir Ihre Daten?</h3>
            <p className="text-gray-700 leading-relaxed">Ihre Daten werden dadurch erhoben, dass Sie sie uns mitteilen. Dies können z. B. Daten sein, die Sie in ein Kontaktformular eingeben oder bei einer Bestellung angeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Wofür nutzen wir Ihre Daten?</h3>
            <p className="text-gray-700 leading-relaxed">Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens und zur Bearbeitung Ihrer Bestellungen verwendet werden.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p className="text-gray-700 leading-relaxed">Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Unter bestimmten Umständen können Sie die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Datenschutz</h3>
            <p className="text-gray-700 leading-relaxed">Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Verantwortliche Stelle</h3>
            <div className="bg-gray-50 p-4 rounded text-gray-700">
              <p className="mb-2 font-medium text-gray-900">ZAK Fine Art</p>
              <p>Rudolf-Breitscheid-Str. 24</p>
              <p>17326 Brüssow, Deutschland</p>
              <p>E-Mail: info@manfredzak.com</p>
              <p>USt-IdNr.: DE243487042</p>
            </div>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Server-Log-Dateien</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Der Websitebetreiber erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Kontaktformular und Auftragsabwicklung</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen oder eine Bestellung aufgeben, werden Ihre Angaben aus dem Anfrage- bzw. Bestellformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
            <p className="text-gray-700 leading-relaxed mb-2">Bei einer Bestellung erheben wir:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name und Lieferadresse</li>
              <li>E-Mail-Adresse und Telefonnummer</li>
              <li>Zahlungsinformationen</li>
              <li>Bestellte Produkte und Mengen</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">Diese Daten sind für die Vertragserfüllung erforderlich und werden auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO verarbeitet.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Newsletter</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Wenn Sie unseren Newsletter abonnieren, verwenden wir das Double-Opt-in-Verfahren: Nach der Anmeldung mit Ihrer E-Mail-Adresse erhalten Sie eine Bestätigungs-E-Mail mit einem Link. Erst nachdem Sie diesen Link angeklickt haben, wird Ihre Anmeldung aktiviert und Ihre E-Mail-Adresse in unsere Newsletter-Liste aufgenommen. Dieses Verfahren schützt Sie davor, dass jemand Ihre E-Mail-Adresse ohne Ihr Wissen anmeldet.</p>
            <p className="text-gray-700 leading-relaxed mb-4">Der Newsletter wird ca. 1–2 mal im Monat versendet. Ihre E-Mail-Adresse wird zum Zweck des Newsletter-Versands gespeichert, bis Sie sich abmelden; dies ist jederzeit über den Abmeldelink in jedem Newsletter oder durch Kontaktaufnahme mit uns möglich. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit mit Wirkung für die Zukunft widerrufen können.</p>
            <p className="text-gray-700 leading-relaxed">Zur Verwaltung der Newsletter-Liste und zum Versand der E-Mails nutzen wir den E-Mail-Dienstleister Resend (Resend Inc.). Ihre Daten können daher auch auf Servern von Resend verarbeitet werden.</p>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Zahlungsdienstleister</h3>
            <p className="text-gray-700 leading-relaxed">Wir nutzen externe Zahlungsdienstleister (z. B. Stripe, PayPal), über deren Plattformen die Nutzer und wir Zahlungstransaktionen vornehmen können. Wir speichern keine Kreditkartendaten. Die Zahlungsdaten werden direkt durch den Zahlungsdienstleister verarbeitet.</p>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">4. Ihre Rechte</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Sie haben folgende Rechte:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
              <li><strong>Recht auf Beschwerde bei einer Aufsichtsbehörde</strong> (Art. 77 DSGVO)</li>
            </ul>
            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Aufsichtsbehörde</h3>
            <div className="bg-gray-50 p-4 rounded text-gray-700">
              <p className="font-medium text-gray-900">Berliner Beauftragte für Datenschutz und Informationsfreiheit</p>
              <p>Friedrichstr. 219</p>
              <p>10969 Berlin</p>
              <p>Telefon: +49 30 13889-0</p>
              <p>E-Mail: mailbox@datenschutz-berlin.de</p>
            </div>
          </section>
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">5. Speicherdauer</h2>
            <p className="text-gray-700 leading-relaxed">Sofern in dieser Datenschutzerklärung keine spezifische Speicherdauer genannt wird, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder die Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.</p>
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
