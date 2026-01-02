"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const supabase = createClient(
  'https://xirvysecnblcegbpsmru.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcnZ5c2VjbmJsY2VnYnBzbXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODUyNjgsImV4cCI6MjA3NTA2MTI2OH0.adu6jdxVqPs9mC9H5Ih-XBkpmJYW72gt4Oz9koKY78I'
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://manfredzak.com/reset-password',
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Fehler beim Senden der Email. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-4">
              Email versendet! / Email Sent!
            </h1>
            <p className="text-gray-600 mb-6">
              Wir haben Ihnen eine Email mit einem Link zum Zurücksetzen Ihres Passworts gesendet, falls Sie bei uns registriert sind.
              <br /><br />
              (We've sent you an email with a password reset link if you are registered with us.)
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Bitte überprüfen Sie auch Ihren Spam-Ordner.
              <br />
              (Please also check your spam folder.)
            </p>
            <Link
              href="/login"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Zurück zum Login / Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Back Link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition"
          >
            <ArrowLeft size={20} />
            <span>Zurück zum Login / Back to Login</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
              <Mail className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Passwort vergessen?
            </h1>
            <p className="text-gray-600 mb-1">(Forgot your password?)</p>
            <p className="text-gray-500 text-sm mt-4">
              Geben Sie Ihre Email-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen.
              <br />
              (Enter your email and we'll send you a reset link.)
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email-Adresse / Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    placeholder="ihre-email@beispiel.de"
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
                    <span>Wird gesendet... / Sending...</span>
                  </div>
                ) : (
                  'Reset-Link senden / Send Reset Link'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}