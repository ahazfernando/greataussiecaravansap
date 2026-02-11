import type { Metadata } from "next";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Great Aussie Caravans | Quality Australian-Built Caravans",
  description: "Family-owned Australian caravan manufacturer. Premium off-road, family, and touring caravans built for adventure. Over 25 years of quality craftsmanship.",
  keywords: "caravans, Australian caravans, off-road caravans, family caravans, touring caravans, caravan manufacturer, Melbourne caravans",
  authors: [{ name: "Great Aussie Caravans" }],
  icons: {
    icon: "/logo/greataussielogo.png",
    apple: "/logo/greataussielogo.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: "website",
    url: "https://greataussiecaravans.com.au/",
    title: "Great Aussie Caravans | Quality Australian-Built Caravans",
    description: "Family-owned Australian caravan manufacturer. Premium off-road, family, and touring caravans built for adventure.",
    images: ["https://greataussiecaravans.com.au/logo/greataussielogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GreatAussieCaravans",
    title: "Great Aussie Caravans | Quality Australian-Built Caravans",
    description: "Family-owned Australian caravan manufacturer. Premium off-road, family, and touring caravans built for adventure.",
    images: ["https://greataussiecaravans.com.au/logo/greataussielogo.png"],
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
        <link rel="icon" type="image/png" href="/logo/greataussielogo.png" />
        <link rel="apple-touch-icon" href="/logo/greataussielogo.png" />
        <link rel="canonical" href="https://greataussiecaravans.com.au/" />
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

