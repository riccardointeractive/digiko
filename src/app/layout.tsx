import type { Metadata } from "next";
import "./globals.css";
import { KleverProvider } from "@/context/KleverContext";

export const dynamic = 'force-dynamic';

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
      <body className="antialiased">
        <KleverProvider>
          {children}
        </KleverProvider>
      </body>
    </html>
  );
}
