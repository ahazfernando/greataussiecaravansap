import type { Metadata } from "next";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";
import "./globals.css";

const siteUrl = "https://greataussiecaravans.com.au";
const logoPath = "/logo/greataussielogo.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Great Aussie Caravans | Quality Australian-Built Caravans",
  description:
    "Family-owned Australian caravan manufacturer. Premium off-grid, family, and touring caravans built for adventure. Over 25 years of quality craftsmanship.",
  keywords:
    "caravans, Australian caravans, off-grid caravans, family caravans, touring caravans, caravan manufacturer, Melbourne caravans",
  authors: [{ name: "Great Aussie Caravans" }],
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Great Aussie Caravans",
    title: "Great Aussie Caravans | Quality Australian-Built Caravans",
    description:
      "Family-owned Australian caravan manufacturer. Premium off-grid, family, and touring caravans built for adventure.",
    images: [
      {
        url: logoPath,
        alt: "Great Aussie Caravans logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GreatAussieCaravans",
    title: "Great Aussie Caravans | Quality Australian-Built Caravans",
    description:
      "Family-owned Australian caravan manufacturer. Premium off-grid, family, and touring caravans built for adventure.",
    images: [
      {
        url: logoPath,
        alt: "Great Aussie Caravans logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" type="image/png" href={logoPath} />
        <link rel="shortcut icon" type="image/png" href={logoPath} />
        <link rel="apple-touch-icon" href={logoPath} />
        <link rel="canonical" href={`${siteUrl}/`} />
      </head>
      <body>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}

