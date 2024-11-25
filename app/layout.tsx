import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/universal/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], // Specify subsets
  variable: "--font-inter", // Optional: Create a CSS variable for the font
});

export const metadata: Metadata = {
  title: "Wayfinder",
  description: "Find your way to unique travel experiences!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
