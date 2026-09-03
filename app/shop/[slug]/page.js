import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { idFromSlug, productSlug } from '@/app/lib/slug';
import ProductDetailClient from './ProductDetailClient';
import FadeInImage from '@/app/components/FadeInImage';
import ZoomableImage from '@/app/components/ZoomableImage';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const revalidate = 3600;

async function getProduct(slug) {
  const id = idFromSlug(slug);
  if (!id) return null;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data || data.offline === true) return null;
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const title = `${product.name} – Manfred Zak`;
  const description =
    product.description ||
    `${product.name}, ${product.technique || 'oil painting'}, ${product.size || ''} by Manfred Zak (ZAK). Original artwork available at ZAK Fine Art.`;
  const canonical = `https://www.manfredzak.com/shop/${productSlug(product)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: product.image ? [{ url: product.image }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const canonicalSlug = productSlug(product);
  const canonicalUrl = `https://www.manfredzak.com/shop/${canonicalSlug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: product.name,
    image: product.image,
    description: product.description,
    artMedium: product.technique,
    artworkSurface: product.category,
    dateCreated: product.year ? String(product.year) : undefined,
    creator: {
      '@type': 'Person',
      name: 'Manfred Zak',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.sold
        ? 'https://schema.org/SoldOut'
        : product.available === false
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      url: canonicalUrl,
    },
  };

  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: String(product.id),
    brand: {
      '@type': 'Brand',
      name: 'ZAK Fine Art',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.sold
        ? 'https://schema.org/SoldOut'
        : product.available === false
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: canonicalUrl,
      seller: {
        '@type': 'Organization',
        name: 'ZAK Fine Art',
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />

      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="space-y-4">
          <ZoomableImage
            src={product.image}
            alt={`${product.name}${product.technique ? ` – ${product.technique}` : ''} von Manfred Zak`}
            wrapperClassName="overflow-hidden rounded-[15px] hover:rounded-[20px] transition-[border-radius] duration-200 ease-in shadow-lg"
            className="w-full"
          />

          {product.description && (
            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontFamily: "'Vollkorn', Georgia, serif", fontSize: '25px' }}
            >
              {product.description}
            </p>
          )}

          {product.detail_image && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">Close-up Detail</p>
              <div className="overflow-hidden rounded-lg shadow-lg aspect-[2/1]">
                <FadeInImage
                  src={product.detail_image}
                  alt={`${product.name} – close-up detail von Manfred Zak`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500">{product.artist}</p>
            <h1 className="text-2xl font-light text-gray-900">{product.name}</h1>
          </div>

          <ProductDetailClient product={product} />
        </div>
      </div>
    </div>
  );
}
