'use client';

import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { Star } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

function Stars({ value, size = 16 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(value) ? 'fill-gray-900 text-gray-900' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection({ productId, reviews, averageRating }) {
  const { language, t } = useLanguage();
  const r = t.reviews;
  const locale = language === 'de' ? 'de-DE' : 'en-US';

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus('submitting');

    const { error } = await supabase.from('reviews').insert({
      product_id: productId,
      author_name: name.trim(),
      rating,
      comment: comment.trim() || null,
      approved: false,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('done');
      setName('');
      setComment('');
      setRating(5);
    }
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-xl font-light text-gray-900 mb-1">{r.title}</h2>
          {reviews.length > 0 ? (
            <div className="flex items-center gap-2">
              <Stars value={averageRating} />
              <span className="text-sm text-gray-500">
                {r.basedOn.replace('{n}', reviews.length)}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">{r.noReviews}</p>
          )}
        </div>

        {!showForm && status !== 'done' && (
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
          >
            {r.writeReview}
          </button>
        )}
      </div>

      {status === 'done' ? (
        <p className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
          {r.thankYou}
        </p>
      ) : showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4 mb-10 max-w-md">
          <div>
            <label className="block text-sm text-gray-700 mb-1">{r.yourName}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">{r.yourRating}</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className="p-0.5"
                  aria-label={`${n} / 5`}
                >
                  <Star
                    size={22}
                    className={n <= rating ? 'fill-gray-900 text-gray-900' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">{r.yourComment}</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {status === 'error' && <p className="text-sm text-red-600">{r.error}</p>}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {status === 'submitting' ? r.submitting : r.submit}
          </button>
        </form>
      ) : null}

      {reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-center gap-3 mb-1">
                <Stars value={rev.rating} size={14} />
                <span className="text-sm font-medium text-gray-900">{rev.author_name}</span>
                <span className="text-xs text-gray-400">
                  {new Date(rev.created_at).toLocaleDateString(locale)}
                </span>
              </div>
              {rev.comment && <p className="text-sm text-gray-700">{rev.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
