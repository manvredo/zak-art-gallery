if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  
  // Hole die Line Items von Stripe
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  
  const { error } = await supabase
    .from('orders')
    .insert({
      stripe_session_id: session.id,
      customer_email: session.customer_details.email,
      customer_name: session.customer_details.name,
      amount_total: session.amount_total,
      status: 'paid',
      items: lineItems.data
    });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}