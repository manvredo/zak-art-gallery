"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Edit2, Plus, Save, X, Upload } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    artist: '',
    year: new Date().getFullYear()
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const imageData = {
      image: formData.image,
      title: formData.title || null,
      description: formData.description || null,
      artist: formData.artist || null,
      year: formData.year || null
    };

    if (editingId) {
      const { error } = await supabase
        .from('gallery_images')
        .update(imageData)
        .eq('id', editingId);

      if (error) {
        alert('Error updating image: ' + error.message);
      } else {
        alert('Image updated successfully!');
        setEditingId(null);
        resetForm();
        await fetchImages();
      }
    } else {
      const { error } = await supabase
        .from('gallery_images')
        .insert([imageData]);

      if (error) {
        alert('Error adding image: ' + error.message);
      } else {
        alert('Image added successfully!');
        // NUR das Bild-Feld zurücksetzen, Rest bleibt!
        setFormData({...formData, image: ''});
        await fetchImages();
      }
    }
  };

  const handleEdit = (image) => {
    setEditingId(image.id);
    setFormData({
      image: image.image,
      title: image.title || '',
      description: image.description || '',
      artist: image.artist || '',
      year: image.year || new Date().getFullYear()
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting image: ' + error.message);
    } else {
      alert('Image deleted successfully!');
      await fetchImages();
    }
  };

  const resetForm = () => {
    setFormData({
      image: '',
      title: '',
      description: '',
      artist: '',
      year: new Date().getFullYear()
    });
    setEditingId(null);
  };

  const handleUploadSuccess = (result) => {
    // NUR das Bild ändern, Rest bleibt erhalten!
    setFormData({...formData, image: result.info.secure_url});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Gallery Management</h1>
          <p className="text-gray-600">Add images to your gallery - all fields except image are optional</p>
        </div>

        {/* Image Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4">
            {editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Image Upload */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Image * (Required)
              </h3>
              
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>
                
                <CldUploadWidget
                  uploadPreset="zak_gallery"
                  cloudName="dhjcx2xdd"
                  options={{
                    folder: "gallery",
                    tags: ["gallery"],
                    multiple: false,
                    maxFiles: 1
                  }}
                  onSuccess={handleUploadSuccess}
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

              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="w-64 h-64 border border-gray-300 rounded overflow-hidden bg-gray-100">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Optional Information
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                💡 You can leave these fields empty. Add details only if you want them displayed.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="Mountain Landscape"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artist (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.artist}
                    onChange={(e) => setFormData({...formData, artist: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year (Optional)
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional) - How you made this, story behind it, etc.
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="Tell the story behind this artwork, how you created it, your inspiration..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center gap-2"
              >
                {editingId ? <Save size={18} /> : <Plus size={18} />}
                {editingId ? 'Update Image' : 'Add to Gallery'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-light text-gray-900 mb-4">
            Gallery Images ({images.length})
          </h2>
          
          {images.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No gallery images yet. Add your first image above.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map(image => (
                <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={image.image}
                      alt={image.title || 'Gallery image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    {image.title && (
                      <h3 className="font-medium text-gray-900 mb-1">{image.title}</h3>
                    )}
                    {image.artist && (
                      <p className="text-sm text-gray-600 mb-2">{image.artist}</p>
                    )}
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(image)}
                        className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded text-sm flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="flex-1 px-3 py-2 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition rounded text-sm flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
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