"use client";

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage({ 
  contactForm, 
  onFormChange, 
  onSubmit, 
  loading, 
  success, 
  error 
}) {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-light text-gray-900 mb-8 text-center">
        {t.contact.title}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-light text-gray-900 mb-6">
            {t.contact.getInTouch}
          </h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Mail className="text-gray-600 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900">{t.contact.email}</p>
                <p className="text-gray-600">info@manfredzak.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-gray-600 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900">{t.contact.phone}</p>
                <p className="text-gray-600">+49 (0) 39742 870978</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-gray-600 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-900">{t.contact.hours}</p>
                <p className="text-gray-600">{t.footer.monFri}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={onSubmit} className="space-y-4">
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                {t.contact.success}
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.contact.name}
              </label>
              <input 
                type="text"
                value={contactForm.name}
                onChange={(e) => onFormChange({...contactForm, name: e.target.value})}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder={t.contact.yourName}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.contact.email}
              </label>
              <input 
                type="email"
                value={contactForm.email}
                onChange={(e) => onFormChange({...contactForm, email: e.target.value})}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder={t.contact.yourEmail}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.contact.message}
              </label>
              <textarea 
                rows="5"
                value={contactForm.message}
                onChange={(e) => onFormChange({...contactForm, message: e.target.value})}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder={t.contact.yourMessage}
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? t.contact.sending : t.contact.sendMessage}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}