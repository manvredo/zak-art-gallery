import { getArticleMetadata } from '@/app/lib/articleMetadata';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return getArticleMetadata('archive', slug);
}

export default function ArchiveArticleLayout({ children }) {
  return children;
}
