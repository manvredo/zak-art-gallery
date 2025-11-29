import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items } = await request.json();

    const session = await stripe.checkout.sessions.create({
      // ALLE Payment-Methoden aktiviert
      payment_method_types: [
        'card',           // Kreditkarten (Visa, Mastercard, Amex)
        'paypal',         // PayPal
        'amazon_pay',     // Amazon Pay
        'klarna',         // Klarna (Ratenzahlung + Sofort)
        'customer_balance' // Banküberweisung (wenn freigeschaltet)
      ],
      
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.image],
            description: `${item.artist} - ${item.size}`,
          },
          unit_amount: item.price * 100, // Stripe nutzt Cents
        },
        quantity: item.quantity,
      })),
      
      mode: 'payment',
      
      // URLs
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      
      // Automatische Steuerberechnung (optional)
      automatic_tax: {
        enabled: false, // Auf true setzen wenn du Stripe Tax nutzt
      },
      
      // Shipping Address Collection (falls du Adressen brauchst)
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH', 'FR', 'IT', 'NL', 'BE', 'ES', 'PT', 'GB', 'US'],
      },
      
      // Locale (Sprache)
      locale: 'de',
    });

    return NextResponse.json({ url: session.url });
    
  } catch (err) {
    console.error('Stripe Fehler:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}