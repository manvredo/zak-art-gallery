import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Shared generateMetadata for content-table article detail pages (story,
// press, archive) so each article gets its own title/description/OG tags
// instead of inheriting the generic site-wide default.
export async function getArticleMetadata(category, slug) {
  const { data: article } = await supabase
    .from('content')
    .select('title, excerpt, featured_image, slug')
    .eq('category', category)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!article) return {};

  const title = article.title;
  const description = article.excerpt || undefined;
  const canonical = `https://www.manfredzak.com/${category}/${article.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: article.featured_image ? [{ url: article.featured_image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: article.featured_image ? [article.featured_image] : undefined,
    },
  };
}
