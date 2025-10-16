'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Save, X, Upload } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewGalleryItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .insert([{
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
        }]);

      if (error) throw error;

      alert('Galeriewerk erfolgreich angelegt!');
      router.push('/admin/gallery');
    } catch (error) {
      console.error('Error creating gallery item:', error);
      alert('Fehler beim Anlegen des Galeriewerks!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Neues Galeriewerk anlegen</h1>
          <p className="text-gray-600">🖼️ Kunstwerk nur zur Ansicht (nicht verkäuflich)</p>
        </div>
        <a
          href="/admin/gallery"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <X size={20} />
          Abbrechen
        </a>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titel <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
            placeholder="z.B. Sonnenuntergang am Meer (oder leer lassen)"
          />
        </div>

        {/* Artist */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Künstler <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
            placeholder="z.B. Max Mustermann"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategorie <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
            placeholder="z.B. Landschaft, Portrait, Abstrakt"
          />
        </div>

        {/* Dimensions */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Breite (cm) <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
              placeholder="z.B. 80"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Höhe (cm) <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
              placeholder="z.B. 60"
            />
          </div>
        </div>

        {/* Technique & Year */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technik <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              name="technique"
              value={formData.technique}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
              placeholder="z.B. Öl auf Leinwand"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jahr <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
              placeholder="z.B. 2024"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Beschreibung <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400"
            placeholder="Beschreiben Sie das Kunstwerk..."
          />
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bild <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          
          {/* Image URL Input */}
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 font-medium placeholder:text-gray-400 mb-3"
            placeholder="https://example.com/image.jpg"
          />

          {/* Upload Button */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer border border-gray-300">
              <Upload size={18} />
              <span className="text-sm font-medium">Bild hochladen</span>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  // Hier könnten Sie das Bild zu einem Service hochladen
                  // Für jetzt: Lokale Preview
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setFormData(prev => ({
                      ...prev,
                      image: event.target.result
                    }));
                  };
                  reader.readAsDataURL(file);
                }}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-500">
              oder URL oben eingeben
            </span>
          </div>

          {/* Preview */}
          {formData.image && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Vorschau:</p>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Entfernen
                </button>
              </div>
              <img 
                src={formData.image} 
                alt="Preview" 
                className="max-w-xs rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Featured */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Als hervorgehoben markieren
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Speichern...
              </>
            ) : (
              <>
                <Save size={20} />
                Galeriewerk speichern
              </>
            )}
          </button>
          <a
            href="/admin/gallery"
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
          >
            Abbrechen
          </a>
        </div>
      </form>

    </div>
  );
}