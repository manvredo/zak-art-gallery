'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import ContentHeader from '@/app/components/ContentHeader';

export default function DebugPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">🐛 Debug Page</h1>

      {/* Test 1: Language Context */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">✅ Test 1: Language Context</h2>
        <p className="mb-2"><strong>Current Language:</strong> {language}</p>
        <p className="mb-2"><strong>t exists:</strong> {t ? '✅ YES' : '❌ NO'}</p>
        <p className="mb-2"><strong>t.content exists:</strong> {t?.content ? '✅ YES' : '❌ NO'}</p>
        <p className="mb-2"><strong>t.content.news exists:</strong> {t?.content?.news ? '✅ YES' : '❌ NO'}</p>
        <p className="mb-2"><strong>t.content.news.title:</strong> {t?.content?.news?.title || '❌ MISSING'}</p>
      </div>

      {/* Test 2: ContentHeader Component */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">✅ Test 2: ContentHeader Component</h2>
        <p className="mb-4">Trying to render ContentHeader with category="news":</p>
        <div className="border-2 border-blue-500 p-4">
          <ContentHeader currentCategory="news" />
        </div>
      </div>

      {/* Test 3: All Translations */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">✅ Test 3: Content Translations</h2>
        <div className="space-y-2">
          <p><strong>News Title:</strong> {t?.content?.news?.title || '❌'}</p>
          <p><strong>News Description:</strong> {t?.content?.news?.description || '❌'}</p>
          <p><strong>Stories Title:</strong> {t?.content?.stories?.title || '❌'}</p>
          <p><strong>Press Title:</strong> {t?.content?.press?.title || '❌'}</p>
          <p><strong>Private Title:</strong> {t?.content?.private?.title || '❌'}</p>
        </div>
      </div>

      {/* Test 4: Raw Translation Object */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">✅ Test 4: Raw t.content Object</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(t?.content, null, 2)}
        </pre>
      </div>
    </div>
  );
}