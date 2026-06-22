'use client';
import { useLanguage } from '@/app/context/LanguageContext';

const artwingmanIntro = {
  de: [
    'Artwingman ist eine Software für Künstler, die ich entwickelt habe, um den Arbeitsalltag zu vereinfachen und neue Möglichkeiten der Kunstvermittlung zu eröffnen.',
    'Die App verbindet klassische Kuratierung mit moderner KI-Technologie. Sie hilft Künstlern, ihre Werke zu organisieren, zu präsentieren und einem größeren Publikum zugänglich zu machen.',
    'Besonders am Herzen liegt mir dabei die Verbindung von handwerklicher Tradition und technischer Innovation – ganz im Sinne meiner eigenen Arbeit, die oft zwischen Leinwand und digitalen Medien pendelt.',
  ],
  en: [
    'Artwingman is a software for artists that I developed to simplify daily workflow and open new possibilities for art discovery.',
    'The app combines classical curation with modern AI technology. It helps artists organize, present and make their work accessible to a wider audience.',
    'What lies close to my heart is the connection between craft tradition and technical innovation – in line with my own work, which often oscillates between canvas and digital media.',
  ],
};

export default function ArtwingmanPage() {
  const { language } = useLanguage();
  const paragraphs = language === 'de' ? artwingmanIntro.de : artwingmanIntro.en;

  return (
    <div className="min-h-screen bg-white">

      {/* Artwingman Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="mb-10 flex items-center gap-4">
          <h1
            className="font-light text-gray-900 whitespace-nowrap tracking-wide"
            style={{ fontFamily: "'Vollkorn', Georgia, serif", fontSize: 32 }}
          >
            ARTWINGMAN
          </h1>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-6">
          <div className="rounded-sm overflow-hidden bg-gray-100 md:relative md:min-h-0">
            <img
              src="/artwingman/Artwingman-1920_01.jpg"
              srcSet="/artwingman/Artwingman-1920_01.jpg 1920w, /artwingman/Artwingman-3840_01.jpg 3840w"
              sizes="(max-width: 768px) 100vw, 55vw"
              alt="Artwingman"
              className="w-full md:absolute md:inset-0 md:h-full md:object-cover md:w-full"
            />
          </div>
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            <h2
              className="text-3xl font-light text-gray-900"
              style={{ fontFamily: "'Vollkorn', Georgia, serif" }}
            >
              {language === 'de' ? 'Was ist Artwingman?' : 'What is Artwingman?'}
            </h2>
            {paragraphs.map((text, i) => (
              <p key={i} style={{ fontFamily: "'Inter', Arial, sans-serif" }}>{text}</p>
            ))}
            <a
              href="https://artwingman.com/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition"
              style={{ fontFamily: "'Inter', Arial, sans-serif" }}
            >
              {language === 'de' ? 'Zur App →' : 'Open App →'}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
