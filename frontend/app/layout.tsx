import "./globals.css";

export const metadata = {
  title: "Bitcoin Halving Countdown | CrypTechKing",
  description: "Live Bitcoin Halving countdown with real blockchain data"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
