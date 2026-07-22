import crypto from 'crypto';

function getSecret() {
  const secret = process.env.NEWSLETTER_TOKEN_SECRET;
  if (!secret) {
    throw new Error('NEWSLETTER_TOKEN_SECRET is not configured');
  }
  return secret;
}

const TOKEN_TTL_MS = 48 * 60 * 60 * 1000; // 48h

export function createNewsletterToken(email, language = 'de') {
  const payload = Buffer.from(
    JSON.stringify({ email, language, exp: Date.now() + TOKEN_TTL_MS })
  ).toString('base64url');
  const signature = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyNewsletterToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;

  const [payload, signature] = token.split('.');
  const expectedSignature = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
