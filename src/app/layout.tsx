import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wish Balloons — Lunar New Year 2026",
  description:
    "Create a virtual wish balloon and release it into the sky for Lunar New Year 2026. Share your hopes and dreams with the world.",
  openGraph: {
    title: "Wish Balloons — Lunar New Year 2026",
    description:
      "Create a virtual wish balloon and release it into the sky for Lunar New Year 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}
