'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Möchten Sie dieses Galeriewerk wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setGalleryItems(galleryItems.filter(item => item.id !== id));
      alert('Galeriewerk erfolgreich gelöscht!');
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Fehler beim Löschen!');
    }
  };

  const categories = ['Alle', ...new Set(galleryItems.map(item => item.category).filter(Boolean))];
  const filteredItems = selectedCategory === 'Alle' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Galerie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Galerie verwalten</h1>
          <p className="text-gray-600">{galleryItems.length} Kunstwerke (nur Ansicht, nicht verkäuflich)</p>
        </div>
        <a
          href="/admin/gallery/new"
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
        >
          <Plus size={20} />
          Neues Galeriewerk
        </a>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-blue-900">
          ℹ️ <strong>Galerie</strong> = Kunstwerke nur zur Ansicht (nicht kaufbar) • 
          <strong className="ml-2">Shop</strong> = Verkäufliche Produkte
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition ${
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

      {/* Gallery Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-4">Keine Galeriewerke gefunden</p>
          <a
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Erstes Galeriewerk anlegen
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {item.title}
                </h3>
                {item.artist && (
                  <p className="text-sm text-gray-600 mb-1 italic">{item.artist}</p>
                )}
                <p className="text-sm text-gray-500 mb-3">
                  {item.width && item.height && `${item.width} × ${item.height} cm`}
                  {item.technique && ` • ${item.technique}`}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={`/admin/gallery/edit/${item.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                  >
                    <Edit size={16} />
                    Bearbeiten
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}