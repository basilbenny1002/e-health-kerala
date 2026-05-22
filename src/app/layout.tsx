import type { Metadata } from "next";
import "./globals.css";
// FIXED: Changed from absolute '@/' alias to clean relative pathing
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "CarePulse Platform",
  description: "Secure clinical gateway for citizens and practitioners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* FIXED: Removed the geistSans and geistMono variable references to bypass network errors */}
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}