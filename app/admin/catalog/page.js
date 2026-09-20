'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { LogOut, Eye, Plus, Trash2, Edit2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { CATALOG_CATEGORIES } from '@/app/lib/catalogCategories';

// Umbrella genre terms — the professional vocabulary every catalog number
// is filed under. Shared with the shop form's Genre field so both always
// offer the same list — see app/lib/catalogCategories.js.
const CATEGORIES = CATALOG_CATEGORIES;

const STATUSES = [
  { value: 'catalog', label: 'Katalog (noch nicht im Shop)' },
  { value: 'listed', label: 'Im Shop gelistet' },
  { value: 'sold', label: 'Verkauft' },
  { value: 'archived', label: 'Archiviert' },
];

const CURRENT_YEAR = new Date().getFullYear();

// "Landscape" + 7 -> "Landscape 07"; "Landscape" + 107 -> "Landscape 107" —
// zero-pad to 2 digits, which naturally stops padding once numbers hit 100.
const displayName = (category, number) => `${category} NR ${String(number).padStart(2, '0')}`;

export default function AdminCatalogPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [nextNumber, setNextNumber] = useState(1);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(CURRENT_YEAR);
  const [status, setStatus] = useState('catalog');
  const [notes, setNotes] = useState('');
  const [productId, setProductId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
      fetchAll();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: catalogData, error: catalogError }, { data: productData, error: productError }] = await Promise.all([
      supabase.from('catalog').select('*').order('category', { ascending: true }).order('number', { ascending: true }),
      supabase.from('products').select('id, name, image').order('id', { ascending: true }),
    ]);

    if (catalogError) console.error('Error fetching catalog:', catalogError);
    if (productError) console.error('Error fetching products:', productError);

    setEntries(catalogData || []);
    setProducts(productData || []);
    setLoading(false);
  };

  // Recompute the next free number for the selected category whenever it
  // changes, or whenever the catalog list itself changes (new entry added).
  const refreshNextNumber = useCallback((cat, list) => {
    const highest = list
      .filter(e => e.category === cat)
      .reduce((max, e) => Math.max(max, e.number), 0);
    setNextNumber(highest + 1);
  }, []);

  useEffect(() => {
    refreshNextNumber(category, entries);
  }, [category, entries, refreshNextNumber]);

  const resetForm = () => {
    setTitle('');
    setYear(CURRENT_YEAR);
    setStatus('catalog');
    setNotes('');
    setProductId('');
    setImageUrl('');
    setEditingId(null);
  };

  const handleUploadSuccess = (result) => {
    setImageUrl(result.info.secure_url);
  };

  const handleUploadError = (error) => {
    console.error('Upload error:', error);
    alert('Bild-Upload fehlgeschlagen. Bitte versuche es erneut.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entryData = {
      category,
      title: title.trim() || null,
      year: year ? parseInt(year) : null,
      status,
      notes: notes.trim() || null,
      product_id: productId || null,
      image_url: imageUrl || null,
    };

    if (editingId) {
      const { error } = await supabase.from('catalog').update(entryData).eq('id', editingId);
      if (error) {
        console.error('Error updating catalog entry:', error);
        alert('Fehler beim Aktualisieren: ' + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from('catalog').insert([{ ...entryData, number: nextNumber }]);
      if (error) {
        console.error('Error adding catalog entry:', error);
        alert('Fehler beim Anlegen: ' + error.message);
        return;
      }
      alert(`Angelegt: ${displayName(category, nextNumber)}`);
    }
    resetForm();
    await fetchAll();
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setCategory(entry.category);
    setTitle(entry.title || '');
    setYear(entry.year || CURRENT_YEAR);
    setStatus(entry.status);
    setNotes(entry.notes || '');
    setProductId(entry.product_id || '');
    setImageUrl(entry.image_url || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Diesen Katalog-Eintrag wirklich löschen? Die Nummer wird danach nicht neu vergeben.')) return;
    const { error } = await supabase.from('catalog').delete().eq('id', id);
    if (error) {
      console.error('Error deleting catalog entry:', error);
      alert('Fehler beim Löschen: ' + error.message);
    } else {
      await fetchAll();
    }
  };

  const productName = (id) => products.find(p => p.id === id)?.name;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Authentifizierung wird geprüft...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Werkkatalog</h1>
            <p className="text-gray-600">Durchgängige Nummerierung pro Kategorie — keine Dopplungen möglich</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
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

        {/* Entry form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4">
            {editingId ? 'Eintrag bearbeiten' : 'Neuer Katalog-Eintrag'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategorie *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!!editingId}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 disabled:bg-gray-100"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nummer</label>
                <div className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 text-gray-900 font-medium">
                  {editingId
                    ? displayName(entries.find(e => e.id === editingId)?.category, entries.find(e => e.id === editingId)?.number)
                    : `${displayName(category, nextNumber)}  (nächste freie Nummer)`}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung <span className="text-gray-500 font-normal">(z.B. "Kirche mit Bäumen")</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="Kirche mit Bäumen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jahr</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                >
                  {STATUSES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop-Produkt verknüpfen <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <select
                  value={productId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setProductId(id);
                    // Reuse the shop product's own image instead of asking
                    // for a second upload of the same picture - but never
                    // clobber an image already chosen for this entry.
                    const linked = products.find(p => String(p.id) === id);
                    if (linked?.image && !imageUrl) setImageUrl(linked.image);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                >
                  <option value="">-- keine Verknüpfung --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notizen (optional)</label>
              <textarea
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Small reference thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kleines Bild <span className="text-gray-500 font-normal">(optional, für die Übersicht unten)</span>
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>
                <CldUploadWidget
                  uploadPreset="zak_gallery"
                  cloudName="dhjcx2xdd"
                  options={{ folder: 'catalog', tags: ['catalog'], multiple: false, maxFiles: 1 }}
                  onSuccess={handleUploadSuccess}
                  onError={handleUploadError}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded flex items-center gap-2 whitespace-nowrap"
                    >
                      <Upload size={18} />
                      Hochladen
                    </button>
                  )}
                </CldUploadWidget>
              </div>
              {imageUrl && (
                <div className="mt-3 w-20 h-20 border border-gray-300 rounded overflow-hidden bg-gray-100">
                  <img src={imageUrl} alt="Vorschau" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center gap-2"
              >
                {editingId ? <Save size={18} /> : <Plus size={18} />}
                {editingId ? 'Eintrag aktualisieren' : `Anlegen als ${displayName(category, nextNumber)}`}
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

        {/* List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <h2 className="text-xl font-light text-gray-900 p-6 pb-0">
            Katalog ({entries.length})
          </h2>
          {loading ? (
            <p className="p-6 text-gray-600">Lädt...</p>
          ) : entries.length === 0 ? (
            <p className="p-6 text-gray-600">Noch keine Einträge.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 mt-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bild</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nummer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beschreibung</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jahr</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop-Produkt</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.image_url ? (
                        <img src={entry.image_url} alt={displayName(entry.category, entry.number)} className="w-12 h-12 object-cover rounded border border-gray-200" />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center rounded border border-gray-200 bg-gray-50 text-gray-300">
                          <ImageIcon size={18} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {displayName(entry.category, entry.number)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{entry.title || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.year || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {STATUSES.find(s => s.value === entry.status)?.label || entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {productName(entry.product_id) || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="p-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded"
                          title="Bearbeiten"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="p-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-red-100 transition rounded"
                          title="Löschen"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
