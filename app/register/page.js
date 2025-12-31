"use client";

import React, { useState } from 'react';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Sprachumschaltung (für Demo - in der echten App kommt das aus LanguageContext)
  const [language, setLanguage] = useState('de');
  
  const translations = {
    de: {
      title: 'Konto erstellen',
      subtitle: 'Werden Sie Teil der ZAK Art Gallery Community',
      fullNameLabel: 'Vollständiger Name',
      fullNamePlaceholder: 'Max Mustermann',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'max@beispiel.de',
      passwordLabel: 'Passwort',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Passwort bestätigen',
      passwordHint: 'Mindestens 6 Zeichen',
      submitButton: 'Konto erstellen',
      creating: 'Konto wird erstellt...',
      haveAccount: 'Bereits ein Konto?',
      signIn: 'Anmelden',
      guestNote: 'Kein Konto nötig? Sie können jederzeit als Gast zur Kasse gehen.',
      benefitsTitle: 'Vorteile eines Kontos:',
      benefits: {
        trackOrders: 'Bestellungen verfolgen',
        saveFavorites: 'Lieblingskunstwerke speichern',
        earlyAccess: 'Früher Zugang zu neuen Kollektionen',
        newsletter: 'Exklusive Newsletter-Updates'
      },
      successTitle: 'Willkommen bei ZAK Art Gallery!',
      successMessage: 'Ihr Konto wurde erfolgreich erstellt.',
      redirecting: 'Weiterleitung zu Ihrem Konto...',
      backToShop: 'Zurück zum Shop',
      errors: {
        passwordMismatch: 'Passwörter stimmen nicht überein',
        passwordTooShort: 'Passwort muss mindestens 6 Zeichen lang sein',
        registrationFailed: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.'
      }
    },
    en: {
      title: 'Create Account',
      subtitle: 'Join ZAK Art Gallery community',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'john@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm Password',
      passwordHint: 'At least 6 characters',
      submitButton: 'Create Account',
      creating: 'Creating account...',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
      guestNote: 'No account needed? You can checkout as a guest anytime.',
      benefitsTitle: 'Account Benefits:',
      benefits: {
        trackOrders: 'Track your orders',
        saveFavorites: 'Save favorite artworks',
        earlyAccess: 'Early access to new collections',
        newsletter: 'Exclusive newsletter updates'
      },
      successTitle: 'Welcome to ZAK Art Gallery!',
      successMessage: 'Your account has been created successfully.',
      redirecting: 'Redirecting to your account...',
      backToShop: 'Back to Shop',
      errors: {
        passwordMismatch: "Passwords don't match",
        passwordTooShort: 'Password must be at least 6 characters',
        registrationFailed: 'Registration failed. Please try again.'
      }
    }
  };
  
  const t = translations[language];

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validierung: Passwörter müssen übereinstimmen
    if (formData.password !== formData.confirmPassword) {
      setError(t.errors.passwordMismatch);
      setLoading(false);
      return;
    }

    // Validierung: Passwort-Mindestlänge
    if (formData.password.length < 6) {
      setError(t.errors.passwordTooShort);
      setLoading(false);
      return;
    }

    // Simuliere Registrierung (in der echten App: Supabase Auth)
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      
      // Nach 2 Sekunden "weiterleiten"
      setTimeout(() => {
        console.log('Redirecting to account page...');
      }, 2000);
    }, 1500);
  };

  // Erfolgs-Ansicht
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-2">
            {t.successTitle}
          </h2>
          <p className="text-gray-600 mb-4">
            {t.successMessage}
          </p>
          <p className="text-sm text-gray-500">
            {t.redirecting}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
              ZAK ART GALLERY
            </h1>
            <div className="flex items-center gap-4">
              {/* Sprachumschaltung */}
              <button 
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-1 rounded"
              >
                {language === 'de' ? '🇬🇧 EN' : '🇩🇪 DE'}
              </button>
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">
                ← {t.backToShop}
              </span>
            </div>
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
              {t.title}
            </h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-6">
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
                  {t.fullNameLabel} *
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
                    placeholder={t.fullNamePlaceholder}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailLabel} *
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
                    placeholder={t.emailPlaceholder}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.passwordLabel} *
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
                    placeholder={t.passwordPlaceholder}
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{t.passwordHint}</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.confirmPasswordLabel} *
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
                    placeholder={t.passwordPlaceholder}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t.creating}</span>
                  </div>
                ) : (
                  t.submitButton
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.haveAccount}{' '}
                <span className="text-gray-900 font-medium hover:underline cursor-pointer">
                  {t.signIn}
                </span>
              </p>
            </div>
          </div>

          {/* Guest Note */}
          <p className="text-center text-gray-500 text-sm mt-6">
            {t.guestNote}
          </p>

          {/* Benefits Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t.benefitsTitle}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.benefits.trackOrders}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.benefits.saveFavorites}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.benefits.earlyAccess}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{t.benefits.newsletter}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}