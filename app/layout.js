import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './providers';
import Header from './components/Header';
import Footer from './components/Footer';
import FooterExtension from './components/FooterExtension';
import CookieBanner from './components/CookieBanner';
import "./globals.css";
import "./styles/art-gallery.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ZAK Fine Art — Manfred Zak | Contemporary Art",
    template: "%s | ZAK Fine Art — Manfred Zak",
  },
  description: "Contemporary oil paintings by Manfred Zak. Original artwork, landscapes, wildlife and florals. Prints and originals available.",
  keywords: ["Manfred Zak", "ZAK Fine Art", "oil painting", "contemporary art", "original paintings", "art prints", "landscape painting", "wildlife art"],
  authors: [{ name: "Manfred Zak" }],
  creator: "Manfred Zak",
  metadataBase: new URL("https://www.manfredzak.com"),
  openGraph: {
    title: "ZAK Fine Art — Manfred Zak | Contemporary Art",
    description: "Contemporary oil paintings by Manfred Zak. Original artwork, landscapes, wildlife and florals.",
    url: "https://www.manfredzak.com",
    siteName: "ZAK Fine Art",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAK Fine Art — Manfred Zak",
    description: "Contemporary oil paintings by Manfred Zak.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760947127/hi1xus7wdvma3mlv74ii.png",
        sizes: "any",
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="stylesheet" href="/footer-extension.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ZAK Fine Art",
              "url": "https://www.manfredzak.com",
              "logo": "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760947393/zvhelvtagpo05uzpkesx.png",
              "description": "Contemporary oil paintings by Manfred Zak. Original artwork, landscapes, wildlife and florals.",
              "founder": {
                "@type": "Person",
                "name": "Manfred Zak",
                "jobTitle": "Artist",
                "url": "https://www.manfredzak.com/vita"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+49-152-25179626",
                "contactType": "customer service",
                "email": "info@manfredzak.com",
                "availableLanguage": ["English", "German"]
              },
              "sameAs": [],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "DE"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ZAK Fine Art",
              "url": "https://www.manfredzak.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.manfredzak.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <FooterExtension />
                <Footer />
              </div>
              <CookieBanner />
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}