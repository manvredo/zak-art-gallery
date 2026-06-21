'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

const heroSlides = [
  {
    desktop: '/artwingman/Artwingman-1920_01.jpg',
    full: '/artwingman/Artwingman-3840_01.jpg',
  },
  {
    desktop: '/artwingman/Artwingman-1920_02.jpg',
    full: '/artwingman/Artwingman-3840_02.jpg',
  },
];

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
  const [scrollY, setScrollY] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);
  const [initialFadeIn, setInitialFadeIn] = useState(false);

  useEffect(() => {
    setInitialFadeIn(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const paragraphs = language === 'de' ? artwingmanIntro.de : artwingmanIntro.en;
  const featureParagraphs = language === 'de' ? features.paragraphs.de : features.paragraphs.en;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section - Full Screen Slider wie auf der Hauptseite */}
      <div className="relative w-full h-screen -mt-16 overflow-hidden bg-[#0f0f0f]">
        {heroSlides.map((img, index) => (
          <img
            key={index}
            src={img.desktop}
            srcSet={`${img.desktop} 1920w, ${img.full} 3840w`}
            sizes="100vw"
            alt={`Artwingman ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentHero && initialFadeIn ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Overlay mit Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-8">
          <h1
            className="mb-4"
            style={{
              color: '#ffffff',
              fontFamily: "'Vollkorn', serif",
              fontWeight: '400',
              fontSize: '56px',
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
              letterSpacing: '0.1em',
            }}
          >
            ARTWINGMAN
          </h1>
          <p
            className="text-xl md:text-2xl"
            style={{
              color: '#ffffff',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: '300',
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {language === 'de' ? 'Kunst trifft Technologie' : 'Where Art Meets Technology'}
          </p>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentHero
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Description unter dem Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto space-y-6 text-gray-700 font-light leading-relaxed">
          {paragraphs.map((text, i) => (
            <p key={i} style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '1.1rem' }}>
              {text}
            </p>
          ))}
          <a
            href="/contact"
            className="inline-block mt-6 border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition"
            style={{ fontFamily: "'Inter', Arial, sans-serif" }}
          >
            {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
          </a>
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
              src="/artwingman/Artwingman-1920_02.jpg"
              srcSet="/artwingman/Artwingman-1920_02.jpg 1920w, /artwingman/Artwingman-3840_02.jpg 3840w"
              sizes="(max-width: 768px) 100vw, 50vw"
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
