"use client";

import AppProvider from "@/components/auth/global-app-provider";
import ProductGrid from "@/components/product/product-grid";
import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AppProvider>
        <Header />
        <main>
          <ProductGrid />
        </main>
      </AppProvider>
    </div>
  );
}
