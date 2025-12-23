import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitcoin Halving Countdown 2028 | CrypTechKing",
  description:
    "Live Bitcoin halving countdown with real-time blockchain data, market stats, and historical insights.",
  openGraph: {
    title: "Bitcoin Halving Countdown 2028",
    description:
      "Track the next Bitcoin halving with live countdown, price data, and halving history.",
    images: ["/og.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Halving Countdown 2028",
    description:
      "Live blockchain-powered Bitcoin halving tracker by CrypTechKing",
    images: ["/og.png"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
