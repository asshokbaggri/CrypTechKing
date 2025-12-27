import "./globals.css";

export const metadata = {
  title: "CrypTechKing 👑",
  description: "Real-time crypto whale alerts"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
