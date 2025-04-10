import ClientProvider from "@/components/ClientProvider";
import ReduxProvider from "@/components/ReduxProvider";
// import AppInitializer from "@/components/AppInitializer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Ordermenu from "@/components/ordermenu";
import Decrpizza from "@/components/buttonactions/decrpizza";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`flex ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ClientProvider>
            <Navbar />
            <div className="container mx-auto">{children}</div>
            <Decrpizza />
            <Ordermenu/>
          </ClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
