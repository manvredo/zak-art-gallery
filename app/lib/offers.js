// Shared logic for time-limited offers (sale price + countdown) on products.

export function getActiveOffer(product) {
  if (!product?.sale_price || !product?.sale_end_date) return null;

  const salePrice = Number(product.sale_price);
  const regularPrice = Number(product.price);
  const endDate = new Date(product.sale_end_date);

  if (!Number.isFinite(salePrice) || !Number.isFinite(regularPrice)) return null;
  if (salePrice <= 0 || salePrice >= regularPrice) return null;
  if (Number.isNaN(endDate.getTime()) || endDate <= new Date()) return null;

  return { price: salePrice, endDate };
}

export function getEffectivePrice(product) {
  const offer = getActiveOffer(product);
  return offer ? offer.price : Number(product.price);
}

export function getStockInfo(product) {
  if (product?.category !== 'Prints' || product?.stock_quantity === null || product?.stock_quantity === undefined) {
    return null;
  }
  const quantity = Number(product.stock_quantity);
  if (!Number.isFinite(quantity)) return null;

  const editionSize = product.edition_size !== null && product.edition_size !== undefined
    ? Number(product.edition_size)
    : null;

  return {
    quantity,
    editionSize: Number.isFinite(editionSize) ? editionSize : null,
    isOutOfStock: quantity <= 0,
  };
}
