import { getArticleMetadata } from '@/app/lib/articleMetadata';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return getArticleMetadata('story', slug);
}

export default function StoryArticleLayout({ children }) {
  return children;
}
