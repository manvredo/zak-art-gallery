'use client';
import { useLanguage } from '@/app/context/LanguageContext';

const about = {
  de: [
    'Ich bin Manfred Zak — Künstler, Illustrator und Maler, wohnhaft in Berlin. Meine Beziehung zur Malerei begann früh. Ich wuchs umgeben von Bildern auf, die meine Wahrnehmung prägten und mir zeigten, dass Kunst Erinnerung, Atmosphäre und Emotionen transportieren kann, lange bevor man sie bewusst versteht. Als Kind lernte ich durch Beobachtung, durch Materialien und durch die stille Disziplin des genauen Hinsehens. Das Malen wurde für mich weniger zu einem Handwerk als vielmehr zu einer Art zu denken.',
    'Seit 1997 arbeite ich hauptberuflich als Künstler; in dieser Zeit machte ich meine ersten experimentellen Schritte in der digitalen Kunst, während ich kontinuierlich analoge Arbeiten schuf. Auch in den letzten zwei Jahrzehnten, die überwiegend durch die Arbeit am Computer geprägt waren, kehrte ich regelmäßig zu intensiven analogen Phasen zurück.',
    'Während dieser gesamten Laufbahn bewegte sich mein beruflicher Schwerpunkt tief im Schnittbereich von klassischer Kunst und digitalen Medien — insbesondere in den Bereichen 3D-Visualisierung, Illustration und Animation. Meine Arbeit verband oft analoge und digitale Prozesse: gezeichnete Linien über Renderings, Kohle und Tusche über Animationssequenzen, malerische Interventionen in digitalen Bildwelten. Doch trotz aller technischen Möglichkeiten — bis hin zur Entwicklung meiner eigenen Echtzeit-Farbanalyse-Software ArtWingman — blieb die Malerei immer das wahre Zentrum meiner Arbeit.',
    'In den letzten Jahren bin ich fast vollständig zur Leinwand zurückgekehrt. Das Leben und Arbeiten zwischen Berlin und der brandenburgischen Landschaft hat etwas bestätigt, das ich schon immer intuitiv wusste: Malen ist für mich nicht einfach ein Beruf, sondern eine notwendige Form der Wahrnehmung und der Auseinandersetzung mit der Welt.',
    'Heute arbeite ich an mehreren fortlaufenden Serien, umgeben von fertigen und unfertigen Leinwänden gleichermaßen. In meinen Arbeiten geht es weniger um konkrete Erzählungen als vielmehr um Atmosphäre, Erinnerung, Struktur und die emotionale Präsenz von Landschaften und Räumen. Mich ziehen Bilder an, die sich langsam öffnen, die Stille zulassen und Raum für eigene Assoziationen lassen. Malen bedeutet für mich Aufmerksamkeit, Verdichtung und Entdeckung. Es ist die einzige Sprache, die mich mein ganzes Leben lang begleitet hat.',
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

      {/* About Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12 flex items-center gap-4">
          <h1 className="font-light text-gray-900 whitespace-nowrap tracking-wide" style={{ fontSize: 32 }}>
            ABOUT
          </h1>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>

      {/* About Me */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <img
              src="/about/Camera_01.png"
              alt={language === 'de' ? 'Manfred Zak' : 'Manfred Zak'}
              className="w-full aspect-[3/4] object-cover rounded-sm"
            />
          </div>
          <div className="lg:col-span-3 text-gray-700 font-light leading-relaxed">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              {language === 'de' ? 'Über mich' : 'About Me'}
            </h2>
            {paragraphs.map((text, i) => (
              <p key={i} className="mb-4">{text}</p>
            ))}
            <a
              href="/contact"
              className="inline-block mt-4 rounded-full bg-gray-900 text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition"
            >
              {language === 'de' ? 'Kontakt' : 'Contact'}
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200" />
      </div>

      {/* How I Work */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">

        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-2">
            {howIWork.title[language]}
          </h2>
          <p className="text-gray-400 font-light italic">
            {howIWork.subtitle[language]}
          </p>
        </div>

        {/* Photo 1 left · paragraphs 1–2 right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-2">
            <img
              src="/about/Work_01.jpg"
              alt={language === 'de' ? 'Wie ich arbeite' : 'How I Work'}
              className="w-full aspect-[4/3] object-cover rounded-sm"
            />
          </div>
          <div className="lg:col-span-3 text-gray-700 font-light leading-relaxed">
            {workParagraphs.slice(0, 2).map((text, i) => (
              <p key={i} className="mb-4">{text}</p>
            ))}
          </div>
        </div>

        {/* Paragraphs 3–5 left · Photo 2 right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-3 text-gray-700 font-light leading-relaxed lg:order-1">
            {workParagraphs.slice(2).map((text, i) => (
              <p key={i} className="mb-4">{text}</p>
            ))}
          </div>
          <div className="lg:col-span-2 lg:order-2">
            <img
              src="/about/Work_02.jpg"
              alt={language === 'de' ? 'Wie ich arbeite' : 'How I Work'}
              className="w-full aspect-[3/4] object-cover rounded-sm"
            />
          </div>
        </div>

      </section>

    </div>
  );
}
