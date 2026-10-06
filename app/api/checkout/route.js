import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { normalizeAccessCode } from '@/app/lib/reservations';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Re-checks the cart against the database: sold/offline paintings can't be
// bought, and a reserved painting only with its customer's access code.
// Returns an error message, or null when the cart is fine.
async function validateCart(items) {
  const ids = items.map((item) => item.id).filter((id) => id != null);
  if (!ids.length) return null;

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, sold, offline, reserved')
    .in('id', ids);
  if (error) throw error;

  const { data: reservations, error: reservationsError } = await supabase
    .from('product_reservations')
    .select('product_id, access_code')
    .in('product_id', ids);
  if (reservationsError) throw reservationsError;

  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) continue;
    if (product.sold || product.offline) {
      return `"${product.name}" is no longer available.`;
    }
    if (product.reserved) {
      const reservation = reservations.find((r) => r.product_id === product.id);
      if (!reservation || reservation.access_code !== normalizeAccessCode(item.reservation_code)) {
        return `"${product.name}" is reserved for another customer.`;
      }
    }
  }
  return null;
}

export async function POST(request) {
  try {
    const { items, language = 'de' } = await request.json();

    const cartError = await validateCart(items);
    if (cartError) {
      return NextResponse.json({ error: cartError }, { status: 409 });
    }

    // Determine locale for Stripe Checkout
    const locale = language === 'de' ? 'de' : 'en';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'amazon_pay', 'klarna'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description || '',
          },
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart?canceled=true`,
      locale: locale,
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH', 'FR', 'IT', 'NL', 'BE', 'ES', 'PT', 'GB', 'US']
      },
      // Automatically create invoice with receipt for customer
      invoice_creation: {
        enabled: true,
      },
      // Require the customer to actively accept the terms/withdrawal policy
      // before paying, per EU distance-selling disclosure requirements.
      consent_collection: {
        terms_of_service: 'required',
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: locale === 'de'
            ? `Ich akzeptiere die [Allgemeinen Geschäftsbedingungen](${request.headers.get('origin')}/terms) und habe die [Widerrufsbelehrung](${request.headers.get('origin')}/withdrawal) zur Kenntnis genommen.`
            : `I accept the [Terms of Service](${request.headers.get('origin')}/terms) and have read the [Right of Withdrawal](${request.headers.get('origin')}/withdrawal).`,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}