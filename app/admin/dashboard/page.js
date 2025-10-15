'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingCart, FileText, TrendingUp, Plus, Edit } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    content: 0,
    revenue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Prüfe ob authentifiziert
    const auth = sessionStorage.getItem('admin_authenticated');
    
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      // Nicht authentifiziert - redirect zu Login
      router.push('/admin/login');
    }
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      // Produkte zählen
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, title, price, image, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!productsError) {
        setStats(prev => ({ ...prev, products: products.length }));
        setRecentProducts(products || []);
      }

      // Bestellungen zählen
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      setStats(prev => ({ ...prev, orders: ordersCount || 0 }));

      // Content zählen
      const { count: contentCount } = await supabase
        .from('content')
        .select('*', { count: 'exact', head: true });

      setStats(prev => ({ ...prev, content: contentCount || 0 }));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Willkommen zurück im Admin-Bereich! 👋</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package size={24} className="text-blue-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.products}</h3>
          <p className="text-sm text-gray-600">Kunstwerke</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingCart size={24} className="text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.orders}</h3>
          <p className="text-sm text-gray-600">Bestellungen</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText size={24} className="text-purple-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.content}</h3>
          <p className="text-sm text-gray-600">Content-Artikel</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <TrendingUp size={24} className="text-amber-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">€{stats.revenue}</h3>
          <p className="text-sm text-gray-600">Umsatz</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Schnellzugriff</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <a
            href="/admin/products/new"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center group"
          >
            <Plus size={32} className="mx-auto mb-3 text-gray-700 group-hover:text-blue-600" />
            <p className="font-semibold text-gray-900">Neues Produkt</p>
          </a>
          
          <a
            href="/admin/products"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center group"
          >
            <Package size={32} className="mx-auto mb-3 text-gray-700 group-hover:text-green-600" />
            <p className="font-semibold text-gray-900">Produkte verwalten</p>
          </a>
          
          <a
            href="/admin"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center group"
          >
            <ShoppingCart size={32} className="mx-auto mb-3 text-gray-700 group-hover:text-purple-600" />
            <p className="font-semibold text-gray-900">Bestellungen</p>
          </a>

          <a
            href="/admin/content"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition text-center group"
          >
            <FileText size={32} className="mx-auto mb-3 text-gray-700 group-hover:text-amber-600" />
            <p className="font-semibold text-gray-900">Content bearbeiten</p>
          </a>
        </div>
      </div>

      {/* Recent Products */}
      {recentProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Neueste Produkte</h3>
            <a href="/admin/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Alle anzeigen →
            </a>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {recentProducts.map(product => (
              <a 
                key={product.id}
                href={`/admin/products/edit/${product.id}`}
                className="group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                  {product.title}
                </p>
                <p className="text-sm text-gray-600">€{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">🔒 Sicherheitshinweis</h3>
        <p className="text-blue-50">
          Ändern Sie das Admin-Passwort in <code className="bg-white/20 px-2 py-1 rounded">admin/login/page.js</code> 
          {' '}und setzen Sie ein starkes, einzigartiges Passwort!
        </p>
      </div>

    </div>
  );
}