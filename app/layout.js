'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Wenn nicht authentifiziert und nicht mehr loading, redirect zum Login
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lädt...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect passiert oben
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-light text-gray-900">Admin Panel</h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:block text-sm text-gray-600">
                👤 <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
              
              <button
                onClick={async () => {
                  await logout();
                  router.push('/admin/login');
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Abmelden</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-2">
              <a
                href="/admin/gallery"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                🖼️ Galerie
              </a>
              <a
                href="/admin"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                📊 Dashboard
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <div className="flex">
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a
              href="/admin/gallery"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
            >
              🖼️ Galerie Werke
            </a>
            <a
              href="/admin"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
            >
              📊 Statistiken
            </a>
            <a
              href="/admin/settings"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
            >
              ⚙️ Einstellungen
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}