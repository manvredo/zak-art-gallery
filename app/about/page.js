'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-light tracking-wide text-gray-900 mb-4">
            ZAK
          </h1>
          <p className="text-xl text-gray-500 font-light">
            {language === 'de' ? 'Künstlerin · Malerin · Zeichnerin' : 'Artist · Painter · Illustrator'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Photo placeholder */}
          <div className="aspect-[3/4] bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 text-sm">
            {language === 'de' ? 'Foto folgt' : 'Photo coming soon'}
          </div>

          {/* Text */}
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            <h2 className="text-3xl font-light text-gray-900">
              {language === 'de' ? 'Über mich' : 'About Me'}
            </h2>

            <p>
              {language === 'de'
                ? 'Placeholder-Text: Hier kommt deine persönliche Geschichte hin — wer du bist, woher du kommst und was dich zur Kunst geführt hat.'
                : 'Placeholder text: Your personal story goes here — who you are, where you come from, and what led you to art.'}
            </p>

            <p>
              {language === 'de'
                ? 'Meine Werke entstehen in Öl und Kohle. Jedes Bild ist ein Original — handsigniert und mit Echtheitszertifikat.'
                : 'My works are created in oil and charcoal. Each piece is an original — hand-signed and comes with a certificate of authenticity.'}
            </p>

            <p>
              {language === 'de'
                ? 'Atelier: [Stadt], Deutschland'
                : 'Studio: [City], Germany'}
            </p>

            <a
              href="/contact"
              className="inline-block mt-4 border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition"
            >
              {language === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
