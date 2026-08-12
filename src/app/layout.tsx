import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

// TODO: replace with the real production domain once it's connected, e.g. "https://www.dobletoma.com"
const siteUrl = "https://doble-toma-website-7ve6rmbel-dobletoma-s-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Doble Toma — Creative Content Studio",
  description:
    "Doble Toma is a creative content studio creating visuals for boutique hotels, villas, and luxury stays around the world.",
  keywords: [
    "creative content studio",
    "boutique hotel content",
    "luxury villa photography",
    "hotel content creation",
    "travel content creation",
    "social media reels",
    "drone photography hotels",
    "UGC hospitality",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Doble Toma — Creative Content Studio",
    description:
      "Content for boutique hotels, villas, and luxury stays — capturing the essence of elevated spaces.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Doble Toma — Creative Content Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doble Toma — Creative Content Studio",
    description:
      "Content for boutique hotels, villas, and luxury stays — capturing the essence of elevated spaces.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
