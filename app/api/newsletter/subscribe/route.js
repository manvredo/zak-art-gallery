import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createNewsletterToken } from '../_lib/token';

const resend = new Resend(process.env.RESEND_API_KEY);

const confirmEmailContent = {
  de: (confirmUrl) => ({
    subject: 'Bitte bestätigen Sie Ihre Newsletter-Anmeldung',
    text: `Bitte bestätigen Sie Ihre Newsletter-Anmeldung

Vielen Dank für Ihr Interesse am ZAK Fine Art Newsletter.

Bitte bestätigen Sie Ihre Anmeldung über den folgenden Link:
${confirmUrl}

Der Link ist 48 Stunden gültig. Falls Sie sich nicht angemeldet haben, können Sie diese E-Mail einfach ignorieren.

---
ZAK Fine Art
Rudolf-Breitscheid-Str. 24
17326 Brüssow
info@manfredzak.com`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Bitte bestätigen Sie Ihre Newsletter-Anmeldung</h2>
        <p>Vielen Dank für Ihr Interesse am ZAK Fine Art Newsletter.</p>
        <p>Bitte bestätigen Sie Ihre Anmeldung über den folgenden Link:</p>
        <p style="margin: 24px 0;">
          <a href="${confirmUrl}" style="background: #111; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Anmeldung bestätigen</a>
        </p>
        <p style="color: #666; font-size: 13px;">Der Link ist 48 Stunden gültig. Falls Sie sich nicht angemeldet haben, können Sie diese E-Mail einfach ignorieren.</p>
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
  en: (confirmUrl) => ({
    subject: 'Please confirm your newsletter subscription',
    text: `Please confirm your newsletter subscription

Thank you for your interest in the ZAK Fine Art newsletter.

Please confirm your subscription via the following link:
${confirmUrl}

This link is valid for 48 hours. If you did not sign up, you can simply ignore this email.

---
ZAK Fine Art
Rudolf-Breitscheid-Str. 24
17326 Brüssow, Germany
info@manfredzak.com`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Please confirm your newsletter subscription</h2>
        <p>Thank you for your interest in the ZAK Fine Art newsletter.</p>
        <p>Please confirm your subscription via the following link:</p>
        <p style="margin: 24px 0;">
          <a href="${confirmUrl}" style="background: #111; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Confirm subscription</a>
        </p>
        <p style="color: #666; font-size: 13px;">This link is valid for 48 hours. If you did not sign up, you can simply ignore this email.</p>
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

export async function POST(request) {
  try {
    const { email, consent, language } = await request.json();
    const lang = language === 'de' ? 'de' : 'en';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const token = createNewsletterToken(normalizedEmail, lang);
    const confirmUrl = `${new URL(request.url).origin}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;

    const { subject, text, html } = confirmEmailContent[lang](confirmUrl);

    await resend.emails.send({
      from: 'ZAK Fine Art <info@manfredzak.com>',
      to: [normalizedEmail],
      subject,
      text,
      html
    });

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent'
    });

  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
