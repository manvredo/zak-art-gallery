import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyNewsletterToken } from '../_lib/token';
import { getOrCreateAudienceId } from '../_lib/audience';

const resend = new Resend(process.env.RESEND_API_KEY);

const welcomeEmailContent = {
  de: () => ({
    subject: 'Willkommen beim ZAK Fine Art Newsletter',
    text: `Willkommen beim ZAK Fine Art Newsletter

Ihre Anmeldung ist bestätigt! Sie gehören nun zu den Ersten, die Neuigkeiten erhalten zu:

- Neue Kollektionen & Gemälde — Erster Zugang zu neuen Kunstwerken, Limited Editions und exklusiven Vorschauen.
- ArtWingman & KI-Einblicke — Hinter den Kulissen von KI-gestützten Kunstwerkzeugen und kreativer Technologie.

Kein Spam. Jederzeit kündbar.

Herzliche Grüße,
Manfred Zak

---
ZAK Fine Art
Rudolf-Breitscheid-Str. 24
17326 Brüssow
info@manfredzak.com`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Willkommen beim ZAK Fine Art Newsletter</h2>
        <p>Ihre Anmeldung ist bestätigt! Sie gehören nun zu den Ersten, die Neuigkeiten erhalten zu:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0 0 12px 0;"><strong>Neue Kollektionen &amp; Gemälde</strong><br>
          <span style="color: #555;">Erster Zugang zu neuen Kunstwerken, Limited Editions und exklusiven Vorschauen.</span></p>
          <p style="margin: 0;"><strong>ArtWingman &amp; KI-Einblicke</strong><br>
          <span style="color: #555;">Hinter den Kulissen von KI-gestützten Kunstwerkzeugen und kreativer Technologie.</span></p>
        </div>
        <p style="color: #666; font-size: 13px;">Kein Spam. Jederzeit kündbar.</p>
        <p>Herzliche Grüße,<br>Manfred Zak</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          ZAK Fine Art<br>
          Rudolf-Breitscheid-Str. 24<br>
          17326 Brüssow<br>
          info@manfredzak.com
        </p>
      </div>
    `
  }),
  en: () => ({
    subject: 'Welcome to the ZAK Fine Art Newsletter',
    text: `Welcome to the ZAK Fine Art Newsletter

Your subscription is confirmed! You'll now be among the first to hear about:

- New Collections & Paintings — first access to new artworks, limited editions, and exclusive previews.
- ArtWingman & AI Insights — behind the scenes of AI-powered art tools and creative tech.

No spam, unsubscribe anytime.

Best regards,
Manfred Zak

---
ZAK Fine Art
Rudolf-Breitscheid-Str. 24
17326 Brüssow, Germany
info@manfredzak.com`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to the ZAK Fine Art Newsletter</h2>
        <p>Your subscription is confirmed! You'll now be among the first to hear about:</p>
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
          17326 Brüssow, Germany<br>
          info@manfredzak.com
        </p>
      </div>
    `
  })
};

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get('token');

  const payload = verifyNewsletterToken(token);
  if (!payload) {
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=invalid`);
  }

  const { email, language } = payload;
  const lang = language === 'de' ? 'de' : 'en';

  try {
    const audienceId = await getOrCreateAudienceId(resend);
    if (!audienceId) {
      console.error('Newsletter confirm: could not find or create audience');
      return NextResponse.redirect(`${origin}/newsletter/confirmed?status=error`);
    }

    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false
    });

    if (error && !error.message?.includes('already exists')) {
      console.error('Newsletter confirm contact create error:', error);
      return NextResponse.redirect(`${origin}/newsletter/confirmed?status=error`);
    }

    try {
      const { subject, text, html } = welcomeEmailContent[lang]();
      await resend.emails.send({
        from: 'ZAK Fine Art <info@manfredzak.com>',
        to: [email],
        subject,
        text,
        html
      });
    } catch (emailError) {
      console.error('Newsletter welcome email error:', emailError);
    }

    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=success`);

  } catch (error) {
    console.error('Newsletter confirm error:', error);
    return NextResponse.redirect(`${origin}/newsletter/confirmed?status=error`);
  }
}
