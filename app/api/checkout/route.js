import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items, language = 'de' } = await request.json();
    
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
          unit_amount: item.price * 100, // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart?canceled=true`,
      locale: locale, // German or English Stripe interface
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH', 'FR', 'IT', 'NL', 'BE', 'ES', 'PT', 'GB', 'US']
      },
    });

    // FIX: Return both sessionId AND url
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}