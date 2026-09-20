import { getArticleMetadata } from '@/app/lib/articleMetadata';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return getArticleMetadata('press', slug);
}

export default function PressArticleLayout({ children }) {
  return children;
}
