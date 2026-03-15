import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website & App Development Company | YourBrandBuilders",
  description:
    "Premium website and mobile app development (iOS & Android) based in Khammam, serving Hyderabad, Vijayawada, Vizag, and clients globally. Custom digital infrastructure with no templates.",
  keywords: ["website development Hyderabad", "app development Vizag", "software company Vijayawada", "Khammam software company", "website design Telangana", "Andhra Pradesh web studio", "global website studio"],
  authors: [{ name: "YourBrandBuilders" }],
  openGraph: {
    title: "YourBrandBuilders — Infrastructure Studio",
    description: "Custom digital infrastructure engineered from zero. Built for scale.",
    url: "https://yourbrandbuilders.com",
    siteName: "YourBrandBuilders",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or suggest creating it
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourBrandBuilders — Infrastructure Studio",
    description: "Custom digital infrastructure engineered from zero.",
    images: ["/og-image.png"],
  },
};

import { Spotlight } from "@/components/ui/Spotlight";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "var(--background)", transition: "background-color 0.3s ease" }}
      >
        <Providers>
          <ScrollProgress />
          <Spotlight />
          {/* ── OS-level fixed backgrounds ─────────────────────────────
              Blueprint grid + ambient blue glow sit behind the frame.
              These are fixed so they persist during page scroll.       */}
          <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--c-frame-grid) 1px, transparent 1px)," +
                "linear-gradient(to bottom, var(--c-frame-grid) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 55%, var(--c-frame-glow) 0%, transparent 65%)",
            }}
          />

          {/* ── Full Bleed Site Layout ───────────────────────────────────── */}
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>

        </Providers>
      </body>
    </html>
  );
}
