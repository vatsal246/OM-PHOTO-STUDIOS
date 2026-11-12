import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { ActionModalsProvider } from "@/components/ActionModalsContext";

export const metadata: Metadata = {
  title: "Passport Photo Studio in Malad West | Om Photo Studio",
  description:
    "Professional passport, visa, and studio photography near Patla Devi Temple, Bhailal Road, Somvari Bazar, Malad West, Mumbai – 400064. Fast 15-minute service for India, USA, UK, Schengen, and Canada.",
  keywords: [
    "Passport photo Malad West",
    "Visa photo Malad",
    "Om Photo Studio",
    "Dharmesh Pithwa",
    "Somvari Bazar photo studio",
    "Patla Devi Temple photography",
    "US visa photo Mumbai",
    "Schengen visa photo Malad",
    "Photo printing Malad West",
  ],
  authors: [{ name: "Dharmesh Pithwa - Om Photo Studio" }],
  creator: "Om Photo Studio",
  openGraph: {
    title: "Passport Photo Studio in Malad West | Om Photo Studio",
    description:
      "Fast, professional passport and visa photos compliant with official embassy standards. Located at Shop No. 1, Somvari Bazar, Malad West, Mumbai.",
    url: "http://localhost:3000",
    siteName: "Om Photo Studio",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Om Photo Studio",
    image: "http://localhost:3000/gallery/passport-setup.svg",
    founder: {
      "@type": "Person",
      name: "Dharmesh Pithwa",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 1, Monday Market, Near Patla Devi Temple, Bhailal Road, Somvari Bazar",
      addressLocality: "Malad West",
      addressRegion: "Maharashtra",
      postalCode: "400064",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.182917,
      longitude: 72.842194,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:30",
        closes: "17:00",
      },
    ],
    priceRange: "₹₹",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Passport Size Photographs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visa Photographs (US, UK, Schengen, Canada)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "General Photography and Portraits",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photo Printing & Digital Copies",
          },
        },
      ],
    },
    areaServed: [
      "Malad West",
      "Somvari Bazar",
      "Bhailal Road",
      "Kandivali West",
      "Goregaon West",
      "Mumbai",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAFBFD]">
        <LanguageProvider>
          <ActionModalsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ActionModalsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

