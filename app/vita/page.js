'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { BookOpen, Download, Image as ImageIcon, Quote } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VitaPage() {
  const [vitaData, setVitaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVita();
  }, []);

  const fetchVita = async () => {
    try {
      const { data, error } = await supabase
        .from('vita')
        .select('*')
        .single();

      if (error) throw error;
      setVitaData(data);
    } catch (error) {
      console.error('Error fetching vita:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lädt...</p>
        </div>
      </div>
    );
  }

  if (!vitaData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Keine Vita-Daten gefunden.</p>
        </div>
      </div>
    );
  }

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
                {vitaData.photo ? (
                  <img 
                    src={vitaData.photo} 
                    alt={vitaData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={80} className="text-gray-500" />
                    <p className="absolute text-gray-400 text-sm mt-32">Künstlerfoto</p>
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="text-5xl font-light mb-4">{vitaData.name}</h1>
              <p className="text-2xl text-gray-300 mb-6">{vitaData.title}</p>
              <div className="flex gap-6 text-sm text-gray-300">
                {vitaData.born && (
                  <div>
                    <span className="block text-gray-400">Geboren</span>
                    <span>{vitaData.born}</span>
                  </div>
                )}
                {vitaData.location && (
                  <div>
                    <span className="block text-gray-400">Lebt & arbeitet in</span>
                    <span>{vitaData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Nur Biografie Tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          
          {/* Statement */}
          {vitaData.statement && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
              <Quote className="text-blue-600 mb-4" size={40} />
              <blockquote 
                className="text-xl font-light text-gray-800 leading-relaxed italic"
                dangerouslySetInnerHTML={{ __html: vitaData.statement }}
              />
            </div>
          )}

          {/* Bio Text & Education */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Über den Künstler</h2>
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: vitaData.bio }}
              />
            </div>
            
            {vitaData.education && (
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Ausbildung</h3>
                <div dangerouslySetInnerHTML={{ __html: vitaData.education }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 ZAK Art Gallery. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}