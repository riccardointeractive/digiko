import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { KleverProvider } from "@/context/KleverContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ErrorProvider } from "@/context/ErrorContext";

export const dynamic = 'force-dynamic';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Digiko - DeFi Ecosystem on Klever Blockchain",
  description: "Stake DGKO and BABYDGKO tokens, manage your portfolio, and access DeFi features on the Klever blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <KleverProvider>
          <ErrorProvider>
            <Header />
            {children}
            <Footer />
          </ErrorProvider>
        </KleverProvider>
      </body>
    </html>
  );
}
