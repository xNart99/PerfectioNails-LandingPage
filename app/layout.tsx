import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Italiana, Pinyon_Script, JetBrains_Mono } from "next/font/google";
import SessionProvider from "@/components/ui/SessionProvider";
import LocalBusinessSchema from "@/components/ui/LocalBusinessSchema";
import "./globals.css";

/* ── Google Fonts loaded via next/font for optimal performance ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://perfectionails.com.au"),
  title: {
    default: "Perfectionails — Boutique Nail Salon in Camp Hill, Brisbane",
    template: "%s | Perfectionails",
  },
  description:
    "Perfectionails is a boutique nail salon in Camp Hill, Brisbane. Gel manicures, acrylics, SNS, nail art and waxing. Walk-ins welcome. Call 0489 191 550.",
  keywords: [
    "nail salon Camp Hill",
    "nail salon Brisbane",
    "gel manicure Brisbane",
    "acrylic nails Camp Hill",
    "SNS nails Brisbane",
    "nail art Brisbane",
    "boutique nail salon",
    "Camp Hill beauty",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://perfectionails.com.au",
    siteName: "Perfectionails",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/** Root layout — injects all font CSS variables and global providers. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${cormorant.variable} ${italiana.variable} ${pinyonScript.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* JSON-LD structured data for Google Local Business */}
        <LocalBusinessSchema />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
