'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import ContentHeader from '@/app/components/ContentHeader';
import ContentSidebar from '@/app/components/ContentSidebar';
import { Award, BookOpen, Calendar, Download, Image as ImageIcon, Quote } from 'lucide-react';

export default function VitaPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('bio');

  // Dummy data - kann später durch CMS/Datenbank ersetzt werden
  const artistData = {
    name: "ZAK",
    title: "Zeitgenössischer Künstler",
    photo: "/artist-photo.jpg", // Platzhalter
    born: "1985",
    location: "Berlin, Deutschland",
    
    bio: {
      de: "Seit über einem Jahrzehnt widme ich mich der zeitgenössischen Kunst. Meine Werke in Öl und Kohlekreide sind inspiriert von der Schönheit der Natur und menschlicher Emotionen. Jedes Gemälde erzählt eine Geschichte, die den Betrachter zum Nachdenken anregt und Emotionen weckt.\n\nMeine künstlerische Reise begann in den Galerien Berlins, wo ich die Kraft der Farben und Formen entdeckte. Heute kreiere ich Originalwerke, die in privaten und öffentlichen Sammlungen weltweit zu finden sind.",
      en: "For over a decade, I have been dedicated to contemporary art. My works in oil and charcoal are inspired by the beauty of nature and human emotions. Each painting tells a story that makes the viewer think and evokes emotions.\n\nMy artistic journey began in the galleries of Berlin, where I discovered the power of colors and forms. Today I create original works that can be found in private and public collections worldwide."
    },
    
    statement: {
      de: "Kunst ist für mich mehr als nur Farbe auf Leinwand. Es ist eine Sprache, die Grenzen überwindet und Menschen verbindet. In jedem Pinselstrich liegt eine Emotion, in jeder Farbe eine Bedeutung. Mein Ziel ist es, Werke zu schaffen, die nicht nur das Auge erfreuen, sondern auch die Seele berühren.",
      en: "For me, art is more than just paint on canvas. It is a language that transcends boundaries and connects people. In every brushstroke lies an emotion, in every color a meaning. My goal is to create works that not only please the eye but also touch the soul."
    },

    education: [
      { year: "2010-2014", title: "Studium der Bildenden Künste", location: "Universität der Künste Berlin" },
      { year: "2008-2010", title: "Kunstakademie", location: "München" },
      { year: "2015", title: "Meisterklasse Ölmalerei", location: "Florenz, Italien" }
    ],

    exhibitions: [
      { year: "2024", title: "Farben der Emotion", type: "Einzelausstellung", location: "Galerie Modern, Berlin" },
      { year: "2023", title: "Zeitgenössische Perspektiven", type: "Gruppenausstellung", location: "Kunsthalle Hamburg" },
      { year: "2022", title: "Naturgewalten", type: "Einzelausstellung", location: "Kunstmuseum Dresden" },
      { year: "2021", title: "Berlin Art Week", type: "Gruppenausstellung", location: "Berlin" },
      { year: "2020", title: "Digitale Räume", type: "Online-Ausstellung", location: "International" }
    ],

    awards: [
      { year: "2023", title: "Kunstpreis Berlin", organization: "Senat für Kultur" },
      { year: "2021", title: "Nachwuchsförderpreis", organization: "Deutsche Kunstgesellschaft" },
      { year: "2019", title: "Publikumspreis", organization: "Art Fair Köln" }
    ],

    publications: [
      { year: "2024", title: "Interview: Die Kraft der Farben", publication: "Kunstmagazin" },
      { year: "2023", title: "Portfolio Feature", publication: "Contemporary Art Review" },
      { year: "2022", title: "Emerging Artists", publication: "Art World Magazine" }
    ]
  };

  const lang = t.language || 'de';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK ART GALLERY
              </h1>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              ← Zurück zum Shop
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={80} className="text-gray-500" />
                  <p className="absolute text-gray-400 text-sm mt-32">Künstlerfoto</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="text-5xl font-light mb-4">{artistData.name}</h1>
              <p className="text-2xl text-gray-300 mb-6">{artistData.title}</p>
              <div className="flex gap-6 text-sm text-gray-300">
                <div>
                  <span className="block text-gray-400">Geboren</span>
                  <span>{artistData.born}</span>
                </div>
                <div>
                  <span className="block text-gray-400">Lebt & arbeitet in</span>
                  <span>{artistData.location}</span>
                </div>
              </div>
              <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition">
                <Download size={18} />
                CV herunterladen (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('bio')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'bio'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen size={18} className="inline mr-2" />
              Biografie
            </button>
            <button
              onClick={() => setActiveTab('exhibitions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'exhibitions'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ImageIcon size={18} className="inline mr-2" />
              Ausstellungen
            </button>
            <button
              onClick={() => setActiveTab('awards')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'awards'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Award size={18} className="inline mr-2" />
              Auszeichnungen
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Biografie Tab */}
        {activeTab === 'bio' && (
          <div className="space-y-12">
            {/* Statement */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
              <Quote className="text-blue-600 mb-4" size={40} />
              <blockquote className="text-xl font-light text-gray-800 leading-relaxed italic">
                {artistData.statement[lang]}
              </blockquote>
            </div>

            {/* Bio Text */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-light text-gray-900 mb-6">Über den Künstler</h2>
                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                  {artistData.bio[lang]}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Ausbildung</h3>
                <div className="space-y-4">
                  {artistData.education.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-gray-300 pl-4">
                      <p className="text-sm text-gray-500">{edu.year}</p>
                      <p className="font-medium text-gray-900">{edu.title}</p>
                      <p className="text-sm text-gray-600">{edu.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ausstellungen Tab */}
        {activeTab === 'exhibitions' && (
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-8">Ausstellungen</h2>
            <div className="space-y-6">
              {artistData.exhibitions.map((exhibition, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl font-light text-gray-900">{exhibition.year}</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {exhibition.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{exhibition.title}</h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Calendar size={16} />
                        {exhibition.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Auszeichnungen Tab */}
        {activeTab === 'awards' && (
          <div className="space-y-12">
            {/* Awards */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">Preise & Auszeichnungen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {artistData.awards.map((award, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                    <Award className="text-yellow-600 mb-3" size={32} />
                    <p className="text-sm text-gray-600 mb-1">{award.year}</p>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{award.title}</h3>
                    <p className="text-gray-700">{award.organization}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">Publikationen & Presse</h2>
              <div className="space-y-4">
                {artistData.publications.map((pub, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-light text-gray-900">{pub.year}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{pub.title}</p>
                        <p className="text-sm text-gray-600 italic">{pub.publication}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>{t.footer?.rights || '© 2024 ZAK Art Gallery. Alle Rechte vorbehalten.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}