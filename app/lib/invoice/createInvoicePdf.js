// Builds the bilingual (German/English) invoice PDF that is attached to the
// order confirmation email. Styled like the website: ZAK logo, Vollkorn for
// headings, Inter for body text.

import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const ASSET_DIR = path.join(process.cwd(), 'app', 'lib', 'invoice');

const SELLER = {
  name: 'ZAK Fine Art',
  owner: 'Manfred Zak',
  street: 'Rudolf-Breitscheid-Str. 24',
  city: '17326 Brüssow',
  country: 'Deutschland',
  email: 'info@manfredzak.com',
  phone: '+49 179 4824 300',
  web: 'www.manfredzak.com',
  vatId: 'DE328670055',
  taxNumber: '062/291/01259',
};

// Originals are sold by the artist at the reduced rate, prints at the full rate.
export const VAT_RATE_ORIGINAL = 0.07;
export const VAT_RATE_PRINT = 0.19;

const INK = rgb(0.16, 0.18, 0.21);
const ACCENT = rgb(0x56 / 255, 0x69 / 255, 0x7f / 255);
const RULE = rgb(0.85, 0.83, 0.82);
const BAND = rgb(0xee / 255, 0xe9 / 255, 0xe7 / 255);
const PAID = rgb(0.31, 0.48, 0.36);

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const RIGHT = PAGE_WIDTH - MARGIN;

const countryNames = new Intl.DisplayNames(['de'], { type: 'region' });

function formatEuro(cents) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

// Stripe splits the street over two lines; a bare house number on line 2
// belongs behind the street name.
function addressLines(address) {
  if (!address) return [];
  let street = address.line1 || '';
  let extra = address.line2 || '';
  if (/^\d+\s*[a-zA-Z]?$/.test(extra.trim())) {
    street = `${street} ${extra.trim()}`;
    extra = '';
  }
  const city = [address.postal_code, address.city].filter(Boolean).join(' ');
  let country = address.country;
  try {
    country = countryNames.of(address.country);
  } catch {
    // keep the country code
  }
  return [street, extra, city, country].filter(Boolean);
}

function sameAddress(a, b) {
  return JSON.stringify(addressLines(a)) === JSON.stringify(addressLines(b));
}

function paymentLabel(charge) {
  const details = charge?.payment_method_details;
  if (!details) return 'Online';
  if (details.card) {
    const brand = details.card.brand ? details.card.brand.charAt(0).toUpperCase() + details.card.brand.slice(1) : 'Karte';
    return `${brand} •••• ${details.card.last4}`;
  }
  const names = { paypal: 'PayPal', klarna: 'Klarna', amazon_pay: 'Amazon Pay' };
  return names[details.type] || details.type;
}

// Splits text into lines that fit maxWidth at the given font size.
function wrapText(text, font, size, maxWidth) {
  const lines = [];
  let current = '';
  for (const word of String(text).split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * @param {object} order
 * @param {string} order.number      Invoice number
 * @param {Date}   order.date        Invoice / payment date
 * @param {object} order.customer    { name, email, address }
 * @param {object} [order.shipping]  { name, address }
 * @param {object} [order.charge]    Stripe charge (for the payment method)
 * @param {Array}  order.items       [{ name, quantity, amountTotal (cents, gross), isPrint }]
 * @returns {Promise<Buffer>}
 */
export async function createInvoicePdf(order) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`Rechnung ${order.number} – ZAK Fine Art`);
  pdf.setAuthor(SELLER.owner);

  // Inter breaks when pdf-lib subsets it (glyphs go missing), so it is embedded whole.
  const loadFont = (file, subset = true) => pdf.embedFont(fs.readFileSync(path.join(ASSET_DIR, 'fonts', file)), { subset });
  const serif = await loadFont('Vollkorn-Regular.ttf');
  const serifBold = await loadFont('Vollkorn-SemiBold.ttf');
  const serifItalic = await loadFont('Vollkorn-Italic.ttf');
  const sans = await loadFont('Inter-Regular.ttf', false);
  const sansBold = await loadFont('Inter-SemiBold.ttf', false);
  const logo = await pdf.embedPng(fs.readFileSync(path.join(ASSET_DIR, 'logo.png')));

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  const text = (value, x, y, { font = sans, size = 9, color = INK, align = 'left', spacing = 0 } = {}) => {
    const str = String(value);
    const width = font.widthOfTextAtSize(str, size) + spacing * Math.max(0, str.length - 1);
    let drawX = x;
    if (align === 'right') drawX = x - width;
    if (align === 'center') drawX = x - width / 2;
    if (!spacing) {
      page.drawText(str, { x: drawX, y, size, font, color });
      return;
    }
    for (const char of str) {
      page.drawText(char, { x: drawX, y, size, font, color });
      drawX += font.widthOfTextAtSize(char, size) + spacing;
    }
  };
  const rule = (y, { x1 = MARGIN, x2 = RIGHT, thickness = 0.6, color = RULE } = {}) => {
    page.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness, color });
  };
  // Small bilingual label: German in caps, English in italics behind it.
  const label = (de, en, x, y, align = 'left') => {
    const deText = de.toUpperCase();
    const enText = `  ${en}`;
    const deWidth = sansBold.widthOfTextAtSize(deText, 6.5) + 0.8 * (deText.length - 1);
    const enWidth = serifItalic.widthOfTextAtSize(enText, 8.5);
    const startX = align === 'right' ? x - deWidth - enWidth : x;
    text(deText, startX, y, { font: sansBold, size: 6.5, color: ACCENT, spacing: 0.8 });
    text(enText, startX + deWidth, y, { font: serifItalic, size: 8.5, color: ACCENT });
  };

  // ---- Footer (on every page) ----
  const footerY = MARGIN + 30;
  const drawFooter = () => {
    rule(footerY + 16);
    const footerCols = [
      [`${SELLER.name} · ${SELLER.owner}`, SELLER.street, `${SELLER.city}, ${SELLER.country}`],
      [SELLER.email, SELLER.phone, SELLER.web],
      [`USt-IdNr. ${SELLER.vatId}`, `Steuernr. ${SELLER.taxNumber}`, 'Der Betrag wurde dankend erhalten.'],
    ];
    const colWidth = (RIGHT - MARGIN) / 3;
    footerCols.forEach((lines, i) => {
      lines.forEach((line, j) => {
        text(line, MARGIN + i * colWidth, footerY - j * 10, { size: 7.2, color: ACCENT });
      });
    });
  };
  drawFooter();

  let y;
  // Starts a new page when the next block would run into the footer.
  const ensureSpace = (height) => {
    if (y - height > footerY + 40) return;
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawFooter();
    y = PAGE_HEIGHT - MARGIN - 20;
  };

  // ---- Header: logo left, seller right ----
  const logoSize = 58;
  page.drawImage(logo, { x: MARGIN, y: PAGE_HEIGHT - MARGIN - logoSize, width: logoSize, height: logoSize * (logo.height / logo.width) });

  y = PAGE_HEIGHT - MARGIN - 12;
  text('ZAK FINE ART', RIGHT, y, { font: serifBold, size: 15, align: 'right', spacing: 2.2 });
  y -= 16;
  for (const line of [SELLER.owner, SELLER.street, `${SELLER.city} · ${SELLER.country}`, `${SELLER.email} · ${SELLER.web}`]) {
    text(line, RIGHT, y, { size: 8, color: ACCENT, align: 'right' });
    y -= 11;
  }

  // ---- Title + paid badge ----
  y = PAGE_HEIGHT - MARGIN - logoSize - 52;
  text('Rechnung', MARGIN, y, { font: serif, size: 30 });
  text('Invoice', MARGIN + serif.widthOfTextAtSize('Rechnung', 30) + 10, y, { font: serifItalic, size: 18, color: ACCENT });

  const badge = 'BEZAHLT · PAID';
  const badgeWidth = sansBold.widthOfTextAtSize(badge, 8) + 1.5 * (badge.length - 1) + 24;
  page.drawRectangle({ x: RIGHT - badgeWidth, y: y - 2, width: badgeWidth, height: 22, borderColor: PAID, borderWidth: 1.2 });
  text(badge, RIGHT - badgeWidth / 2, y + 5.5, { font: sansBold, size: 8, color: PAID, align: 'center', spacing: 1.5 });

  y -= 18;
  rule(y, { color: INK, thickness: 0.8 });

  // ---- Invoice details (left) and addresses (right) ----
  const top = y - 26;
  const paidDate = formatDate(order.date);
  const details = [
    ['Rechnungsnr.', 'Invoice no.', order.number],
    ['Rechnungsdatum', 'Invoice date', paidDate],
    ['Leistungsdatum', 'Date of supply', paidDate],
    ['Bezahlt mit', 'Paid with', paymentLabel(order.charge)],
    ['Bezahlt am', 'Paid on', paidDate],
  ];
  y = top;
  for (const [de, en, value] of details) {
    label(de, en, MARGIN, y);
    text(value, MARGIN, y - 13, { size: 10 });
    y -= 34;
  }
  const detailsBottom = y;

  const billTo = order.customer.address?.line1 ? order.customer.address : order.shipping?.address;
  const showShipping = order.shipping?.address && billTo !== order.shipping.address && !sameAddress(billTo, order.shipping.address);
  const addressX = showShipping ? 250 : 330;
  const drawAddress = (de, en, x, name, address, email) => {
    let ay = top;
    label(de, en, x, ay);
    ay -= 15;
    text(name || '', x, ay, { font: serif, size: 12.5 });
    ay -= 15;
    for (const line of addressLines(address)) {
      text(line, x, ay, { size: 9.5 });
      ay -= 13;
    }
    if (email) {
      ay -= 3;
      text(email, x, ay, { size: 9, color: ACCENT });
      ay -= 13;
    }
    return ay;
  };
  let addressBottom = drawAddress('Rechnung an', 'Bill to', addressX, order.customer.name || order.shipping?.name, billTo, order.customer.email);
  if (showShipping) {
    addressBottom = Math.min(addressBottom, drawAddress('Lieferung an', 'Ship to', 410, order.shipping.name, order.shipping.address));
  }

  // ---- Items ----
  y = Math.min(detailsBottom, addressBottom) - 8;
  const col = { qty: 345, vat: 410, amount: RIGHT };
  page.drawRectangle({ x: MARGIN, y: y - 9, width: RIGHT - MARGIN, height: 26, color: BAND });
  label('Beschreibung', 'Description', MARGIN + 10, y);
  label('Menge', 'Qty', col.qty, y, 'right');
  label('MwSt', 'VAT', col.vat + 20, y, 'right');
  label('Betrag', 'Amount', col.amount - 10, y, 'right');
  y -= 34;

  const taxGroups = new Map();
  let grossTotal = 0;
  for (const item of order.items) {
    const rate = item.isPrint ? VAT_RATE_PRINT : VAT_RATE_ORIGINAL;
    const nameLines = wrapText(item.name, serif, 12, col.qty - MARGIN - 70);
    ensureSpace(nameLines.length * 15 + 30);
    nameLines.forEach((line, i) => text(line, MARGIN + 10, y - i * 15, { font: serif, size: 12 }));
    const subtitleY = y - nameLines.length * 15 + 2;
    text(item.isPrint ? 'Kunstdruck · Art print' : 'Original-Kunstwerk · Original artwork', MARGIN + 10, subtitleY, { size: 8, color: ACCENT });
    text(String(item.quantity), col.qty, y, { size: 10, align: 'right' });
    text(`${Math.round(rate * 100)} %`, col.vat + 20, y, { size: 10, align: 'right' });
    text(formatEuro(item.amountTotal), col.amount - 10, y, { size: 10, align: 'right' });
    y = subtitleY - 18;
    rule(y + 8);
    y -= 10;

    grossTotal += item.amountTotal;
    taxGroups.set(rate, (taxGroups.get(rate) || 0) + item.amountTotal);
  }

  // ---- Totals ----
  ensureSpace(170);
  const labelX = 330;
  const valueX = RIGHT - 10;
  y -= 6;
  let netTotal = 0;
  const taxLines = [];
  for (const [rate, gross] of [...taxGroups].sort((a, b) => a[0] - b[0])) {
    const net = Math.round(gross / (1 + rate));
    netTotal += net;
    taxLines.push([rate, gross - net]);
  }
  const totalRow = (de, en, value, opts = {}) => {
    label(de, en, labelX, y + 1);
    text(value, valueX, y, { size: 10, align: 'right', ...opts });
    y -= 20;
  };
  totalRow('Nettobetrag', 'Net amount', formatEuro(netTotal));
  for (const [rate, tax] of taxLines) {
    totalRow(`zzgl. MwSt ${Math.round(rate * 100)} %`, `VAT ${Math.round(rate * 100)} %`, formatEuro(tax));
  }
  rule(y + 12, { x1: labelX, color: INK, thickness: 0.8 });
  y -= 6;
  label('Gesamtbetrag', 'Total', labelX, y + 3);
  text(formatEuro(grossTotal), valueX, y, { font: serifBold, size: 16, align: 'right' });
  y -= 24;
  totalRow('Bezahlt', 'Paid', `– ${formatEuro(grossTotal)}`, { color: PAID });
  totalRow('Offener Betrag', 'Balance due', formatEuro(0));

  // ---- Thank you ----
  y -= 22;
  ensureSpace(70);
  text('Vielen Dank für Ihren Kauf – ich wünsche Ihnen viel Freude mit dem Werk.', MARGIN, y, { font: serifItalic, size: 12 });
  y -= 16;
  text('Thank you for your purchase – I hope this work brings you lasting joy.', MARGIN, y, { font: serifItalic, size: 12, color: ACCENT });
  y -= 30;
  text('Manfred Zak', MARGIN, y, { font: serif, size: 13 });

  return Buffer.from(await pdf.save());
}
