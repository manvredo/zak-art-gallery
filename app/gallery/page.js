'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useLanguage } from '@/app/context/LanguageContext';
import { X, Image as ImageIcon } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function GalleryPage() {
  const { t } = useLanguage();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery items:', error);
    } else {
      setGalleryItems(data || []);
    }
    setLoading(false);
  };

  // Kategorien extrahieren
  const categories = ['Alle', ...new Set(galleryItems.map(item => item.category).filter(Boolean))];

  // Items filtern
  const filteredItems = selectedCategory === 'Alle' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-light text-gray-900 mb-4">
          {t.gallery?.title || 'Galerie'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.gallery?.subtitle || 'Entdecken Sie unsere Kunstwerke'}
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition cursor-pointer ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Keine Kunstwerke gefunden</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                {item.artist && (
                  <p className="text-gray-600 mb-2 italic">{item.artist}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {item.width && item.height && (
                    <span>{item.width} × {item.height} cm</span>
                  )}
                  {item.technique && (
                    <span>{item.technique}</span>
                  )}
                  {item.year && (
                    <span>{item.year}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">{selectedItem.title}</h2>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div 
                  className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setLightboxImage(selectedItem.image)}
                >
                  {selectedItem.image ? (
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  {selectedItem.artist && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Künstler</p>
                      <p className="text-lg font-medium text-gray-900">{selectedItem.artist}</p>
                    </div>
                  )}

                  {selectedItem.category && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Kategorie</p>
                      <p className="text-gray-900">{selectedItem.category}</p>
                    </div>
                  )}

                  {(selectedItem.width || selectedItem.height) && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Größe</p>
                      <p className="text-gray-900">{selectedItem.width} × {selectedItem.height} cm</p>
                    </div>
                  )}

                  {selectedItem.technique && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Technik</p>
                      <p className="text-gray-900">{selectedItem.technique}</p>
                    </div>
                  )}

                  {selectedItem.year && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Jahr</p>
                      <p className="text-gray-900">{selectedItem.year}</p>
                    </div>
                  )}

                  {selectedItem.description && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Beschreibung</p>
                      <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-900">
                      ℹ️ Dieses Kunstwerk ist Teil unserer Galerie und nicht zum Verkauf verfügbar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={40} />
          </button>
          <img 
            src={lightboxImage} 
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}