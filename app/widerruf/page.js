"use client";

import React from 'react';
import Link from 'next/link';

export default function WiderrufPage() {
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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Widerrufsbelehrung</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Widerrufsrecht</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
              </p>
              
              <p>
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter 
                Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
              </p>
              
              <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
              </p>
              
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">ZAK Art Gallery</p>
                <p>Manfred Zak</p>
                <p>Großbeerenstr. 15</p>
                <p>10963 Berlin</p>
                <p>E-Mail: info@manfredzak.com</p>
                <p>Telefon: +49 (0) 123 456789</p>
              </div>
              
              <p>
                mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) 
                über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das 
                beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
              </p>
              
              <p>
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung 
                des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Folgen des Widerrufs</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen 
                erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, 
                die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, 
                günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn 
                Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags 
                bei uns eingegangen ist.
              </p>
              
              <p>
                Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen 
                Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes 
                vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
              </p>
              
              <p>
                Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder 
                bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, 
                welches der frühere Zeitpunkt ist.
              </p>
              
              <p>
                Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem 
                Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden 
                oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von 
                vierzehn Tagen absenden.
              </p>
              
              <p>
                Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
              </p>
              
              <p>
                Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust 
                auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht 
                notwendigen Umgang mit ihnen zurückzuführen ist.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Muster-Widerrufsformular</h2>
            
            <div className="bg-gray-50 p-6 rounded space-y-4 text-gray-700">
              <p className="italic">
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und 
                senden Sie es zurück.)
              </p>
              
              <div className="border-t border-gray-300 pt-4 mt-4">
                <p>An:</p>
                <p className="font-medium mt-2">ZAK Art Gallery</p>
                <p>Manfred Zak</p>
                <p>Großbeerenstr. 15</p>
                <p>10963 Berlin</p>
                <p>E-Mail: info@manfredzak.com</p>
              </div>
              
              <div className="border-t border-gray-300 pt-4 mt-4">
                <p>
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über 
                  den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*)
                </p>
                <p className="mt-4">Bestellt am (*) / erhalten am (*)</p>
                <p className="mt-4">Name des/der Verbraucher(s)</p>
                <p className="mt-4">Anschrift des/der Verbraucher(s)</p>
                <p className="mt-4">Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
                <p className="mt-4">Datum</p>
                <p className="mt-6 text-sm italic">(*) Unzutreffendes streichen.</p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Ausschluss des Widerrufsrechts</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nach 
                Kundenspezifikation angefertigt werden oder eindeutig auf die persönlichen Bedürfnisse 
                zugeschnitten sind (z.B. individuell angefertigte Kunstwerke auf Bestellung).
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