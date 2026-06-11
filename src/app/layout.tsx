import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metal Packages | Premium Aluminium Collapsible Tubes Manufacturer",
  description: "Metal Packages is a leading manufacturer of high-quality flexible aluminium collapsible tubes for pharmaceutical, cosmetic, food, and industrial applications. ISO certified, GMP compliant manufacturing excellence.",
  keywords: "aluminium collapsible tubes, aluminum tubes, flexible packaging, pharmaceutical tubes, cosmetic tubes, metal packaging, collapsible tubes manufacturer, Pakistan aluminium tubes",
  openGraph: {
    title: "Metal Packages | Premium Aluminium Collapsible Tubes",
    description: "Leading manufacturer of flexible aluminium collapsible tubes for pharmaceutical, cosmetic & food industries.",
    type: "website",
    locale: "en_US",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
