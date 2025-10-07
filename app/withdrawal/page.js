"use client";

import React from 'react';
import Link from 'next/link';

export default function WithdrawalPage() {
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
        <h1 className="text-4xl font-light text-gray-900 mb-8">Widerrufsbelehrung / Right of Withdrawal</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Deutsche Version */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Widerrufsrecht</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, 
              der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
            </p>

            <div className="bg-gray-50 p-4 rounded text-gray-700 mb-4">
              <p className="font-medium text-gray-900">ZAK Art Gallery</p>
              <p>Manfred Zak</p>
              <p>Großbeerenstr. 15</p>
              <p>10963 Berlin</p>
              <p>Deutschland</p>
              <p className="mt-2">E-Mail: info@thefroggers.io</p>
              <p>Telefon: +49 (0) 123 456789</p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren 
              Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte 
              Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Widerrufsfolgen</h3>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, 
              einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass 
              Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), 
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über 
              Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion 
              eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall 
              werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den 
              Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem 
              Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist 
              ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur 
              Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen 
              zurückzuführen ist.
            </p>
          </section>

          {/* Muster-Widerrufsformular */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Muster-Widerrufsformular</h2>
            
            <div className="bg-gray-50 p-6 rounded">
              <p className="text-sm text-gray-600 mb-4 italic">
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
              </p>
              
              <div className="space-y-3 text-gray-700">
                <p>An:</p>
                <p className="ml-4">
                  ZAK Art Gallery<br />
                  Manfred Zak<br />
                  Großbeerenstr. 15<br />
                  10963 Berlin<br />
                  Deutschland<br />
                  E-Mail: info@thefroggers.io
                </p>
                
                <p className="mt-4">
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der 
                  folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)
                </p>
                
                <p className="mt-4">
                  - Bestellt am (*)/erhalten am (*)<br />
                  - Name des/der Verbraucher(s)<br />
                  - Anschrift des/der Verbraucher(s)<br />
                  - Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)<br />
                  - Datum
                </p>
                
                <p className="text-sm text-gray-600 mt-4 italic">
                  (*) Unzutreffendes streichen.
                </p>
              </div>
            </div>
          </section>

          {/* English Version */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Right of Withdrawal</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to withdraw from this contract within fourteen days without giving any reason.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              The withdrawal period is fourteen days from the day on which you or a third party named by you, 
              who is not the carrier, took possession of the goods.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise your right of withdrawal, you must inform us:
            </p>

            <div className="bg-gray-50 p-4 rounded text-gray-700 mb-4">
              <p className="font-medium text-gray-900">ZAK Art Gallery</p>
              <p>Manfred Zak</p>
              <p>Großbeerenstr. 15</p>
              <p>10963 Berlin</p>
              <p>Germany</p>
              <p className="mt-2">Email: info@thefroggers.io</p>
              <p>Phone: +49 (0) 123 456789</p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              by means of a clear statement (e.g. a letter sent by post or email) of your decision to withdraw 
              from this contract. You may use the attached model withdrawal form, but it is not obligatory.
            </p>

            <h3 className="text-xl font-light text-gray-900 mb-3 mt-6">Effects of Withdrawal</h3>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              If you withdraw from this contract, we shall reimburse you all payments we have received from you, 
              including delivery costs (with the exception of additional costs resulting from the fact that you 
              have chosen a type of delivery other than the most favorable standard delivery offered by us), 
              without undue delay and no later than fourteen days from the day on which we received notification 
              of your withdrawal from this contract.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              For this repayment, we will use the same means of payment that you used for the original transaction, 
              unless expressly agreed otherwise with you; in no case will you be charged any fees because of this repayment.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              We may refuse repayment until we have received the goods back or until you have provided proof that 
              you have returned the goods, whichever is the earlier.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              You must return or hand over the goods to us immediately and in any case no later than fourteen days 
              from the day on which you notify us of the withdrawal from this contract. The deadline is met if you 
              send the goods before the expiry of the fourteen-day period.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              You bear the direct costs of returning the goods.
            </p>

            <p className="text-gray-700 leading-relaxed">
              You only have to pay for any loss in value of the goods if this loss in value is due to handling of 
              the goods that is not necessary for testing the quality, characteristics and functionality of the goods.
            </p>
          </section>

          <p className="text-sm text-gray-600 pt-4 border-t border-gray-200">
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