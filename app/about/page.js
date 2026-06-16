'use client';
import { useLanguage } from '@/app/context/LanguageContext';

const about = {
  de: [
    'Ich bin Manfred Zak, Künstler, Illustrator und Maler mit Sitz in Berlin.',
    'Meine Beziehung zur Malerei begann früh. Ich wuchs umgeben von Bildern auf, die meine Wahrnehmung geprägt haben und mir zeigten, dass Kunst Erinnerung, Atmosphäre und Emotion tragen kann, lange bevor man sie bewusst versteht. Schon als Kind lernte ich durch Beobachtung, durch Materialien und durch die stille Disziplin des genauen Hinsehens. Malerei wurde für mich weniger ein Handwerk als eine Art zu denken.',
    'Über mehr als zwei Jahrzehnte arbeitete ich professionell an der Schnittstelle zwischen klassischer Kunst und digitalen Medien, insbesondere in den Bereichen 3D-Visualisierung, Illustration und Animation. Dabei bewegte sich meine Arbeit oft zwischen analogen und digitalen Prozessen: gezeichnete Linien über Renderings, Kohle und Tusche über Animationssequenzen, malerische Eingriffe innerhalb digitaler Bildwelten. Doch trotz aller technischen Möglichkeiten blieb die Malerei immer der eigentliche Mittelpunkt meiner Arbeit.',
    'In den vergangenen Jahren habe ich mich wieder fast vollständig der Leinwand zugewandt. Das Leben und Arbeiten zwischen Berlin und der brandenburgischen Landschaft hat etwas bestätigt, das ich immer intuitiv wusste: Malerei ist für mich nicht einfach ein Beruf, sondern eine notwendige Form der Wahrnehmung und Auseinandersetzung mit der Welt.',
    'Meine Arbeiten beschäftigen sich weniger mit konkreten Erzählungen als mit Atmosphäre, Erinnerung, Struktur und der emotionalen Präsenz von Landschaften und Räumen. Mich interessieren Bilder, die sich langsam öffnen, die Stille zulassen und Raum für eigene Assoziationen lassen.',
    'Heute arbeite ich an mehreren fortlaufenden Werkgruppen, umgeben von fertigen und unfertigen Leinwänden zugleich. Malerei bedeutet für mich Aufmerksamkeit, Verdichtung und Entdeckung. Sie ist die einzige Sprache, die mich mein ganzes Leben begleitet hat.',
  ],
  en: [
    'I am Manfred Zak — artist, illustrator and painter based in Berlin.',
    'My relationship with painting began early. I grew up surrounded by images that shaped my perception and showed me that art can carry memory, atmosphere and emotion long before one consciously understands it. As a child I learned through observation, through materials, and through the quiet discipline of looking carefully. Painting became for me less a craft than a way of thinking.',
    'For more than two decades I worked professionally at the intersection of classical art and digital media — particularly in 3D visualisation, illustration and animation. My work often moved between analogue and digital processes: drawn lines over renderings, charcoal and ink over animation sequences, painterly interventions within digital image worlds. Yet despite all the technical possibilities, painting always remained the true centre of my work.',
    'In recent years I have returned almost entirely to canvas. Living and working between Berlin and the Brandenburg countryside has confirmed something I always knew intuitively: painting is not simply a profession for me, but a necessary form of perception and engagement with the world.',
    'My works are less concerned with concrete narratives than with atmosphere, memory, structure and the emotional presence of landscapes and spaces. I am drawn to images that open slowly, that allow silence and leave room for one\'s own associations.',
    'Today I work across several ongoing series, surrounded by finished and unfinished canvases alike. Painting, for me, means attention, condensation and discovery. It is the only language that has accompanied me throughout my entire life.',
  ],
};

const howIWork = {
  title: { de: 'Wie ich arbeite', en: 'How I Work' },
  subtitle: { de: '… und warum ich so arbeite', en: '… and why I work this way' },
  paragraphs: {
    de: [
      'Ich habe früh gelernt, dass Freiheit in der Malerei davon abhängt, Gewissheit so lange wie möglich hinauszuzögern. Ich versuche, mich nicht zu früh auf Details oder feste Entscheidungen festzulegen. Stattdessen arbeite ich vom Ganzen nach außen und lasse das Bild sich langsam entwickeln und seine eigene Richtung finden.',
      'Deshalb beginne ich selten mit kleinen Details. Ich konzentriere mich zunächst auf Struktur, Rhythmus, Atmosphäre und Balance und halte jeden Teil der Leinwand lebendig und offen für Veränderungen. Details können später entstehen, wenn das Bild sein inneres Gewicht gefunden hat.',
      'Ölmalerei gibt mir genau diese Freiheit. Sie bleibt fluid, anpassungsfähig und verzeihend. Mit breiten Pinseln, Palettenmessern, Tüchern und geschichteten Oberflächen kann ich Schwerpunkte ständig verschieben, löschen, neu aufbauen, Bereiche weicher oder intensiver gestalten. Nichts ist je vollständig festgelegt.',
      'Für mich wird ein Bild nicht mechanisch konstruiert. Es wächst. Manchmal langsam, manchmal heftig, manchmal über Monate. Ich arbeite, bis das Bild beginnt, seine eigene Präsenz zu tragen, unabhängig von Absicht oder Erklärung.',
      'Was mich am meisten interessiert, ist nicht Perfektion, sondern Vitalität: der Moment, in dem ein Bild beginnt, von selbst zu atmen.',
    ],
    en: [
      'I learned early on that freedom in painting depends on postponing certainty for as long as possible. I try not to commit too soon to details or fixed decisions. Instead, I work from the whole image outward, allowing the painting to evolve gradually and reveal its own direction over time.',
      'Because of this, I rarely begin with small details. I concentrate first on structure, rhythm, atmosphere, and balance, keeping every part of the canvas alive and open to change. Details can emerge later, once the painting has found its internal weight.',
      'Oil painting gives me exactly this freedom. It remains fluid, adaptable, and forgiving. With broad brushes, palette knives, cloths, and layered surfaces, I can constantly shift emphasis, erase, rebuild, soften, or intensify areas of the image. Nothing is ever entirely fixed.',
      'For me, a painting is not constructed mechanically. It grows. Sometimes slowly, sometimes violently, sometimes over months. I work until the image begins to carry its own presence, independent of intention or explanation.',
      'What interests me most is not perfection, but vitality: the moment when a painting starts to breathe on its own.',
    ],
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const paragraphs = language === 'de' ? about.de : about.en;
  const workParagraphs = language === 'de' ? howIWork.paragraphs.de : howIWork.paragraphs.en;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-light tracking-wide text-gray-900 mb-4">ZAK</h1>
          <p className="text-xl text-gray-500 font-light">
            {language === 'de' ? 'Künstler · Maler · Illustrator' : 'Artist · Painter · Illustrator'}
          </p>
        </div>
      </section>

      {/* About Me */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <img
            src="/about/Camera_01.png"
            alt={language === 'de' ? 'Manfred Zak' : 'Manfred Zak'}
            className="aspect-[3/4] object-cover rounded-sm"
          />
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            <h2 className="text-3xl font-light text-gray-900">
              {language === 'de' ? 'Über mich' : 'About Me'}
            </h2>
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            <a
              href="/contact"
              className="inline-block mt-4 border border-gray-900 text-gray-900 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition"
            >
              {language === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200" />
      </div>

      {/* How I Work */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-2">
            {howIWork.title[language]}
          </h2>
          <p className="text-gray-400 font-light italic">
            {howIWork.subtitle[language]}
          </p>
        </div>

        {/* Photo 1 left · paragraphs 1–2 right */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img
            src="/about/Work_01.jpg"
            alt={language === 'de' ? 'Wie ich arbeite' : 'How I Work'}
            className="aspect-[4/3] object-cover rounded-sm"
          />
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            {workParagraphs.slice(0, 2).map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>

        {/* Paragraphs 3–5 left · Photo 2 right */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            {workParagraphs.slice(2).map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
          <div className="aspect-[4/3] bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 text-sm">
            {language === 'de' ? 'Foto 2 folgt' : 'Photo 2 coming soon'}
          </div>
        </div>

      </section>

    </div>
  );
}