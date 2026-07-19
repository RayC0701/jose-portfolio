import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: [
    { path: "./fonts/geist-latin-ext.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/geist-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "./fonts/geist-mono-latin-ext.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/geist-mono-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

const oswald = localFont({
  src: [
    { path: "./fonts/oswald-700-latin-ext.woff2", weight: "700", style: "normal" },
    { path: "./fonts/oswald-700-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-oswald",
  display: "swap",
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
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
