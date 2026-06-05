import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elgari Alfiras - Portfolio",
  description: "Digital Creator & Content Strategist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Pastikan tidak ada overflow-x-hidden di body ini */}
      <body className={`${inter.className} cursor-none bg-[#1C1D20]`} suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}