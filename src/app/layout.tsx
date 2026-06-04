import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jose-portfolio-joses-projects-933b60ea.vercel.app"),
  title: "Jose Canales — AI Engineer | Technical Founder",
  description:
    "Building production-grade AI systems that ship, scale, and survive. 12+ production systems, +$193K signal PnL, 2,428 tests passing.",
  openGraph: {
    title: "Jose Canales — AI Engineer | Technical Founder",
    description:
      "Building production-grade AI systems that ship, scale, and survive.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jose Canales — AI Engineer | Technical Founder",
    description:
      "Building production-grade AI systems that ship, scale, and survive.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
