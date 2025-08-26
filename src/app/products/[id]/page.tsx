"use client";
import { Suspense, use, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import BrandButton from "@/components/ui/button";
import PageContainer from "@/components/ui/page-container";
import useProduct, { clearProductCache } from "@/lib/hooks/useProduct";
import { ProductType } from "@/lib/types";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div>
      {error.message}
      <BrandButton onClick={() => resetErrorBoundary()}>Try Again</BrandButton>
    </div>
  );
}

function ProductDetailsInner({ productId }: { productId: string }) {
  const fetchedProduct = useProduct(productId);
  const [product, setProduct] = useState<ProductType>(fetchedProduct);

  useEffect(() => {
    setProduct(fetchedProduct);
  }, [fetchedProduct]);

  return <div>{JSON.stringify(product)}</div>;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <PageContainer>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => clearProductCache(id)}
        resetKeys={[id]}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetailsInner productId={id} />
        </Suspense>
      </ErrorBoundary>
    </PageContainer>
  );
}
