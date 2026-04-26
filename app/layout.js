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
    default: "ZAK Fine Art — Manfred Zak | Contemporary Fine Art",
    template: "%s | ZAK Fine Art — Manfred Zak",
  },
  description: "Manfred Zak, born 1970 in Stuttgart, is a German painter, draughtsman and graphic artist. Landscape is his territory — worked in oil, oil stick and drawing, mostly in the studio, sometimes under open skies.",
  keywords: [
    "Manfred Zak",
    "ZAK Fine Art",
    "ZAK Artist",
    "ZAK Künstler",
    "oil painting",
    "oil stick",
    "charcoal drawing",
    "contemporary fine art",
    "large format painting",
    "semi-realistic painting",
    "original paintings",
    "art prints",
    "fine art Germany",
    "bildender Künstler",
  ],
  authors: [{ name: "Manfred Zak" }],
  creator: "Manfred Zak",
  verification: {
    google: "BgvFvpANeaS6QMU87MuetLkegA1-pQlUzEDPjo9WiYs",
  },
  metadataBase: new URL("https://www.manfredzak.com"),
  openGraph: {
    title: "ZAK Fine Art — Manfred Zak | Contemporary Fine Art",
    description: "Contemporary fine art by Manfred Zak (ZAK). Large-format oil paintings and oil stick works with dark earthy tones.",
    url: "https://www.manfredzak.com",
    siteName: "ZAK Fine Art",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAK Fine Art — Manfred Zak",
    description: "Contemporary fine art by Manfred Zak (ZAK). Large-format oil paintings and oil stick works.",
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

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ZAK Fine Art",
              "url": "https://www.manfredzak.com",
              "logo": "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760947393/zvhelvtagpo05uzpkesx.png",
              "description": "Contemporary fine art by Manfred Zak (ZAK). Large-format oil paintings and oil stick works with dark earthy tones. Originals and prints available.",
              "founder": {
                "@type": "Person",
                "name": "Manfred Zak",
                "jobTitle": "Fine Artist",
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

        {/* WebSite Schema */}
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

        {/* Person / VisualArtist Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Manfred Zak",
              "alternateName": "ZAK",
              "url": "https://www.manfredzak.com",
              "image": "https://res.cloudinary.com/dhjcx2xdd/image/upload/v1760947393/zvhelvtagpo05uzpkesx.png",
              "jobTitle": "Fine Artist",
              "description": "Manfred Zak, known as ZAK, is a contemporary fine artist based in Germany. He works with oil paint, oil stick, charcoal and pencil, creating large-format semi-realistic works with dark earthy tones.",
              "knowsAbout": [
                "Oil Painting",
                "Oil Stick",
                "Charcoal Drawing",
                "Fine Art",
                "Contemporary Art",
                "Large Format Painting"
              ],
              "nationality": {
                "@type": "Country",
                "name": "Germany"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "ZAK Fine Art",
                "url": "https://www.manfredzak.com"
              },
              "sameAs": []
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