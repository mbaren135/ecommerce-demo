"use client";

import { Suspense, useContext } from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import ProductCard from "./product-card";
import ProductSkeleton from "./product-skeleton";
import AuthContext from "../auth/context";

function ProductList() {
  const { products, loading, error } = useProducts();

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">{error}</p>
        <p className="text-muted-foreground mt-2">Please try again later.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductGrid() {
  const { logout } = useContext(AuthContext)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products
            designed to enhance your lifestyle.
          </p>
          <button onClick={() => logout()}>Logout</button>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ProductList />
        </Suspense>
      </div>
    </section>
  );
}
