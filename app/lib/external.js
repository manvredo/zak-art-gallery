// Products listed on a marketplace are bought there instead of via our cart.

const PLATFORM_NAMES = {
  'artfinder.com': 'Artfinder',
  'dailypaintworks.com': 'DailyPaintWorks',
  'singulart.com': 'Singulart',
};

export function platformName(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return PLATFORM_NAMES[host] || host;
  } catch {
    return url;
  }
}

export function buyOnLabel(t, url) {
  return t.shop.buyOn.replace('{platform}', platformName(url));
}

// "On request" products (large formats) are enquired about via the contact form.
export function inquiryHref(product) {
  return `/contact?artwork=${encodeURIComponent(product.id)}`;
}
