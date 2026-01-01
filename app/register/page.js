"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { translateSupabaseError } from '@/app/utils/translateSupabaseError';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { t } = useLanguage();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validierung: Passwörter müssen übereinstimmen
    if (formData.password !== formData.confirmPassword) {
      setError(t.auth.errors.passwordMismatch);
      setLoading(false);
      return;
    }

    // Validierung: Passwort-Mindestlänge
    if (formData.password.length < 6) {
      setError(t.auth.errors.passwordTooShort);
      setLoading(false);
      return;
    }

    try {
      // Registrierung mit Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.name.trim(),
          },
          // ✅ E-Mail-Bestätigung aktivieren
          emailRedirectTo: `${window.location.origin}/account`
        }
      });

      if (error) throw error;

      // ✅ Erfolg! Weiterleitung zur E-Mail-Bestätigungsseite
      router.push('/verify-email');

    } catch (error) {
      console.error('Registration error:', error);
      setError(translateSupabaseError(error, t));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK ART GALLERY
              </h1>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              ← {t.auth.login.backToShop}
            </Link>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
              <User className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {t.auth.register.title}
            </h1>
            <p className="text-gray-600">{t.auth.register.subtitle}</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.auth.register.fullNameLabel} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder={t.auth.register.fullNamePlaceholder}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.auth.register.emailLabel} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder={t.auth.register.emailPlaceholder}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.auth.register.passwordLabel} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder={t.auth.register.passwordPlaceholder}
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{t.auth.register.passwordHint}</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.auth.register.confirmPasswordLabel} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder={t.auth.register.passwordPlaceholder}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t.auth.register.creating}</span>
                  </div>
                ) : (
                  t.auth.register.submitButton
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.auth.register.haveAccount}{' '}
                <Link href="/login" className="text-gray-900 font-medium hover:underline">
                  {t.auth.register.signIn}
                </Link>
              </p>
            </div>
          </div>

          {/* Guest Note */}
          <p className="text-center text-gray-500 text-sm mt-6">
            {t.auth.register.guestNote}
          </p>

          {/* Benefits Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t.auth.register.benefitsTitle}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.auth.register.benefits.trackOrders}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.auth.register.benefits.saveFavorites}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.auth.register.benefits.earlyAccess}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.auth.register.benefits.newsletter}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}