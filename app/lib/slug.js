export function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[^\x00-\x7f]/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function productSlug(product) {
  return `${slugify(product.name)}-${product.id}`;
}

export function idFromSlug(slug) {
  const match = String(slug).match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}
