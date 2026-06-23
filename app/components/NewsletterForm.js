"use client";

import React, { useState } from 'react';
import { Check, Mail, AlertCircle, Loader2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'paintings', label: 'Paintings & Collections', emoji: '🎨' },
  { id: 'artwingman', label: 'ArtWingman & AI', emoji: '🤖' },
  { id: 'tools', label: 'Tools & Resources', emoji: '🛠️' },
];

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['paintings']);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          categories: selectedCategories,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message === 'Already subscribed'
          ? "You're already subscribed!"
          : 'Welcome aboard! Check your inbox.');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400" size={16} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
              disabled={status === 'loading'}
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            I'm interested in
          </label>
          <div className="space-y-1.5">
            {CATEGORIES.map(cat => (
              <label
                key={cat.id}
                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition text-sm ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span>{cat.emoji} {cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Subscribing...
            </>
          ) : (
            <>
              <Mail size={16} />
              Subscribe
            </>
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
            <Check size={16} />
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle size={16} />
            {message}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400">
          No spam. Unsubscribe anytime. Your email is safe with us.
        </p>
      </form>
    </div>
  );
}
