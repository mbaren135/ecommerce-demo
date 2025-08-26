"use client";
import { Suspense, use, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

import BrandButton from "@/components/ui/button";
import useProduct, { clearProductCache } from "@/lib/hooks/useProduct";
import { ProductType } from "@/lib/types";
import ProductInfo from "./components/product-info";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex items-start justify-around w-full text-brand-accent"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Something went wrong!</h1>
        <pre className="text-md">{error.message}</pre>
      </div>
      <BrandButton variant="delete" onClick={resetErrorBoundary}>
        Try Again
      </BrandButton>
    </div>
  );
}

function ProductDetailsInner({ productId }: { productId: string }) {
  const fetchedProduct = useProduct(productId);
  const [product, setProduct] = useState<ProductType>(fetchedProduct);

  useEffect(() => {
    setProduct(fetchedProduct);
  }, [fetchedProduct]);

  const { image, ...rest } = product

  return (
    <div className="flex flex-col w-full gap-6 text-brand-primary">
      <div className="flex flex-row gap-6 w-full h-full">
        <div className="w-2/5 m-y-6 border-r border-r-brand-accent relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="25vw"
            className="object-contain p-12"
          />
        </div>
        <div className="flex flex-col gap-6 w-3/5">
          <ProductInfo product={rest} />
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="w-full flex h-[calc(100vh-64px)] space-y-12 p-6">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => clearProductCache(id)}
        resetKeys={[id]}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetailsInner productId={id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
