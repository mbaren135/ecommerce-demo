import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/auth/global-app-provider";
import { Header } from "@/components/ui/header";
import PageContainer from "@/components/ui/page-container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopDrop - Ecommerce demo",
  description:
    "ShopDrop is an online storefront displaying data from fakestoreapi.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white`}
      >
        <AppProvider>
          <Header />
          {/* <PageContainer> */}
            <main>{children}</main>
          {/* </PageContainer> */}
        </AppProvider>
      </body>
    </html>
  );
}
