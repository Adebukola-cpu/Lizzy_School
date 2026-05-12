import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Providers from "./providers";
import NavbarWrapper from "./components/navbarWrapper";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lizzy school",
  description: "school website built with nextjs 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {/* className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
        <Providers>

          <NavbarWrapper/>
          {children}
        </Providers>
      </body>
    </html>
  );
}

