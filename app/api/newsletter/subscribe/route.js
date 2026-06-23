import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, name, categories } = await request.json();

    // Validierung
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Prüfen ob Audience-ID gesetzt ist
    if (!process.env.RESEND_AUDIENCE_ID) {
      console.error('RESEND_AUDIENCE_ID not configured');
      return NextResponse.json({ error: 'Newsletter not configured' }, { status: 500 });
    }

    // Kontakt zu Resend Audience hinzufügen
    const { data, error } = await resend.contacts.create({
      email: email.trim().toLowerCase(),
      firstName: name?.trim() || '',
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });

    if (error) {
      // "already exists" ist kein Fehler für uns
      if (error.message?.includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed'
        });
      }
      console.error('Resend contact create error:', error);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    console.log('Newsletter subscriber added:', email, categories);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed'
    });

  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
