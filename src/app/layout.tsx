import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metal Packages Industries | Premium Aluminium Collapsible Tubes Manufacturer in Pakistan",
  description:
    "Metal Packages Industries is a leading manufacturer of high-quality flexible aluminium collapsible tubes for pharmaceutical, cosmetic, food, and industrial applications. ISO 9001:2015 certified, GMP compliant. 40+ years of manufacturing excellence in Karachi, Pakistan.",
  keywords:
    "aluminium collapsible tubes, aluminum tubes manufacturer, flexible packaging, pharmaceutical tubes, cosmetic tubes, metal packaging, collapsible tubes manufacturer Pakistan, aluminium tubes Karachi, Metal Packages Industries, industrial tubes, food grade tubes",
  metadataBase: new URL("https://metalpackagesindustries.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Metal Packages Industries | Aluminium Collapsible Tubes Manufacturer",
    description:
      "Leading manufacturer of flexible aluminium collapsible tubes for pharmaceutical, cosmetic & food industries. 40+ years of excellence. ISO 9001:2015 certified.",
    type: "website",
    locale: "en_US",
    url: "https://metalpackagesindustries.com",
    siteName: "Metal Packages Industries",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metal Packages Industries | Aluminium Collapsible Tubes",
    description:
      "Leading manufacturer of flexible aluminium collapsible tubes for pharmaceutical, cosmetic & food industries. 40+ years of excellence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Metal Packages Industries",
              url: "https://metalpackagesindustries.com",
              logo: "https://metalpackagesindustries.com/hero.png",
              description:
                "Leading manufacturer of premium quality flexible aluminium collapsible tubes for pharmaceutical, cosmetic, food, and industrial applications in Pakistan.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "78/A, Sector 5/D, Jam Sab Road, Baldia Town",
                addressLocality: "Karachi",
                addressRegion: "Sindh",
                postalCode: "75760",
                addressCountry: "PK",
              },
              telephone: "+92-21-32815885",
              email: "metalpackages@hotmail.com",
              foundingDate: "1986",
              sameAs: ["https://www.facebook.com/share/1LAufepF2N/"],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Pharmaceutical Aluminium Collapsible Tubes",
                    description: "GMP compliant aluminium tubes for ointments, creams, and medications",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Cosmetic Aluminium Collapsible Tubes",
                    description: "Premium offset-printed aluminium tubes for beauty and cosmetic products",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Food & Industrial Aluminium Collapsible Tubes",
                    description: "Food-grade and industrial aluminium tubes with specialized coatings",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
