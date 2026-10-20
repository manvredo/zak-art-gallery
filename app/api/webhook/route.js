import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getStockInfo } from '@/app/lib/offers';
import { createInvoicePdf } from '@/app/lib/invoice/createInvoicePdf';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// After payment: prints with stock tracking lose the bought quantity, every
// other product (originals) is marked sold and its reservation removed.
async function markProductsSold(lineItems) {
  for (const item of lineItems) {
    const productId = Number(item.price?.product?.metadata?.product_id);
    if (!productId) continue;

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    if (error) throw error;

    const stock = getStockInfo(product);
    if (stock) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock_quantity: Math.max(0, stock.quantity - (item.quantity || 1)) })
        .eq('id', productId);
      if (updateError) throw updateError;
    } else {
      const { error: updateError } = await supabase
        .from('products')
        .update({ sold: true })
        .eq('id', productId);
      if (updateError) throw updateError;

      const { error: reservationError } = await supabase
        .from('product_reservations')
        .delete()
        .eq('product_id', productId);
      if (reservationError) throw reservationError;
    }
    console.log('Product updated after sale:', productId);
  }
}

// Builds our own invoice PDF (logo, VAT per item) for the confirmation email.
// The invoice number comes from the Stripe invoice. Returns null on failure.
async function getInvoiceAttachment(session, lineItems) {
  try {
    const invoice = session.invoice ? await stripe.invoices.retrieve(session.invoice) : null;
    const number = invoice?.number || session.id.slice(-12).toUpperCase();

    const paymentIntent = session.payment_intent
      ? await stripe.paymentIntents.retrieve(session.payment_intent, { expand: ['latest_charge'] })
      : null;

    const productIds = lineItems
      .map((item) => Number(item.price?.product?.metadata?.product_id))
      .filter(Boolean);
    const { data: products, error } = productIds.length
      ? await supabase.from('products').select('id, category').in('id', productIds)
      : { data: [] };
    if (error) throw error;

    const content = await createInvoicePdf({
      number,
      date: new Date(session.created * 1000),
      customer: {
        name: session.customer_details?.name,
        email: session.customer_details?.email,
        address: session.customer_details?.address,
      },
      shipping: session.collected_information?.shipping_details || session.shipping_details,
      charge: paymentIntent?.latest_charge,
      items: lineItems.map((item) => {
        const product = products.find((p) => p.id === Number(item.price?.product?.metadata?.product_id));
        return {
          name: item.description,
          quantity: item.quantity,
          amountTotal: item.amount_total,
          isPrint: product?.category === 'Prints',
        };
      }),
    });

    return { filename: `Rechnung-Invoice-${number}.pdf`, content };
  } catch (err) {
    console.error('Error creating invoice PDF:', err);
    return null;
  }
}

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

      if (session.payment_status === 'paid') {
        try {
          await markProductsSold(lineItems.data);
        } catch (soldError) {
          console.error('Error marking products sold:', soldError);
          // Continue - the order is saved, the product can be marked by hand
        }
      }

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

      const invoiceAttachment = await getInvoiceAttachment(session, lineItems.data);

      // Email an Kunden
      const customerEmailContent = {
        from: 'ZAK Fine Art <info@manfredzak.com>',
        to: [customerEmail],
        subject: 'Order Confirmation - ZAK Fine Art',
        ...(invoiceAttachment && { attachments: [invoiceAttachment] }),
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
                  <h1 style="margin: 0; font-weight: 300; letter-spacing: 2px;">ZAK FINE ART</h1>
                </div>
                
                <div class="content">
                  <h2 style="color: #1a1a1a; font-weight: 300;">Thank you for your order!</h2>
                  
                  <p>Dear ${customerName},</p>
                  
                  <p>Thank you for your purchase at ZAK Fine Art. Your order has been confirmed and will be carefully packaged and shipped within 2-3 business days.</p>
                  
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

                  ${invoiceAttachment ? '<p>Your invoice is attached to this email as a PDF.</p>' : ''}

                  <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px 0;">What happens next?</h4>
                    <ul style="margin: 0; padding-left: 20px;">
                      <li>You will receive shipping confirmation with tracking information</li>
                      <li>Your artwork is insured during transport</li>
                      <li>Expected delivery: 5-7 business days</li>
                    </ul>
                  </div>
                  
                  <p>If you have any questions, please contact us at <a href="mailto:info@manfredzak.com">info@manfredzak.com</a></p>

                  <p>Best regards,<br>
                  <strong>ZAK Fine Art Team</strong></p>
                </div>

                <div class="footer">
                  <p>ZAK Fine Art | Rudolf-Breitscheid-Str. 24 | 17326 Brüssow | Germany</p>
                  <p>
                    <a href="https://www.manfredzak.com/terms">Terms of Service</a>
                    &nbsp;·&nbsp;
                    <a href="https://www.manfredzak.com/withdrawal">Right of Withdrawal</a>
                  </p>
                  <p>© 2026 ZAK Fine Art. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `
      };

      // Email an dich (Admin)
      const adminEmailContent = {
        from: 'ZAK Fine Art <info@manfredzak.com>',
        to: [process.env.EMAIL_TO || 'info@manfredzak.com'],
        subject: `🎨 New Order - ${customerName}`,
        ...(invoiceAttachment && { attachments: [invoiceAttachment] }),
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

      // Sende Emails via Resend
      try {
        await resend.emails.send(customerEmailContent);
        await resend.emails.send(adminEmailContent);
        console.log('Order confirmation emails sent successfully via Resend');
      } catch (emailError) {
        console.error('Error sending emails via Resend:', emailError);
        // Continue - payment was successful even if email fails
      }

    } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}