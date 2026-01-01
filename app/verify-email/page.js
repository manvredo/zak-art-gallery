"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const { t } = useLanguage();

  const handleResendEmail = async () => {
    setResending(true);
    
    // Hier könnte man die E-Mail erneut senden
    // Das ist nur eine Demo - in Produktion müsstest du die E-Mail-Adresse kennen
    
    setTimeout(() => {
      setResending(false);
      setResent(true);
      setTimeout(() => setResent(false), 5000);
    }, 2000);
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

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          
          {/* Animated Email Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6 animate-pulse">
              <Mail className="text-blue-600" size={48} />
            </div>
            
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              {t.auth.verifyEmail?.title || 'E-Mail bestätigen'}
            </h1>
            
            <p className="text-lg text-gray-600 mb-2">
              {t.auth.verifyEmail?.subtitle || 'Wir haben Ihnen eine E-Mail gesendet'}
            </p>
            
            <p className="text-gray-500">
              {t.auth.verifyEmail?.description || 'Bitte prüfen Sie Ihr Postfach und klicken Sie auf den Bestätigungslink in der E-Mail.'}
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">
              {t.auth.verifyEmail?.nextSteps || 'Nächste Schritte:'}
            </h3>
            
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">
                  1
                </span>
                <span className="text-gray-700">
                  {t.auth.verifyEmail?.step1 || 'Öffnen Sie Ihr E-Mail-Postfach'}
                </span>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                <span className="text-gray-700">
                  {t.auth.verifyEmail?.step2 || 'Finden Sie die E-Mail von ZAK Art Gallery'}
                </span>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">
                  3
                </span>
                <span className="text-gray-700">
                  {t.auth.verifyEmail?.step3 || 'Klicken Sie auf den Bestätigungslink'}
                </span>
              </li>
              
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 text-green-600 mt-0.5" size={20} />
                <span className="text-gray-700">
                  {t.auth.verifyEmail?.step4 || 'Sie werden automatisch weitergeleitet'}
                </span>
              </li>
            </ol>
          </div>

          {/* Resend Email Button */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              {t.auth.verifyEmail?.noEmail || 'Keine E-Mail erhalten?'}
            </p>
            
            {resent ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle size={20} />
                <span className="text-sm font-medium">
                  {t.auth.verifyEmail?.emailResent || 'E-Mail wurde erneut gesendet!'}
                </span>
              </div>
            ) : (
              <button
                onClick={handleResendEmail}
                disabled={resending}
                className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resending ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>{t.auth.verifyEmail?.resending || 'Wird gesendet...'}</span>
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    <span>{t.auth.verifyEmail?.resendButton || 'E-Mail erneut senden'}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              {t.auth.verifyEmail?.checkSpam || 'Prüfen Sie auch Ihren Spam-Ordner'}
            </p>
            <p className="text-xs text-gray-400">
              {t.auth.verifyEmail?.supportText || 'Bei Problemen kontaktieren Sie uns unter'}{' '}
              <a href="mailto:support@zakartgallery.com" className="text-gray-900 hover:underline">
                support@zakartgallery.com
              </a>
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              href="/login"
              className="text-sm text-gray-700 hover:text-gray-900 font-medium hover:underline"
            >
              ← {t.auth.verifyEmail?.backToLogin || 'Zurück zur Anmeldung'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}