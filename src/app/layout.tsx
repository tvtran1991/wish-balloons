import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
