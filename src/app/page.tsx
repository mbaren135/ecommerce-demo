"use client";

import AppProvider from "@/components/auth/global-app-provider";
import ProductGrid from "@/components/product/product-grid";

export default function Home() {
  return (
    <AppProvider>
      <ProductGrid />
    </AppProvider>
  );
}
