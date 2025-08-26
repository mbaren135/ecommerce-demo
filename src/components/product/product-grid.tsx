"use client";

import { Suspense } from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import ProductCard from "./product-card";
import ProductSkeleton from "./product-skeleton";
import { motion } from "framer-motion";

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
  return (
    <>
      <div className="text-center mb-12 text-brand-primary bg-brand-accent w-full py-8">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="mx-auto text-brand-primary w-1/2 text-lg">
          Discover our carefully curated selection of premium products designed
          to enhance your lifestyle. <br />
          Select a product to view more details, or add directly to your cart
          with 1{" "}
          <motion.span
            className="inline-block"
            initial={{ scale: 1, x: 0 }}
            animate={{ scale: [1, 1.3, 1], x: [0, 5, 0] }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            click!
          </motion.span>
        </p>
      </div>
      <div className="container mx-auto px-4">
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
    </>
  );
}
