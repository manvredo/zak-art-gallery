import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}`,
    });

    // Gibt die komplette URL zurück statt nur sessionId
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Fehler:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}