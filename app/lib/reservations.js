// Shared logic for products reserved for a specific customer (access code).

// No 0/O, 1/I/L - the code is often read out or typed from a message.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 8;

export function normalizeAccessCode(code) {
  return String(code || '').trim().toUpperCase().replace(/\s+/g, '');
}

export function generateAccessCode() {
  const bytes = new Uint32Array(CODE_LENGTH);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (n) => CODE_ALPHABET[n % CODE_ALPHABET.length]).join('');
}

// A reserved product counts as reserved only while it's still for sale.
export function isReserved(product) {
  return product?.reserved === true && product?.sold !== true;
}
