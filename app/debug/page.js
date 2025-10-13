'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import ContentHeader from '@/app/components/ContentHeader';
import ContentSidebar from '@/app/components/ContentSidebar';

export default function DebugPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">🐛 Sidebar Debug Page</h1>

      {/* Test 1: ContentHeader */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">✅ Test 1: ContentHeader</h2>
        <ContentHeader currentCategory="news" />
      </div>

      {/* Test 2: ContentSidebar Component */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">✅ Test 2: ContentSidebar Component</h2>
        <p className="mb-4">Trying to render ContentSidebar:</p>
        <div className="border-2 border-green-500 p-4">
          <ContentSidebar currentCategory="news" />
        </div>
      </div>

      {/* Test 3: Grid Layout */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">✅ Test 3: Grid Layout Test</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-gray-100 p-4">
          <div className="lg:col-span-1 bg-blue-200 p-4 rounded">
            <p className="font-bold">SIDEBAR BEREICH</p>
            <ContentSidebar currentCategory="news" />
          </div>
          <div className="lg:col-span-3 bg-green-200 p-4 rounded">
            <p className="font-bold">MAIN CONTENT BEREICH</p>
            <p>Hier wäre der Artikel...</p>
          </div>
        </div>
      </div>

      {/* Test 4: File Check */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">✅ Test 4: Import Check</h2>
        <p className="mb-2">✓ ContentHeader importiert: {ContentHeader ? 'JA' : 'NEIN'}</p>
        <p className="mb-2">✓ ContentSidebar importiert: {ContentSidebar ? 'JA' : 'NEIN'}</p>
        <p className="text-sm text-gray-600 mt-4">
          Wenn "NEIN", dann existiert die Datei nicht oder hat einen Fehler!
        </p>
      </div>
    </div>
  );
}