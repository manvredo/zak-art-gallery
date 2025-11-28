'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Save, Upload, Eye, LogOut } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminVitaPage() {
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    photo: '',
    born: '',
    location: '',
    bio: '',
    statement: '',
    education: ''
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/admin/login');
        return;
      }

      setUser(user);
      setAuthLoading(false);
      fetchVita();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchVita = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vita')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
        throw error;
      }

      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching vita:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Prüfe ob bereits ein Eintrag existiert
      const { data: existing } = await supabase
        .from('vita')
        .select('id')
        .single();

      if (existing) {
        // Update
        const { error } = await supabase
          .from('vita')
          .update({
            name: formData.name,
            title: formData.title,
            photo: formData.photo || null,
            born: formData.born || null,
            location: formData.location || null,
            bio: formData.bio,
            statement: formData.statement,
            education: formData.education || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('vita')
          .insert([{
            name: formData.name,
            title: formData.title,
            photo: formData.photo || null,
            born: formData.born || null,
            location: formData.location || null,
            bio: formData.bio,
            statement: formData.statement,
            education: formData.education || null
          }]);

        if (error) throw error;
      }

      alert('Vita erfolgreich gespeichert!');
      await fetchVita();
    } catch (error) {
      console.error('Error saving vita:', error);
      alert('Fehler beim Speichern: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = (result) => {
    setFormData(prev => ({
      ...prev,
      photo: result.info.secure_url
    }));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Vita bearbeiten</h1>
            <p className="text-gray-600">Künstler-Biografie verwalten</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/vita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
            >
              <Eye size={18} />
              Vorschau
            </a>
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-4">Grundinformationen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="ZAK"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Zeitgenössischer Künstler"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Geboren
                </label>
                <input
                  type="text"
                  value={formData.born}
                  onChange={(e) => setFormData({...formData, born: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="1985"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lebt & arbeitet in
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Berlin, Deutschland"
                />
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Künstlerfoto</h2>
            
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({...formData, photo: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>
              
              <CldUploadWidget
                uploadPreset="zak_gallery"
                cloudName="dhjcx2xdd"
                options={{
                  folder: "vita",
                  tags: ["vita", "artist"],
                  multiple: false,
                  maxFiles: 1
                }}
                onSuccess={handlePhotoUpload}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded flex items-center gap-2"
                  >
                    <Upload size={18} />
                    Upload
                  </button>
                )}
              </CldUploadWidget>
            </div>

            {formData.photo && (
              <div className="mt-4">
                <div className="w-full max-w-sm aspect-square border border-gray-300 rounded overflow-hidden bg-gray-100">
                  <img 
                    src={formData.photo} 
                    alt="Künstlerfoto" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Artist Statement */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Artist Statement *</h2>
            <p className="text-sm text-gray-600 mb-3">Das Zitat, das prominent oben angezeigt wird</p>
            <textarea
              required
              rows="4"
              value={formData.statement}
              onChange={(e) => setFormData({...formData, statement: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Kunst ist für mich mehr als nur Farbe auf Leinwand..."
            />
            <p className="text-xs text-gray-500 mt-1">💡 Einfacher Text, kein HTML nötig</p>
          </div>

          {/* Biography */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Biografie * (HTML möglich)</h2>
            <textarea
              required
              rows="12"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono text-sm"
              placeholder="<p>Seit über einem Jahrzehnt widme ich mich der zeitgenössischen Kunst...</p>"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 HTML-Tags: &lt;p&gt;Text&lt;/p&gt; | &lt;strong&gt;fett&lt;/strong&gt; | &lt;em&gt;kursiv&lt;/em&gt;
            </p>
          </div>

          {/* Education */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Ausbildung (HTML)</h2>
            <p className="text-sm text-gray-600 mb-3">Formatierter HTML-Code für die Ausbildungszeitleiste</p>
            <textarea
              rows="10"
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono text-sm"
              placeholder={`<div class="space-y-4">
  <div class="border-l-2 border-gray-300 pl-4">
    <p class="text-sm text-gray-500">2010-2014</p>
    <p class="font-medium text-gray-900">Studium der Bildenden Künste</p>
    <p class="text-sm text-gray-600">Universität der Künste Berlin</p>
  </div>
</div>`}
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Kopiere das Beispiel-Format und passe es an
            </p>
          </div>

          {/* Live Preview */}
          {formData.statement && formData.bio && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">👁️ Live-Vorschau</h2>
              
              {/* Statement Preview */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                <p className="text-lg font-light text-gray-800 leading-relaxed italic">
                  {formData.statement}
                </p>
              </div>

              {/* Bio Preview */}
              <div className="bg-white border border-gray-300 rounded-lg p-6">
                <h3 className="text-xl font-light text-gray-900 mb-4">Biografie</h3>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formData.bio }}
                />
              </div>

              {/* Education Preview */}
              {formData.education && (
                <div className="bg-white border border-gray-300 rounded-lg p-6 mt-4">
                  <h3 className="text-xl font-light text-gray-900 mb-4">Ausbildung</h3>
                  <div dangerouslySetInnerHTML={{ __html: formData.education }} />
                </div>
              )}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={18} />
              {saving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}