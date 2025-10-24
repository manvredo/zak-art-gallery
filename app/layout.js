import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './providers';
import Header from './components/Header';
import Footer from './components/Footer';
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
  title: "ZAK Art Gallery - Original Oil Paintings",
  description: "Discover extraordinary art from emerging and established artists. Original oil paintings, contemporary art, and unique masterpieces.",
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
    <html lang="en">
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
                <Footer />
              </div>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}