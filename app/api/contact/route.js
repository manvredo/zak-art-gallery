import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validierung
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // E-Mail-Transporter konfigurieren - HARDCODED zum Testen
    const transporter = nodemailer.createTransport({
      host: 'plesk2.living-bots.net',
      port: 587,
      secure: false,
      auth: {
        user: 'info@manfredzak.com',
        pass: 'Ms$c@ZxH*3#gXGP'  // <-- Tragen Sie hier Ihr Passwort ein
      },
    });

    // E-Mail an Sie
    await transporter.sendMail({
      from: 'info@manfredzak.com',
      to: 'info@manfredzak.com',
      replyTo: email,
      subject: `🎨 ZAK Art Gallery Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Message from ZAK Art Gallery Contact Form</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    // Bestätigungs-E-Mail an Kunden
    await transporter.sendMail({
      from: 'info@manfredzak.com',
      to: email,
      subject: 'Thank you for contacting ZAK Art Gallery',
      text: `Dear ${name},\n\nThank you for your message. We will get back to you soon.\n\nBest regards,\nZAK Art Gallery`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting ZAK Art Gallery</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your message. We have received your inquiry and will get back to you as soon as possible.</p>
          <p style="white-space: pre-wrap;"><strong>Your message:</strong><br>${message}</p>
          <br>
          <p>Best regards,<br><strong>ZAK Art Gallery</strong></p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}