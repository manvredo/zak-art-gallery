import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyNewsletterToken } from '../_lib/token';
import { getOrCreateAudienceId } from '../_lib/audience';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get('token');

  const payload = verifyNewsletterToken(token, 'unsubscribe');
  if (!payload) {
    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=invalid`);
  }

  const { email } = payload;

  try {
    const audienceId = await getOrCreateAudienceId(resend);
    if (!audienceId) {
      console.error('Newsletter unsubscribe: could not find or create audience');
      return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=error`);
    }

    const { error } = await resend.contacts.update({
      audienceId,
      email,
      unsubscribed: true
    });

    if (error && !error.message?.includes('not found')) {
      console.error('Newsletter unsubscribe contact update error:', error);
      return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=error`);
    }

    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=success`);
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.redirect(`${origin}/newsletter/unsubscribed?status=error`);
  }
}
