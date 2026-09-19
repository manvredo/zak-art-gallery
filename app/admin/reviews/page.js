'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { LogOut, Eye, Check, Trash2, Star } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function Stars({ value }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= value ? 'fill-gray-900 text-gray-900' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/admin');
        return;
      }
      setUser(user);
      setAuthLoading(false);
      fetchReviews();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error:', error);
      setLoading(false);
      return;
    }

    setReviews(data || []);

    const productIds = [...new Set((data || []).map((r) => r.product_id))];
    if (productIds.length > 0) {
      const { data: prods } = await supabase
        .from('products')
        .select('id, name')
        .in('id', productIds);
      const map = {};
      (prods || []).forEach((p) => { map[p.id] = p.name; });
      setProducts(map);
    }

    setLoading(false);
  };

  const approve = async (id) => {
    await supabase.from('reviews').update({ approved: true }).eq('id', id);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
  };

  const remove = async (id) => {
    await supabase.from('reviews').delete().eq('id', id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

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

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Bewertungen</h1>
            <p className="text-gray-600">Kundenbewertungen prüfen und freigeben</p>
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

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Ausstehend ({pending.length})
            </h2>
            {pending.length === 0 ? (
              <p className="text-gray-500 text-sm mb-10">Keine offenen Bewertungen.</p>
            ) : (
              <div className="space-y-3 mb-10">
                {pending.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <Stars value={rev.rating} />
                          <span className="font-medium text-gray-900">{rev.author_name}</span>
                          <span className="text-xs text-gray-400">
                            {products[rev.product_id] || `Produkt #${rev.product_id}`}
                          </span>
                        </div>
                        {rev.comment && <p className="text-sm text-gray-700 mt-1">{rev.comment}</p>}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(rev.created_at).toLocaleString('de-DE')}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => approve(rev.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition"
                        >
                          <Check size={16} />
                          Freigeben
                        </button>
                        <button
                          onClick={() => remove(rev.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition"
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

            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Veröffentlicht ({approved.length})
            </h2>
            {approved.length === 0 ? (
              <p className="text-gray-500 text-sm">Noch keine veröffentlichten Bewertungen.</p>
            ) : (
              <div className="space-y-3">
                {approved.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <Stars value={rev.rating} />
                          <span className="font-medium text-gray-900">{rev.author_name}</span>
                          <span className="text-xs text-gray-400">
                            {products[rev.product_id] || `Produkt #${rev.product_id}`}
                          </span>
                        </div>
                        {rev.comment && <p className="text-sm text-gray-700 mt-1">{rev.comment}</p>}
                      </div>
                      <button
                        onClick={() => remove(rev.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition shrink-0"
                      >
                        <Trash2 size={16} />
                        Löschen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
