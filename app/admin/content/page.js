"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Plus, Save, X, Upload, Eye, LogOut } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminContentPage() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'news',
    excerpt: '',
    content: '',
    featured_image: '',
    status: 'draft',
    author: ''
  });
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        // Not authenticated - redirect to login
        router.push('/admin/login');
        return;
      }

      setUser(user);
      setAuthLoading(false);
      fetchContents();
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

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title: title,
      slug: generateSlug(title)
    });
  };

  const fetchContents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
      setContents([]);
    } else {
      setContents(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const contentData = {
      title: formData.title,
      slug: formData.slug,
      category: formData.category,
      excerpt: formData.excerpt || null,
      content: formData.content,
      featured_image: formData.featured_image || null,
      status: formData.status,
      author: formData.author || null,
      published_at: formData.status === 'published' ? new Date().toISOString() : null
    };

    if (editingId) {
      const { error } = await supabase
        .from('content')
        .update(contentData)
        .eq('id', editingId);

      if (error) {
        alert('Error updating content: ' + error.message);
      } else {
        alert('Content updated successfully!');
        setEditingId(null);
        resetForm();
        await fetchContents();
      }
    } else {
      const { error } = await supabase
        .from('content')
        .insert([contentData]);

      if (error) {
        alert('Error adding content: ' + error.message);
      } else {
        alert('Content added successfully!');
        resetForm();
        await fetchContents();
      }
    }
  };

  const handleEdit = (content) => {
    setEditingId(content.id);
    setFormData({
      title: content.title,
      slug: content.slug,
      category: content.category,
      excerpt: content.excerpt || '',
      content: content.content,
      featured_image: content.featured_image || '',
      status: content.status,
      author: content.author || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting content: ' + error.message);
    } else {
      alert('Content deleted successfully!');
      await fetchContents();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'news',
      excerpt: '',
      content: '',
      featured_image: '',
      status: 'draft',
      author: ''
    });
    setEditingId(null);
  };

  const handleUploadSuccess = (result) => {
    // WICHTIG: Spread operator verwenden um bestehenden State zu erhalten
    setFormData(prevData => ({
      ...prevData,
      featured_image: result.info.secure_url
    }));
  };

  const getCategoryBadge = (category) => {
    const colors = {
      news: 'bg-blue-100 text-blue-800',
      story: 'bg-purple-100 text-purple-800',
      press: 'bg-green-100 text-green-800',
      private: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      news: 'News',
      story: 'Work in Progress',
      press: 'Presse',
      private: 'Kundenlogin'
    };
    return labels[category] || category;
  };

  // Show loading while checking auth
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
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Logout */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Manage your news, stories, press releases, and private content</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Content Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4">
            {editingId ? 'Edit Content' : 'Create New Content'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="My Amazing Story"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="my-amazing-story"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                >
                  <option value="news">📰 News</option>
                  <option value="story">🎨 Work in Progress</option>
                  <option value="press">📢 Presse</option>
                  <option value="private">🔒 Kundenlogin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author (Optional)
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                >
                  <option value="draft">📝 Draft</option>
                  <option value="published">✅ Published</option>
                </select>
              </div>
            </div>

            {/* Featured Image */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image (Optional)</h3>
              
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="url"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({...formData, featured_image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>
                
                <CldUploadWidget
                  uploadPreset="zak_gallery"
                  cloudName="dhjcx2xdd"
                  options={{
                    folder: "content",
                    tags: ["content", formData.category],
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

              {formData.featured_image && (
                <div className="mt-4">
                  <div className="w-full max-w-md h-48 border border-gray-300 rounded overflow-hidden bg-gray-100">
                    <img 
                      src={formData.featured_image} 
                      alt="Featured" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Optional) - Short preview text
              </label>
              <textarea
                rows="2"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                placeholder="A brief summary that appears in previews..."
              />
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content * (Full article text)
              </label>
              <textarea
                required
                rows="12"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 font-mono text-sm"
                placeholder="Write your full content here..."
              />
              <p className="text-xs text-gray-500 mt-1">💡 Supports line breaks and paragraphs</p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition rounded flex items-center gap-2"
              >
                {editingId ? <Save size={18} /> : <Plus size={18} />}
                {editingId ? 'Update' : 'Create'} Content
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

        {/* Content List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-light text-gray-900 mb-4">
            All Content ({contents.length})
          </h2>
          
          {contents.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No content yet. Create your first article above.</p>
          ) : (
            <div className="space-y-4">
              {contents.map(content => (
                <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex gap-4">
                    {content.featured_image && (
                      <div className="w-32 h-32 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        <img 
                          src={content.featured_image} 
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 text-lg mb-1">{content.title}</h3>
                          <div className="flex gap-2 items-center flex-wrap">
                            <span className={`px-2 py-1 text-xs rounded ${getCategoryBadge(content.category)}`}>
                              {getCategoryLabel(content.category)}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              content.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {content.status}
                            </span>
                            {content.author && (
                              <span className="text-xs text-gray-500">by {content.author}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {content.excerpt && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{content.excerpt}</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(content)}
                          className="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded text-sm flex items-center gap-1"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(content.id)}
                          className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition rounded text-sm flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                        <a
                          href={`/${content.category}/${content.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 border border-blue-300 text-blue-700 hover:bg-blue-50 transition rounded text-sm flex items-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </a>
                      </div>
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