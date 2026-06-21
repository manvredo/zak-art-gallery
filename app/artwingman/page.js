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

const features = {
  title: { de: 'Was Artwingman bietet', en: 'What Artwingman Offers' },
  subtitle: { de: '… und warum ich diese Software entwickelt habe', en: '… and why I developed this software' },
  paragraphs: {
    de: [
      'Künstler stehen vor der Herausforderung, ihre Arbeit sichtbar zu machen – jenseits der üblichen sozialen Plattformen, die nicht für Kunst gemacht sind. Artwingman bietet einen anderen Ansatz: Eine Umgebung, die Kunst ernst nimmt und Räume schafft, in denen sie wirken kann.',
      'Die App nutzt KI-Technologie, um Kunstwerke zu analysieren und in einen ästhetischen Zusammenhang zu setzen. Farbwelten, Komposition, Stimmung – all das fließt in Empfehlungen ein, die nicht auf Algorithmen basieren, sondern auf visueller Intelligenz.',
      'Gleichzeitig bleibt die Software ein Werkzeug, nicht das Zentrum. Ich glaube daran, dass Technologie den Künstler unterstützen sollte, nicht ersetzen. Artwingman hilft bei der Organisation, der Präsentation und der Kommunikation – aber die Entscheidung, was ein Kunstwerk bedeutet, bleibt beim Menschen.',
    ],
    en: [
      'Artists face the challenge of making their work visible – beyond the usual social platforms that are not designed for art. Artwingman offers a different approach: an environment that takes art seriously and creates spaces where it can have an effect.',
      'The app uses AI technology to analyze artworks and place them in an aesthetic context. Color worlds, composition, mood – all of this feeds into recommendations that are not based on algorithms but on visual intelligence.',
      'At the same time, the software remains a tool, not the center. I believe technology should support the artist, not replace them. Artwingman helps with organization, presentation and communication – but the decision of what a work of art means remains with the human.',
    ],
  },
};

export default function ArtwingmanPage() {
  const { language } = useLanguage();
  const paragraphs = language === 'de' ? artwingmanIntro.de : artwingmanIntro.en;
  const featureParagraphs = language === 'de' ? features.paragraphs.de : features.paragraphs.en;

  return (
    <div className="min-h-screen bg-white">

      {/* Artwingman Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 flex items-center gap-4">
          <h1
            className="text-4xl font-light text-gray-900 whitespace-nowrap font-sans tracking-wide"
            style={{ fontFamily: "'Vollkorn', Georgia, serif" }}
          >
            ARTWINGMAN
          </h1>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>

      {/* About Artwingman */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="aspect-[3/4] rounded-sm overflow-hidden bg-gray-100">
            <img
              src="/artwingman/Artwingman_01.png"
              alt="Artwingman App-Oberfläche"
              className="w-full h-full object-cover"
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
              href="/contact"
              className="inline-block mt-4 border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition"
              style={{ fontFamily: "'Inter', Arial, sans-serif" }}
            >
              {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200" />
      </div>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Heading */}
        <div className="mb-12">
          <h2
            className="text-3xl font-light text-gray-900 mb-2"
            style={{ fontFamily: "'Vollkorn', Georgia, serif" }}
          >
            {features.title[language]}
          </h2>
          <p
            className="text-gray-400 font-light italic"
            style={{ fontFamily: "'Inter', Arial, sans-serif" }}
          >
            {features.subtitle[language]}
          </p>
        </div>

        {/* Feature Image 1 left · paragraphs 1–2 right */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="aspect-[4/3] rounded-sm overflow-hidden bg-gray-100">
            <img
              src="/artwingman/Artwingman_02.png"
              alt="Artwingman KI-Analyse"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            {featureParagraphs.slice(0, 2).map((text, i) => (
              <p key={i} style={{ fontFamily: "'Inter', Arial, sans-serif" }}>{text}</p>
            ))}
          </div>
        </div>

        {/* Paragraphs 3 left · Feature Image 2 right */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            {featureParagraphs.slice(2).map((text, i) => (
              <p key={i} style={{ fontFamily: "'Inter', Arial, sans-serif" }}>{text}</p>
            ))}
          </div>
          <div className="aspect-[4/3] bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 text-sm">
            {language === 'de' ? 'Bild: Präsentation folgt' : 'Image: Presentation coming soon'}
          </div>
        </div>

      </section>

    </div>
  );
}