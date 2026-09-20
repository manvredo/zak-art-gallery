export const metadata = {
  title: "ArtWingman — Free Color Analysis & Grading Tool for Artists",
  description: "ArtWingman is a free tool for painters and artists: analyze color values in reference photos, generate palettes, and use Munsell-based tone curves to improve your paintings.",
  keywords: [
    "ArtWingman",
    "color analysis tool for artists",
    "free color tool for painters",
    "Munsell color system",
    "tone curves for painting",
    "palette generator for painters",
    "reference photo color analysis",
    "color grading for artists",
  ],
  openGraph: {
    title: "ArtWingman — Free Color Analysis & Grading Tool for Artists",
    description: "Analyze reference photos, generate palettes, and use Munsell-based tone curves — a free companion tool for painters, built by Manfred Zak.",
    url: "https://www.manfredzak.com/artwingman",
    images: [
      {
        url: "/artwingman/Artwingman-1920_01.jpg",
        width: 1920,
        height: 1080,
        alt: "ArtWingman — color analysis tool for artists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtWingman — Free Color Analysis & Grading Tool for Artists",
    description: "A free companion tool for painters: color analysis, palettes and Munsell-based tone curves.",
    images: ["/artwingman/Artwingman-1920_01.jpg"],
  },
  alternates: {
    canonical: "https://www.manfredzak.com/artwingman",
  },
};

export default function ArtwingmanLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ArtWingman",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web",
            "description": "Free color analysis and grading tool for painters and artists, featuring the Munsell color system, tone curves and palette generation.",
            "url": "https://artwingman.com",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
            },
            "creator": {
              "@type": "Person",
              "name": "Manfred Zak",
              "url": "https://www.manfredzak.com",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
