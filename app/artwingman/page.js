import Link from 'next/link';

export const metadata = {
  title: 'Artwingman — ZAK Fine Art',
  description: 'Your AI companion for art discovery. Find the perfect artwork for your space with Artwingman.',
};

export default function ArtwingmanPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1
            className="text-5xl md:text-7xl mb-6"
            style={{ fontFamily: "'Vollkorn', Georgia, serif" }}
          >
            Artwingman
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', Arial, sans-serif" }}
          >
            Dein KI-Begleiter für die Kunstentdeckung.
            <br />
            Finde das perfekte Kunstwerk für deinen Raum.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="border border-gray-700 rounded-2xl p-8 bg-[#111]">
            <div className="text-4xl mb-4">🎨</div>
            <h3
              className="text-2xl mb-3"
              style={{ fontFamily: "'Vollkorn', Georgia, serif" }}
            >
              Personalisiert
            </h3>
            <p
              className="text-gray-400"
              style={{ fontFamily: "'Inter', Arial, sans-serif" }}
            >
              Basierend auf deinem Geschmack und Raum empfehlen wir Kunst, die perfekt zu dir passt.
            </p>
          </div>

          <div className="border border-gray-700 rounded-2xl p-8 bg-[#111]">
            <div className="text-4xl mb-4">🖼️</div>
            <h3
              className="text-2xl mb-3"
              style={{ fontFamily: "'Vollkorn', Georgia, serif" }}
            >
              Kuratiert
            </h3>
            <p
              className="text-gray-400"
              style={{ fontFamily: "'Inter', Arial, sans-serif" }}
            >
              Jedes Kunstwerk wird handverlesen und mit Sorgfalt für dich ausgewählt.
            </p>
          </div>

          <div className="border border-gray-700 rounded-2xl p-8 bg-[#111]">
            <div className="text-4xl mb-4">✨</div>
            <h3
              className="text-2xl mb-3"
              style={{ fontFamily: "'Vollkorn', Georgia, serif" }}
            >
              Innovativ
            </h3>
            <p
              className="text-gray-400"
              style={{ fontFamily: "'Inter', Arial, sans-serif" }}
            >
              Modernste KI-Technologie trifft auf traditionelle Kunstkompetenz.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <p
            className="text-lg text-gray-300 mb-8"
            style={{ fontFamily: "'Inter', Arial, sans-serif" }}
          >
            Bald verfügbar — sei gespannt!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-black rounded-full text-lg hover:bg-gray-200 transition"
            style={{ fontFamily: "'Inter', Arial, sans-serif" }}
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
