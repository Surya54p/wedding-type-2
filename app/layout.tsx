import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CurtainIntro from "@/components/CurtainIntro";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aris & Hana Wedding",
  description: "You are invited to the wedding of Aris and Hana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CurtainIntro />
        {children}
      </body>
    </html>
  );
}
