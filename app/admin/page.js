'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, Package, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    } catch (e) {
      // not logged in
    }
    setAuthLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw new Error(authError.message);
      if (!data.session) throw new Error('Keine Session erstellt');
      setUser(data.user);
    } catch (error) {
      setError(error.message || 'Login fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setEmail('');
    setPassword('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // ——— Logged In: Dashboard ———
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-light text-gray-900">ZAK Admin</h1>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>

          {/* Kacheln */}
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/admin/shop"
              className="block bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition text-center"
            >
              <ShoppingCart size={40} className="mx-auto mb-4 text-gray-900" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">Shop</h2>
              <p className="text-gray-500 text-sm">Produkte verwalten</p>
            </Link>

            <Link
              href="/admin/orders"
              className="block bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition text-center"
            >
              <Package size={40} className="mx-auto mb-4 text-gray-900" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">Bestellungen</h2>
              <p className="text-gray-500 text-sm">Alle Bestellungen ansehen</p>
            </Link>
          </div>

          <p className="text-center text-gray-400 text-xs mt-16">
            © 2026 ZAK Fine Art
          </p>
        </div>
      </div>
    );
  }

  // ——— Not Logged In: Login ———
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">ZAK Admin</h1>
          <p className="text-gray-500">Bitte anmelden</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {error && (
            <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Passwort</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Wird angemeldet...' : 'Anmelden'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © 2026 ZAK Fine Art
        </p>
      </div>
    </div>
  );
}
