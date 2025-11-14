'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Search, ArrowLeft } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    const foundResults = [];

    try {
      // Suche in Produkten
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (products && !productsError) {
        products.forEach(product => {
          const matches = [];
          const lowerQuery = searchTerm.toLowerCase();
          
          if (product.name && product.name.toLowerCase().includes(lowerQuery)) {
            matches.push('Produktname');
          }
          if (product.artist && product.artist.toLowerCase().includes(lowerQuery)) {
            matches.push('Künstler');
          }
          if (product.description && product.description.toLowerCase().includes(lowerQuery)) {
            matches.push('Beschreibung');
          }
          if (product.category && product.category.toLowerCase().includes(lowerQuery)) {
            matches.push('Kategorie');
          }

          if (matches.length > 0) {
            foundResults.push({
              type: 'product',
              id: product.id,
              title: product.name,
              subtitle: product.artist,
              description: product.description,
              link: `/shop`,
              matches: matches,
              image: product.image_url
            });
          }
        });
      }

      // Suche in News
      const { data: news, error: newsError } = await supabase
        .from('content')
        .select('*')
        .eq('category', 'news');

      if (news && !newsError) {
        news.forEach(item => {
          const matches = [];
          const lowerQuery = searchTerm.toLowerCase();
          
          if (item.title && item.title.toLowerCase().includes(lowerQuery)) {
            matches.push('Titel');
          }
          if (item.content && item.content.toLowerCase().includes(lowerQuery)) {
            matches.push('Inhalt');
          }

          if (matches.length > 0) {
            foundResults.push({
              type: 'news',
              id: item.id,
              title: item.title,
              subtitle: 'News',
              description: item.content?.substring(0, 150) + '...',
              link: `/news`,
              matches: matches
            });
          }
        });
      }

      // Suche in Stories
      const { data: stories, error: storiesError } = await supabase
        .from('content')
        .select('*')
        .eq('category', 'story');

      if (stories && !storiesError) {
        stories.forEach(item => {
          const matches = [];
          const lowerQuery = searchTerm.toLowerCase();
          
          if (item.title && item.title.toLowerCase().includes(lowerQuery)) {
            matches.push('Titel');
          }
          if (item.content && item.content.toLowerCase().includes(lowerQuery)) {
            matches.push('Inhalt');
          }

          if (matches.length > 0) {
            foundResults.push({
              type: 'story',
              id: item.id,
              title: item.title,
              subtitle: 'Making-of',
              description: item.content?.substring(0, 150) + '...',
              link: `/story`,
              matches: matches
            });
          }
        });
      }

      // Suche in Press
      const { data: press, error: pressError } = await supabase
        .from('content')
        .select('*')
        .eq('category', 'press');

      if (press && !pressError) {
        press.forEach(item => {
          const matches = [];
          const lowerQuery = searchTerm.toLowerCase();
          
          if (item.title && item.title.toLowerCase().includes(lowerQuery)) {
            matches.push('Titel');
          }
          if (item.content && item.content.toLowerCase().includes(lowerQuery)) {
            matches.push('Inhalt');
          }

          if (matches.length > 0) {
            foundResults.push({
              type: 'press',
              id: item.id,
              title: item.title,
              subtitle: 'Presse',
              description: item.content?.substring(0, 150) + '...',
              link: `/press`,
              matches: matches
            });
          }
        });
      }

      setResults(foundResults);
    } catch (error) {
      console.error('Search error:', error);
    }

    setLoading(false);
  };

  const highlightText = (text, searchTerm) => {
    if (!text || !searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={index} className="bg-yellow-300 px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Zurück
        </Link>

        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search size={32} className="text-gray-400" />
            <h1 className="text-3xl font-light text-gray-900">Suchergebnisse</h1>
          </div>
          {query && (
            <p className="text-gray-600 text-lg">
              {loading ? (
                'Suche läuft...'
              ) : (
                <>
                  <span className="font-medium">{results.length} Ergebnisse</span> gefunden für "{query}"
                </>
              )}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Durchsuche Inhalte...</p>
          </div>
        )}

        {/* No Query */}
        {!query && !loading && (
          <div className="text-center py-12">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Bitte geben Sie einen Suchbegriff ein</p>
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Keine Ergebnisse für "{query}" gefunden
            </p>
            <p className="text-gray-500 mt-2">
              Versuchen Sie es mit anderen Suchbegriffen
            </p>
          </div>
        )}

        {/* Results List */}
        {!loading && results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, index) => (
              <Link
                key={`${result.type}-${result.id}-${index}`}
                href={result.link}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
              >
                <div className="flex gap-4">
                  {result.image && (
                    <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {result.subtitle}
                      </span>
                      <span className="text-xs text-gray-500">
                        Gefunden in: {result.matches.join(', ')}
                      </span>
                    </div>
                    <h2 className="text-xl font-light text-gray-900 mb-2">
                      {highlightText(result.title, query)}
                    </h2>
                    {result.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {highlightText(result.description, query)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}