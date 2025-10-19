'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Save, X, Upload, ImageIcon, Loader } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewGalleryItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bild <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          
          {/* Cloudinary Upload Widget */}
          <CldUploadWidget
            uploadPreset="gallery_preset"
            onSuccess={(result, { widget }) => {
              console.log('Upload erfolgt:', result);
              
              // Cloudinary gibt verschiedene Result-Strukturen zurück
              let imageUrl = '';
              
              if (typeof result === 'string') {
                imageUrl = result;
              } else if (result?.event === 'success') {
                imageUrl = result.info?.secure_url || result.info?.url;
              } else if (result?.secure_url) {
                imageUrl = result.secure_url;
              } else if (result?.url) {
                imageUrl = result.url;
              } else if (result?.info?.secure_url) {
                imageUrl = result.info.secure_url;
              }
              
              console.log('Finale URL:', imageUrl);
              
              if (imageUrl) {
                setFormData(prev => ({
                  ...prev,
                  image: imageUrl
                }));
                widget.close();
              } else {
                console.error('URL-Extraktion fehlgeschlagen:', result);
              }
            }} // Sie müssen diesen in Cloudinary erstellen
            options={{
              maxFiles: 1,
              resourceType: 'image',
              clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
              maxFileSize: 10000000, // 10MB
              cropping: true,
              croppingAspectRatio: 1.33,
              sources: ['local', 'url', 'camera'],
              multiple: false,
              styles: {
                palette: {
                  window: "#FFFFFF",
                  windowBorder: "#E5E7EB",
                  tabIcon: "#111827",
                  menuIcons: "#6B7280",
                  textDark: "#111827",
                  textLight: "#6B7280",
                  theme: "white",
                  link: "#111827",
                  action: "#111827",
                  inactiveTabIcon: "#9CA3AF",
                  error: "#EF4444",
                  inProgress: "#3B82F6",
                  complete: "#10B981",
                  sourceBg: "#F9FAFB"
                }
              },
              language: 'de',
              text: {
                de: {
                  or: 'Oder',
                  back: 'Zurück',
                  advanced: 'Erweitert',
                  close: 'Schließen',
                  no_results: 'Keine Ergebnisse',
                  search_placeholder: 'Suche...',
                  about_uw: 'Über Upload Widget',
                  menu: {
                    files: 'Meine Dateien',
                    web: 'Web Adresse',
                    camera: 'Kamera',
                  },
                  local: {
                    browse: 'Durchsuchen',
                    main_title: 'Dateien hochladen',
                    dd_title_single: 'Ziehen Sie eine Datei hierher',
                    dd_title_multi: 'Ziehen Sie Dateien hierher',
                  },
                  url: {
                    main_title: 'Bild-URL eingeben',
                    input_placeholder: 'https://beispiel.de/bild.jpg'
                  },
                  camera: {
                    capture: 'Foto aufnehmen',
                    retry: 'Wiederholen'
                  }
                }
              }
            }}
            onUpload={(result) => {
              console.log('Upload started:', result);
              setUploadingImage(true);
            }}
            onSuccess={(result) => {
              console.log('Upload success - Full result:', result);
              console.log('Result info:', result?.info);
              
              // Verschiedene Wege, die URL zu bekommen
              const imageUrl = result?.info?.secure_url || 
                             result?.info?.url || 
                             result?.url ||
                             result?.secure_url;
              
              console.log('Extracted URL:', imageUrl);
              
              if (imageUrl) {
                setFormData(prev => ({
                  ...prev,
                  image: imageUrl
                }));
                console.log('Image URL set in formData:', imageUrl);
              } else {
                console.error('Keine URL im Result gefunden!', result);
                alert('Bild wurde hochgeladen, aber URL konnte nicht extrahiert werden.');
              }
              setUploadingImage(false);
            }}
            onError={(error) => {
              console.error('Upload error:', error);
              alert('Fehler beim Hochladen des Bildes');
              setUploadingImage(false);
            }}
          >
            {({ open }) => (
              <div className="space-y-3">
                {/* Upload Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={open}
                    disabled={uploadingImage}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader className="animate-spin" size={18} />
                        <span>Wird hochgeladen...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        <span>Bild hochladen</span>
                      </>
                    )}
                  </button>
                  
                  <span className="text-sm text-gray-500">
                    JPG, PNG, WebP bis 10MB
                  </span>
                </div>

                {/* Alternative: Direct URL Input */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">oder</span>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm placeholder:text-gray-400"
                    placeholder="Bild-URL direkt eingeben: https://..."
                  />
                </div>
              </div>
            )}
          </CldUploadWidget>

          {/* Image Preview */}
          {formData.image && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">Bildvorschau:</p>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Bild entfernen
                </button>
              </div>
              <div className="relative aspect-[4/3] max-w-md mx-auto bg-white rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={formData.image} 
                  alt="Vorschau" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gray-100"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Bild kann nicht geladen werden</p>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center break-all">
                {formData.image}
              </p>
            </div>
          )}
        </div>

        {/* Featured Checkbox */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">
                Als hervorgehoben markieren
              </span>
              <p className="text-xs text-gray-500">
                Wird prominent auf der Startseite angezeigt
              </p>
            </div>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Wird gespeichert...
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