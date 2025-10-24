'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Plus, Edit2, Trash2, Save, X, Upload, ImageIcon, Loader } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    category: '',
    width: '',
    height: '',
    technique: '',
    year: '',
    description: '',
    image: '',
    featured: false
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const galleryData = {
      title: formData.title || 'Ohne Titel',
      artist: formData.artist || null,
      category: formData.category || null,
      width: formData.width ? parseInt(formData.width) : null,
      height: formData.height ? parseInt(formData.height) : null,
      technique: formData.technique || null,
      year: formData.year || null,
      description: formData.description || null,
      image: formData.image || null,
      featured: formData.featured
    };

    if (editingId) {
      const { error } = await supabase
        .from('gallery_items')
        .update(galleryData)
        .eq('id', editingId);

      if (error) {
        console.error('Error updating gallery item:', error);
        alert('Fehler beim Aktualisieren!');
      } else {
        alert('✅ Galeriewerk erfolgreich aktualisiert!');
        setEditingId(null);
        resetForm();
        await fetchGalleryItems();
      }
    } else {
      const { error } = await supabase
        .from('gallery_items')
        .insert([galleryData]);

      if (error) {
        console.error('Error adding gallery item:', error);
        alert('Fehler beim Anlegen!');
      } else {
        alert('✅ Galeriewerk erfolgreich angelegt!');
        resetForm();
        await fetchGalleryItems();
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || '',
      artist: item.artist || '',
      category: item.category || '',
      width: item.width ? item.width.toString() : '',
      height: item.height ? item.height.toString() : '',
      technique: item.technique || '',
      year: item.year || '',
      description: item.description || '',
      image: item.image || '',
      featured: item.featured || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      alert('✅ Galeriewerk erfolgreich gelöscht!');
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Fehler beim Löschen!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      artist: '',
      category: '',
      width: '',
      height: '',
      technique: '',
      year: '',
      description: '',
      image: '',
      featured: false
    });
    setEditingId(null);
  };

  const extractImageUrl = (result) => {
    if (typeof result === 'string') return result;
    if (result?.event === 'success') return result.info?.secure_url || result.info?.url;
    if (result?.secure_url) return result.secure_url;
    if (result?.url) return result.url;
    if (result?.info?.secure_url) return result.info.secure_url;
    return '';
  };

  const handleUploadSuccess = (result, { widget }) => {
    const imageUrl = extractImageUrl(result);
    
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
      widget.close();
    } else {
      alert('Bild wurde hochgeladen, aber URL konnte nicht extrahiert werden.');
    }
    setUploadingImage(false);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Galerie verwalten</h1>
        <p className="text-gray-600">{galleryItems.length} Kunstwerke (nur Ansicht, nicht verkäuflich)</p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-blue-900">
          ℹ️ <strong>Galerie</strong> = Kunstwerke nur zur Ansicht (nicht kaufbar) • 
          <strong className="ml-2">Shop</strong> = Verkäufliche Produkte
        </p>
      </div>

      {/* Gallery Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-light text-gray-900 mb-4">
          {editingId ? 'Galeriewerk bearbeiten' : 'Neues Galeriewerk anlegen'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="z.B. Sonnenuntergang am Meer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Künstler
              </label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({...formData, artist: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="z.B. Max Mustermann"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategorie
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="z.B. Landschaft, Portrait"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technik
              </label>
              <input
                type="text"
                value={formData.technique}
                onChange={(e) => setFormData({...formData, technique: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="z.B. Öl auf Leinwand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Breite (cm)
              </label>
              <input
                type="number"
                value={formData.width}
                onChange={(e) => setFormData({...formData, width: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Höhe (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jahr
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschreibung
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
              placeholder="Beschreiben Sie das Kunstwerk..."
            />
          </div>

          {/* Image Upload */}
          <div className="border-t border-gray-300 pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bild</h3>
            
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>
              
              <CldUploadWidget
                uploadPreset="gallery_preset"
                onSuccess={handleUploadSuccess}
                onError={() => {
                  alert('Fehler beim Hochladen');
                  setUploadingImage(false);
                }}
                options={{
                  maxFiles: 1,
                  resourceType: 'image',
                  clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                  maxFileSize: 10000000,
                  cropping: true,
                  croppingAspectRatio: 1.33,
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => {
                      setUploadingImage(true);
                      open();
                    }}
                    disabled={uploadingImage}
                    className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded flex items-center gap-2 disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader className="animate-spin" size={18} />
                        Upload...
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        Upload
                      </>
                    )}
                  </button>
                )}
              </CldUploadWidget>
            </div>

            {formData.image && (
              <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                <div className="flex justify-between mb-3">
                  <p className="text-sm font-medium text-gray-700">Vorschau:</p>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Entfernen
                  </button>
                </div>
                <div className="w-48 h-48 bg-white rounded border border-gray-200 overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Vorschau" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Featured Checkbox */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Als hervorgehoben markieren
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center gap-2"
            >
              {editingId ? <Save size={18} /> : <Plus size={18} />}
              {editingId ? 'Aktualisieren' : 'Anlegen'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded flex items-center gap-2"
              >
                <X size={18} />
                Abbrechen
              </button>
            )}
          </div>
        </form>
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
          <p className="text-gray-500 text-lg">Keine Galeriewerke gefunden</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200"
            >
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

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm flex items-center justify-center gap-1"
                  >
                    <Edit2 size={16} />
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
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