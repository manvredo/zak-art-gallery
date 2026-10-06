import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { normalizeAccessCode } from '@/app/lib/reservations';

// Service role: product_reservations has no public read policy, so the
// access codes never reach the browser except the one the customer typed.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { code } = await request.json();
    const accessCode = normalizeAccessCode(code);
    if (accessCode.length < 4) {
      return NextResponse.json({ error: 'invalid_code' }, { status: 401 });
    }

    const { data: reservations, error } = await supabase
      .from('product_reservations')
      .select('product_id, customer_name')
      .eq('access_code', accessCode);

    if (error) throw error;
    if (!reservations?.length) {
      return NextResponse.json({ error: 'invalid_code' }, { status: 401 });
    }

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('id', reservations.map((r) => r.product_id))
      .eq('reserved', true)
      .order('sort_order', { ascending: true, nullsFirst: false });

    if (productsError) throw productsError;

    return NextResponse.json({
      customerName: reservations[0].customer_name || null,
      products: (products || []).filter((p) => p.offline !== true),
    });
  } catch (err) {
    console.error('Client access error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
