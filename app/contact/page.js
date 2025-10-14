'use client';

import { useState } from 'react';
import ContactPage from '@/app/components/ContactPage';

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState(null);

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