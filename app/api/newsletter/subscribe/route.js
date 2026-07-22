import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_NAME = 'ZAK Fine Art Newsletter';

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

    // Audience-ID automatisch finden (falls nicht in .env)
    let audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId) {
      const { data: audiences } = await resend.audiences.list();
      const audience = audiences?.find(a => a.name === AUDIENCE_NAME);
      if (audience) {
        audienceId = audience.id;
      } else {
        // Audience existiert nicht → neu erstellen
        const { data: newAudience } = await resend.audiences.create({
          name: AUDIENCE_NAME,
        });
        audienceId = newAudience?.id;
      }
    }

    if (!audienceId) {
      console.error('Could not find or create audience');
      return NextResponse.json({ error: 'Newsletter not configured' }, { status: 500 });
    }

    // Kontakt zu Resend Audience hinzufügen
    const { data, error } = await resend.contacts.create({
      email: email.trim().toLowerCase(),
      firstName: name?.trim() || '',
      audienceId: audienceId,
      unsubscribed: false,
    });

    if (error) {
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

    // Willkommens-Email an neuen Abonnenten
    try {
      await resend.emails.send({
        from: 'ZAK Fine Art <info@manfredzak.com>',
        to: [email],
        subject: 'Welcome to the ZAK Fine Art Newsletter',
        text: `Welcome to the ZAK Fine Art Newsletter

Thank you for subscribing! You'll now be among the first to hear about:

- New Collections & Paintings — first access to new artworks, limited editions, and exclusive previews.
- ArtWingman & AI Insights — behind the scenes of AI-powered art tools and creative tech.

No spam, unsubscribe anytime.

Best regards,
Manfred Zak

---
ZAK Fine Art
Rudolf-Breitscheid-Str. 24
17326 Brüssow
info@manfredzak.com`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to the ZAK Fine Art Newsletter</h2>
            <p>Thank you for subscribing! You'll now be among the first to hear about:</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 12px 0;"><strong>New Collections &amp; Paintings</strong><br>
              <span style="color: #555;">First access to new artworks, limited editions, and exclusive previews.</span></p>
              <p style="margin: 0;"><strong>ArtWingman &amp; AI Insights</strong><br>
              <span style="color: #555;">Behind the scenes of AI-powered art tools and creative tech.</span></p>
            </div>
            <p style="color: #666; font-size: 13px;">No spam. Unsubscribe anytime.</p>
            <p>Best regards,<br>Manfred Zak</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              ZAK Fine Art<br>
              Rudolf-Breitscheid-Str. 24<br>
              17326 Brüssow<br>
              info@manfredzak.com
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Newsletter welcome email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed'
    });

  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
