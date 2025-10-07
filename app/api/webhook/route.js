import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Hole die Line Items von Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product']
      });
      
      // Speichere in Supabase
      const { error } = await supabase
        .from('orders')
        .insert({
          stripe_session_id: session.id,
          customer_email: session.customer_details.email,
          customer_name: session.customer_details.name,
          amount_total: session.amount_total,
          status: 'paid',
          items: lineItems.data,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('Order saved successfully:', session.id);

      // ======== EMAIL BENACHRICHTIGUNGEN ========

      const customerEmail = session.customer_details.email;
      const customerName = session.customer_details.name;
      const orderTotal = (session.amount_total / 100).toFixed(2);

      // Build product list for email
      let productList = '';
      lineItems.data.forEach(item => {
        productList += `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.description}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${(item.amount_total / 100).toFixed(2)}</td>
          </tr>
        `;
      });

      // Email an Kunden
      const customerEmailContent = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Order Confirmation - ZAK Art Gallery',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-weight: 300; letter-spacing: 2px;">ZAK ART GALLERY</h1>
                </div>
                
                <div class="content">
                  <h2 style="color: #1a1a1a; font-weight: 300;">Thank you for your order!</h2>
                  
                  <p>Dear ${customerName},</p>
                  
                  <p>Thank you for your purchase at ZAK Art Gallery. Your order has been confirmed and will be carefully packaged and shipped within 2-3 business days.</p>
                  
                  <h3 style="margin-top: 30px;">Order Details</h3>
                  
                  <table>
                    <thead>
                      <tr style="background: #f0f0f0;">
                        <th style="padding: 10px; text-align: left;">Product</th>
                        <th style="padding: 10px; text-align: center;">Quantity</th>
                        <th style="padding: 10px; text-align: right;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${productList}
                      <tr>
                        <td colspan="2" style="padding: 15px; text-align: right; font-weight: bold;">Total:</td>
                        <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">€${orderTotal}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px 0;">What happens next?</h4>
                    <ul style="margin: 0; padding-left: 20px;">
                      <li>You will receive shipping confirmation with tracking information</li>
                      <li>Your artwork is insured during transport</li>
                      <li>Expected delivery: 5-7 business days</li>
                    </ul>
                  </div>
                  
                  <p>If you have any questions, please contact us at <a href="mailto:info@zakartgallery.com">info@zakartgallery.com</a></p>
                  
                  <p>Best regards,<br>
                  <strong>ZAK Art Gallery Team</strong></p>
                </div>
                
                <div class="footer">
                  <p>ZAK Art Gallery | Großbeerenstr. 15 | 10963 Berlin | Germany</p>
                  <p>© 2024 ZAK Art Gallery. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `
      };

      // Email an dich (Admin)
      const adminEmailContent = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `🎨 New Order - ${customerName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>🎨 New Order Received!</h2>
              
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Total:</strong> €${orderTotal}</p>
              
              <h3>Order Items</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; text-align: left;">Product</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${productList}
                </tbody>
              </table>
              
              <p style="background: #fff3cd; padding: 15px; border-radius: 4px;">
                <strong>⚠️ Action Required:</strong> Process this order and arrange shipping within 2-3 business days.
              </p>
              
              <p><a href="https://dashboard.stripe.com/payments/${session.payment_intent}" style="background: #1a1a1a; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">View in Stripe Dashboard</a></p>
            </body>
          </html>
        `
      };

      // Sende Emails
      try {
        await transporter.sendMail(customerEmailContent);
        await transporter.sendMail(adminEmailContent);
        console.log('Order confirmation emails sent successfully');
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Continue - payment was successful even if email fails
      }

    } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}