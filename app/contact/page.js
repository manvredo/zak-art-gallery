'use client';

import { useEffect, useState } from 'react';
import ContactPage from '@/app/components/ContactPage';
import { useLanguage } from '@/app/context/LanguageContext';
import { supabase } from '@/app/lib/supabaseClient';

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState(null);
  const { t } = useLanguage();

  // Enquiry for an "on request" artwork: /contact?artwork=<product id>
  useEffect(() => {
    const artworkId = new URLSearchParams(window.location.search).get('artwork');
    if (!artworkId) return;
    supabase
      .from('products')
      .select('name, size')
      .eq('id', artworkId)
      .single()
      .then(({ data }) => {
        if (!data) return;
        const message = t.shop.inquiryMessage
          .replace('{name}', data.name)
          .replace('{size}', data.size || '');
        setContactForm((form) => (form.message ? form : { ...form, message }));
      });
  }, [t]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError(null);
    setContactSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setContactSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactSuccess(false), 5000);

    } catch (error) {
      console.error('Contact form error:', error);
      setContactError(error.message);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <ContactPage 
      contactForm={contactForm}
      onFormChange={setContactForm}
      onSubmit={handleContactSubmit}
      loading={contactLoading}
      success={contactSuccess}
      error={contactError}
    />
  );
}