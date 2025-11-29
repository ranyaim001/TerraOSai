import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TerraOS - Global Dashboard",
  description: "Visualizing unseen connections, gamifying global cooperation, and providing solutions for economic stability, governance, and health.",
  keywords: ["TerraOS", "Global Dashboard", "Planetary Health", "Economic Solutions", "Governance", "Bio-Twin"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
