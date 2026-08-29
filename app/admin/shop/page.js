'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Plus, Save, X, Upload, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { CldUploadWidget, getCldImageUrl } from 'next-cloudinary';
import { getActiveOffer, getStockInfo } from '@/app/lib/offers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Predefined size formats with cm and inch
const SIZE_FORMATS = [
  { label: '20 × 20 cm (7.9 × 7.9 in)', value: '20 × 20 cm (7.9 × 7.9 in)', width: 20, height: 20 },
  { label: '24 × 18 cm (9.4 × 7.1 in)', value: '24 × 18 cm (9.4 × 7.1 in)', width: 24, height: 18 },
  { label: '30 × 24 cm (11.8 × 9.4 in)', value: '30 × 24 cm (11.8 × 9.4 in)', width: 30, height: 24 },
  { label: '30 × 30 cm (11.8 × 11.8 in)', value: '30 × 30 cm (11.8 × 11.8 in)', width: 30, height: 30 },
  { label: '30 × 40 cm (11.8 × 15.7 in)', value: '30 × 40 cm (11.8 × 15.7 in)', width: 30, height: 40 },
  { label: '40 × 20 cm (15.7 × 7.9 in)', value: '40 × 20 cm (15.7 × 7.9 in)', width: 40, height: 20 },
  { label: '40 × 30 cm (15.7 × 11.8 in)', value: '40 × 30 cm (15.7 × 11.8 in)', width: 40, height: 30 },
  { label: '40 × 40 cm (15.7 × 15.7 in)', value: '40 × 40 cm (15.7 × 15.7 in)', width: 40, height: 40 },
  { label: '50 × 40 cm (19.7 × 15.7 in)', value: '50 × 40 cm (19.7 × 15.7 in)', width: 50, height: 40 },
  { label: '50 × 50 cm (19.7 × 19.7 in)', value: '50 × 50 cm (19.7 × 19.7 in)', width: 50, height: 50 },
  { label: '50 × 70 cm (19.7 × 27.6 in)', value: '50 × 70 cm (19.7 × 27.6 in)', width: 50, height: 70 },
  { label: '60 × 40 cm (23.6 × 15.7 in)', value: '60 × 40 cm (23.6 × 15.7 in)', width: 60, height: 40 },
  { label: '60 × 60 cm (23.6 × 23.6 in)', value: '60 × 60 cm (23.6 × 23.6 in)', width: 60, height: 60 },
  { label: '70 × 50 cm (27.6 × 19.7 in)', value: '70 × 50 cm (27.6 × 19.7 in)', width: 70, height: 50 },
  { label: '80 × 60 cm (31.5 × 23.6 in)', value: '80 × 60 cm (31.5 × 23.6 in)', width: 80, height: 60 },
  { label: '80 × 80 cm (31.5 × 31.5 in)', value: '80 × 80 cm (31.5 × 31.5 in)', width: 80, height: 80 },
  { label: '90 × 60 cm (35.4 × 23.6 in)', value: '90 × 60 cm (35.4 × 23.6 in)', width: 90, height: 60 },
  { label: '100 × 60 cm (39.4 × 23.6 in)', value: '100 × 60 cm (39.4 × 23.6 in)', width: 100, height: 60 },
  { label: '100 × 70 cm (39.4 × 27.6 in)', value: '100 × 70 cm (39.4 × 27.6 in)', width: 100, height: 70 },
  { label: '100 × 80 cm (39.4 × 31.5 in)', value: '100 × 80 cm (39.4 × 31.5 in)', width: 100, height: 80 },
  { label: '100 × 100 cm (39.4 × 39.4 in)', value: '100 × 100 cm (39.4 × 39.4 in)', width: 100, height: 100 },
  { label: '120 × 80 cm (47.2 × 31.5 in)', value: '120 × 80 cm (47.2 × 31.5 in)', width: 120, height: 80 },
  { label: '120 × 100 cm (47.2 × 39.4 in)', value: '120 × 100 cm (47.2 × 39.4 in)', width: 120, height: 100 },
  { label: '150 × 100 cm (59.1 × 39.4 in)', value: '150 × 100 cm (59.1 × 39.4 in)', width: 150, height: 100 },
  { label: '200 × 150 cm (78.7 × 59.1 in)', value: '200 × 150 cm (78.7 × 59.1 in)', width: 200, height: 150 },
  { label: 'Benutzerdefiniert / Custom', value: 'custom', width: 0, height: 0 },
];

// Categories with German translation
const CATEGORIES = [
  'Originals',
  'Prints',
];

// Techniques with German translation
const TECHNIQUES = [
  'Oil on Canvas (Öl auf Leinwand)',
  'Oil Pastel on Handmade Paper with Deckle Edge, A3, 640gsm (Ölpastell auf handgeschöpftem Papier mit Büttenrand, A3, 640g/m²)',
  'Oil Pastel on Handmade Paper with Deckle Edge, A4, 150gsm (Ölpastell auf handgeschöpftem Papier mit Büttenrand, A4, 150g/m²)',
  'Mixed Media on Paper (Mixed Media auf Papier)',
  'Charcoal on Paper, 180gsm (Kohle auf Papier, 180g/m²)',
  'Oil Pastel on 100% Cotton Rag Paper – Handmade, A2, 250gsm, Deckle Edge (Ölpastell auf 100% Baumwoll-Rag-Papier – Handarbeit, A2, 250g/m², Büttenrand)',
  'Oil Pastel on 100% Cotton Rag Paper – Handmade, 45 × 30 cm, 250gsm, Cut Edge (Ölpastell auf 100% Baumwoll-Rag-Papier – Handarbeit, 45 × 30 cm, 250g/m², Glatter Rand)',
];

// Fixed artist name
const ARTIST_NAME = 'Manfred Zak';

// Current year for validation
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 2004;
const MAX_PRICE = 10000;
const MAX_SIZE_CM = 500;

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    artist: ARTIST_NAME,
    price: '',
    category: 'Originals',
    size: '',
    technique: TECHNIQUES[0],
    year: CURRENT_YEAR,
    image: '',
    detail_image: '',
    thumbnail_image: '',
    description: '',
    available: true,
    sold: false,
    offline: false,
    sale_price: '',
    sale_end_date: '',
    edition_size: '',
    stock_quantity: '',
  });

  // Check authentication
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
      fetchProducts();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchProducts();
    }
  }, [authLoading]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } else {
      console.log('Fetched products:', data);
      setProducts(data || []);
    }
    setLoading(false);
  };

  // Convert an ISO date string to the "YYYY-MM-DDTHH:mm" format expected by <input type="datetime-local">
  const toDatetimeLocal = (isoString) => {
    const d = new Date(isoString);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Convert cm to inch and format size string
  const formatSizeString = (widthCm, heightCm) => {
    const widthIn = (widthCm / 2.54).toFixed(1);
    const heightIn = (heightCm / 2.54).toFixed(1);
    return `${widthCm} × ${heightCm} cm (${widthIn} × ${heightIn} in)`;
  };

  // Handle size dropdown change
  const handleSizeChange = (value) => {
    setSelectedSize(value);
    if (value === 'custom') {
      setFormData({ ...formData, size: '' });
    } else {
      setFormData({ ...formData, size: value });
    }
  };

  // Handle custom size input
  const handleCustomSizeChange = (width, height) => {
    const w = parseInt(width) || 0;
    const h = parseInt(height) || 0;
    if (w > 0 && h > 0 && w <= MAX_SIZE_CM && h <= MAX_SIZE_CM) {
      const sizeString = formatSizeString(w, h);
      setFormData({ ...formData, size: sizeString });
    } else {
      setFormData({ ...formData, size: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (parseFloat(formData.price) > MAX_PRICE) {
      alert(`Preis darf maximal €${MAX_PRICE.toLocaleString()} sein!`);
      return;
    }

    if (parseInt(formData.year) < MIN_YEAR || parseInt(formData.year) > CURRENT_YEAR) {
      alert(`Jahr muss zwischen ${MIN_YEAR} und ${CURRENT_YEAR} sein!`);
      return;
    }

    if (!formData.size) {
      alert('Bitte wähle eine Größe aus!');
      return;
    }

    if (formData.sale_price && parseFloat(formData.sale_price) >= parseFloat(formData.price)) {
      alert('Der Angebotspreis muss niedriger als der reguläre Preis sein!');
      return;
    }

    if ((formData.sale_price && !formData.sale_end_date) || (!formData.sale_price && formData.sale_end_date)) {
      alert('Für ein Angebot bitte sowohl Angebotspreis als auch Enddatum angeben!');
      return;
    }

    const productData = {
      name: formData.name,
      artist: ARTIST_NAME, // Always use fixed artist name
      price: parseFloat(formData.price),
      category: formData.category,
      size: formData.size,
      technique: formData.technique,
      year: parseInt(formData.year),
      image: formData.image,
      detail_image: formData.detail_image || null,
      thumbnail_image: formData.thumbnail_image || null,
      description: formData.description,
      available: formData.available,
      sold: formData.sold,
      offline: formData.offline,
      sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
      sale_end_date: formData.sale_end_date ? new Date(formData.sale_end_date).toISOString() : null,
      edition_size: formData.category === 'Prints' && formData.edition_size ? parseInt(formData.edition_size) : null,
      stock_quantity: formData.category === 'Prints' && formData.stock_quantity !== '' ? parseInt(formData.stock_quantity) : null,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingId)
        .select();

      if (error) {
        console.error('Error updating product:', error);
        alert('Error updating product: ' + error.message);
      } else {
        console.log('Update successful:', data);
        alert('Produkt erfolgreich aktualisiert!');
        setEditingId(null);
        resetForm();
        await fetchProducts();
      }
    } else {
      const maxOrder = products.reduce((max, p) => Math.max(max, p.sort_order ?? p.id ?? 0), 0);
      const { data, error } = await supabase
        .from('products')
        .insert([{ ...productData, sort_order: maxOrder + 1 }])
        .select();

      if (error) {
        console.error('Error adding product:', error);
        alert('Error adding product: ' + error.message);
      } else {
        console.log('Insert successful:', data);
        alert('Produkt erfolgreich hinzugefügt!');
        resetForm();
        await fetchProducts();
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    
    // Check if the size matches a predefined format
    const matchingSize = SIZE_FORMATS.find(f => f.value === product.size);
    if (matchingSize) {
      setSelectedSize(product.size);
    } else {
      setSelectedSize('custom');
      // Try to parse custom size
      const match = product.size.match(/(\d+)\s*×\s*(\d+)/);
      if (match) {
        setCustomWidth(match[1]);
        setCustomHeight(match[2]);
      }
    }

    setFormData({
      name: product.name,
      artist: ARTIST_NAME,
      price: product.price.toString(),
      category: product.category,
      size: product.size,
      technique: product.technique || TECHNIQUES[0],
      year: product.year,
      image: product.image,
      detail_image: product.detail_image || '',
      thumbnail_image: product.thumbnail_image || '',
      description: product.description,
      available: product.available !== false,
      sold: product.sold === true,
      offline: product.offline === true,
      sale_price: product.sale_price != null ? String(product.sale_price) : '',
      sale_end_date: product.sale_end_date ? toDatetimeLocal(product.sale_end_date) : '',
      edition_size: product.edition_size != null ? String(product.edition_size) : '',
      stock_quantity: product.stock_quantity != null ? String(product.stock_quantity) : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleOffline = async (product) => {
    const { error } = await supabase
      .from('products')
      .update({ offline: !product.offline })
      .eq('id', product.id);

    if (error) {
      console.error('Error toggling offline status:', error);
      alert('Error: ' + error.message);
    } else {
      await fetchProducts();
    }
  };

  const handleMove = async (product, direction) => {
    const index = products.findIndex((p) => p.id === product.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= products.length) return;

    const other = products[swapIndex];
    const currentOrder = product.sort_order ?? product.id;
    const otherOrder = other.sort_order ?? other.id;

    const [{ error: error1 }, { error: error2 }] = await Promise.all([
      supabase.from('products').update({ sort_order: otherOrder }).eq('id', product.id),
      supabase.from('products').update({ sort_order: currentOrder }).eq('id', other.id),
    ]);

    if (error1 || error2) {
      console.error('Error reordering products:', error1 || error2);
      alert('Error: ' + (error1 || error2).message);
    } else {
      await fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bist du sicher, dass du dieses Produkt löschen möchtest?')) return;

    console.log('Attempting to delete product ID:', id);

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select();

    console.log('Delete response:', { data, error });

    if (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product: ' + error.message);
    } else {
      console.log('Delete successful, refreshing...');
      alert('Produkt erfolgreich gelöscht!');
      await fetchProducts();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      artist: ARTIST_NAME,
      price: '',
      category: 'Originals',
      size: '',
      technique: TECHNIQUES[0],
      year: CURRENT_YEAR,
      image: '',
      detail_image: '',
      thumbnail_image: '',
      description: '',
      available: true,
      sold: false,
      offline: false,
      sale_price: '',
      sale_end_date: '',
      edition_size: '',
      stock_quantity: '',
    });
    setSelectedSize('');
    setCustomWidth('');
    setCustomHeight('');
    setEditingId(null);
  };

  const handleUploadError = (error) => {
    console.error('Upload error:', error);
    alert('Bild-Upload fehlgeschlagen. Bitte versuche es erneut.');
  };

  const handleUploadSuccess = (result) => {
    console.log('Upload successful:', result);
    setFormData(prevFormData => ({
      ...prevFormData,
      image: result.info.secure_url
    }));
  };

  const handleDetailUploadSuccess = (result) => {
    console.log('Detail upload successful:', result);
    setFormData(prevFormData => ({
      ...prevFormData,
      detail_image: result.info.secure_url
    }));
  };

  const handleThumbnailUploadSuccess = (result) => {
    console.log('Thumbnail upload successful:', result);
    const customCoords = result.info.coordinates?.custom?.[0];
    const thumbnailUrl = customCoords
      ? getCldImageUrl({
          src: result.info.public_id,
          crop: 'crop',
          gravity: 'custom',
          x: customCoords[0],
          y: customCoords[1],
          width: customCoords[2],
          height: customCoords[3],
        })
      : result.info.secure_url;
    setFormData(prevFormData => ({
      ...prevFormData,
      thumbnail_image: thumbnailUrl
    }));
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Authentifizierung wird geprüft...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Produkte werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Produkt-Verwaltung</h1>
            <p className="text-gray-600">Füge Produkte hinzu, bearbeite oder lösche sie</p>
          </div>
          <span className="text-sm text-gray-600">
            Angemeldet als: {user?.email}
          </span>
        </div>

        {/* Product Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4">
            {editingId ? 'Produkt bearbeiten' : 'Neues Produkt hinzufügen'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel / Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="Uckermark Sunset"
                />
              </div>

              {/* Artist Name - Fixed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Künstler
                </label>
                <input
                  type="text"
                  value={ARTIST_NAME}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preis (€) * <span className="text-gray-500 font-normal">(max {MAX_PRICE.toLocaleString()}€)</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={MAX_PRICE}
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="890"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorie *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Size Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Größe *
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => handleSizeChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                >
                  <option value="">-- Größe wählen --</option>
                  {SIZE_FORMATS.map(size => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>

              {/* Custom Size Fields - only show when custom is selected */}
              {selectedSize === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benutzerdefinierte Größe (cm) <span className="text-gray-500 font-normal">(max {MAX_SIZE_CM}cm)</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      min="1"
                      max={MAX_SIZE_CM}
                      value={customWidth}
                      onChange={(e) => {
                        setCustomWidth(e.target.value);
                        handleCustomSizeChange(e.target.value, customHeight);
                      }}
                      className="w-24 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      placeholder="Breite"
                    />
                    <span className="text-gray-500">×</span>
                    <input
                      type="number"
                      min="1"
                      max={MAX_SIZE_CM}
                      value={customHeight}
                      onChange={(e) => {
                        setCustomHeight(e.target.value);
                        handleCustomSizeChange(customWidth, e.target.value);
                      }}
                      className="w-24 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      placeholder="Höhe"
                    />
                    <span className="text-gray-500">cm</span>
                  </div>
                  {formData.size && (
                    <p className="text-sm text-gray-900 mt-1">→ {formData.size}</p>
                  )}
                </div>
              )}

              {/* Technique Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technik *
                </label>
                <select
                  value={formData.technique}
                  onChange={(e) => setFormData({...formData, technique: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                >
                  {TECHNIQUES.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jahr * <span className="text-gray-500 font-normal">({MIN_YEAR} - {CURRENT_YEAR})</span>
                </label>
                <input
                  type="number"
                  required
                  min={MIN_YEAR}
                  max={CURRENT_YEAR}
                  step="1"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-gray-300 pt-4 space-y-3">
              <div>
                <label className="flex items-center gap-2 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    checked={!formData.available}
                    onChange={(e) => setFormData({ ...formData, available: !e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Nicht verfügbar / Not available
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Werk bleibt sichtbar, kann aber nicht gekauft werden. / Artwork stays visible but can&apos;t be purchased.
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    checked={formData.sold}
                    onChange={(e) => setFormData({ ...formData, sold: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Verkauft / Sold
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Werk bleibt sichtbar, zeigt aber "Verkauft" statt "Nicht verfügbar". / Artwork stays visible but shows "Sold" instead of "Not available".
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    checked={formData.offline}
                    onChange={(e) => setFormData({ ...formData, offline: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Offline / Im Shop ausblenden
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Werk wird komplett aus Shop und Startseite entfernt (nicht gelöscht). Einfach wieder online nehmen, um es zurückzuholen. / Artwork is completely hidden from shop and homepage (not deleted). Toggle back online anytime.
                </p>
              </div>
            </div>

            {/* Offer / Countdown */}
            <div className="border-t border-gray-300 pt-6 mt-2">
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Angebot (optional)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Setze einen befristeten Angebotspreis mit Countdown. Beide Felder werden zusammen benötigt.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Angebotspreis (€)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={MAX_PRICE}
                    step="1"
                    value={formData.sale_price}
                    onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="z.B. 690"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Angebot endet am
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.sale_end_date}
                    onChange={(e) => setFormData({ ...formData, sale_end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
              {formData.sale_price && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, sale_price: '', sale_end_date: '' })}
                  className="text-sm text-gray-600 hover:text-gray-900 underline mt-2"
                >
                  Angebot entfernen
                </button>
              )}
            </div>

            {/* Stock / Edition (Prints only) */}
            {formData.category === 'Prints' && (
              <div className="border-t border-gray-300 pt-6 mt-2">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Auflage &amp; Stückzahl (nur Prints)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Trage die verfügbare Restmenge ein, um "Nur noch X verfügbar" im Shop anzuzeigen. Bei 0 gilt der Print als ausverkauft.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verfügbare Stückzahl
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      placeholder="z.B. 12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gesamte Auflage (optional)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={formData.edition_size}
                      onChange={(e) => setFormData({ ...formData, edition_size: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      placeholder="z.B. 50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Image Upload Section */}
            <div className="border-t border-gray-300 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Produktbild *
              </h3>
              
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bild URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>
                
                <div className="pt-7">
                  <CldUploadWidget
                    uploadPreset="zak_gallery"
                    cloudName="dhjcx2xdd"
                    options={{
                      folder: "shop",
                      tags: ["product", "shop"],
                      multiple: false,
                      maxFiles: 1
                    }}
                    onSuccess={handleUploadSuccess}
                    onError={handleUploadError}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded flex items-center gap-2"
                      >
                        <Upload size={18} />
                        Bild hochladen
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Vorschau:</p>
                  <div className="w-48 h-48 border border-gray-300 rounded overflow-hidden bg-gray-100">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-600 mt-2">
                💡 Klicke auf "Bild hochladen" oder füge eine URL manuell ein
              </p>
            </div>

            {/* Detail/Close-up Image Upload Section */}
            <div className="border-t border-gray-300 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Nahaufnahme / Detailbild (optional)
              </h3>

              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bild URL
                  </label>
                  <input
                    type="url"
                    value={formData.detail_image}
                    onChange={(e) => setFormData({...formData, detail_image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>

                <div className="pt-7">
                  <CldUploadWidget
                    uploadPreset="zak_gallery"
                    cloudName="dhjcx2xdd"
                    options={{
                      folder: "shop/detail",
                      tags: ["product", "shop", "detail"],
                      multiple: false,
                      maxFiles: 1
                    }}
                    onSuccess={handleDetailUploadSuccess}
                    onError={handleUploadError}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded flex items-center gap-2"
                      >
                        <Upload size={18} />
                        Bild hochladen
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              {formData.detail_image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Vorschau:</p>
                  <div className="w-48 h-48 border border-gray-300 rounded overflow-hidden bg-gray-100">
                    <img
                      src={formData.detail_image}
                      alt="Detail Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-600 mt-2">
                💡 Wird im Shop unterhalb des Hauptbilds angezeigt, z.B. eine Nahaufnahme der Maloberfläche/Textur.
              </p>
            </div>

            {/* Thumbnail Image Upload Section */}
            <div className="border-t border-gray-300 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Eigenes Thumbnail (optional)
              </h3>

              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bild URL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail_image}
                    onChange={(e) => setFormData({...formData, thumbnail_image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>

                <div className="pt-7">
                  <CldUploadWidget
                    uploadPreset="zak_gallery"
                    cloudName="dhjcx2xdd"
                    options={{
                      folder: "shop/thumbnail",
                      tags: ["product", "shop", "thumbnail"],
                      multiple: false,
                      maxFiles: 1,
                      cropping: true,
                      croppingAspectRatio: 1,
                      croppingShowDimensions: true,
                      croppingDefaultSelectionRatio: 1,
                    }}
                    onSuccess={handleThumbnailUploadSuccess}
                    onError={handleUploadError}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded flex items-center gap-2"
                      >
                        <Upload size={18} />
                        Bild hochladen &amp; zuschneiden
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              {formData.thumbnail_image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Vorschau:</p>
                  <div className="w-48 h-48 border border-gray-300 rounded overflow-hidden bg-gray-100">
                    <img
                      src={formData.thumbnail_image}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-600 mt-2">
                💡 Wird im Shop-Grid und auf der Startseite anstelle des Hauptbilds gezeigt (z.B. ohne Büttenrand). Ohne eigenes Thumbnail wird automatisch das Hauptbild verwendet. Beim Hochladen kannst du den Ausschnitt direkt wählen.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung *
              </label>
              <textarea
                required
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="Eine atmosphärische Darstellung der Uckermark..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center gap-2"
              >
                {editingId ? <Save size={18} /> : <Plus size={18} />}
                {editingId ? 'Produkt aktualisieren' : 'Produkt hinzufügen'}
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

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-light text-gray-900 mb-4">
            Aktuelle Produkte ({products.length})
          </h2>
          
          {products.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Noch keine Produkte. Füge dein erstes Produkt oben hinzu.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div key={product.id} className={`border border-gray-200 rounded-lg overflow-hidden ${product.offline ? 'opacity-50' : ''}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.offline ? (
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-gray-800 text-white text-xs font-medium">
                        Offline
                      </div>
                    ) : product.sold === true ? (
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-red-600 text-white text-xs font-medium">
                        Verkauft / Sold
                      </div>
                    ) : product.available === false && (
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-red-600 text-white text-xs font-medium">
                        Nicht verfügbar / Not available
                      </div>
                    )}
                    {getActiveOffer(product) && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-amber-600 text-white text-xs font-medium">
                        Angebot
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{product.artist}</p>
                    <p className="text-xs text-gray-500 mb-2">{product.size}</p>
                    {(() => {
                      const offer = getActiveOffer(product);
                      const stock = getStockInfo(product);
                      return (
                        <>
                          <p className="text-lg font-light text-gray-900 mb-1">
                            {offer && (
                              <span className="text-sm text-gray-400 line-through mr-2">
                                €{product.price.toLocaleString()}
                              </span>
                            )}
                            €{(offer ? offer.price : product.price).toLocaleString()}
                          </p>
                          {offer && (
                            <p className="text-xs text-amber-700 mb-2">
                              Angebot bis {offer.endDate.toLocaleString('de-DE')}
                            </p>
                          )}
                          {stock && (
                            <p className={`text-xs mb-2 ${stock.isOutOfStock ? 'text-red-600' : 'text-gray-600'}`}>
                              {stock.isOutOfStock
                                ? 'Ausverkauft'
                                : `Auf Lager: ${stock.quantity}${stock.editionSize ? ` von ${stock.editionSize}` : ''}`}
                            </p>
                          )}
                          {!offer && !stock && <div className="mb-3" />}
                        </>
                      );
                    })()}
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => handleMove(product, 'up')}
                        disabled={index === 0}
                        className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Nach oben"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        onClick={() => handleMove(product, 'down')}
                        disabled={index === products.length - 1}
                        className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Nach unten"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => handleToggleOffline(product)}
                        className={`flex-1 px-3 py-2 border transition rounded text-sm flex items-center justify-center gap-2 ${
                          product.offline
                            ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {product.offline ? 'Online stellen' : 'Offline nehmen'}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded text-sm flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-red-100 transition rounded text-sm flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}