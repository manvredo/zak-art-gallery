'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Login-Seite ist immer zugänglich
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    // Prüfe Authentifizierung für alle anderen Admin-Seiten
    const auth = sessionStorage.getItem('admin_authenticated');
    
    if (auth === 'true') {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      // Nicht authentifiziert - redirect zu Login
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  // Login-Seite ohne Layout anzeigen
  if (pathname === '/admin/login') {
    return children;
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Admin-Bereich...</p>
        </div>
      </div>
    );
  }

  // Nicht authentifiziert
  if (!isAuthenticated) {
    return null;
  }

  // Authentifiziert - Zeige Admin Layout
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-6">
              <a href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">ZAK Art Gallery</p>
                </div>
              </a>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <a
                  href="/admin/dashboard"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    pathname === '/admin/dashboard'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </a>
                <a
                  href="/admin/products"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    pathname === '/admin/products'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Produkte
                </a>
                <a
                  href="/admin"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    pathname === '/admin' || pathname === '/admin/orders'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Bestellungen
                </a>
              </nav>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut size={18} />
              <span className="hidden md:inline font-medium">Abmelden</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2024 ZAK Art Gallery - Admin Panel</p>
            <a href="/" className="hover:text-gray-900 transition">
              → Zur Website
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}