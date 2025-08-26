export default function CartSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-12 w-full text-brand-primary p-6">
      <div className="flex flex-col justify-start w-full gap-2">
        <div className="h-9 w-2/3 bg-brand-primary-200 rounded animate-pulse" />
        <div className="h-7 w-1/2 bg-brand-primary-200 rounded animate-pulse" />
        <hr />
      </div>
      <CartExpanderSkeleton />
    </div>
  );
}

function CartExpanderSkeleton() {
  return (
    <div className="relative w-full rounded-lg border border-brand-accent">
      {/* Cart header skeleton */}
      <div className="flex justify-between items-center p-4 w-full bg-brand-light-100 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="h-5 w-5 bg-brand-primary-200 rounded animate-pulse" />
          <div className="h-7 w-20 bg-brand-primary-200 rounded animate-pulse" />
        </div>
        <div className="h-6 w-6 bg-brand-primary-200 rounded animate-pulse" />
      </div>
      
      {/* Cart content skeleton (collapsed state) */}
      <div className="space-y-2 p-4">
        <CartProductSkeleton />
        <CartProductSkeleton />
      </div>
    </div>
  );
}

function CartProductSkeleton() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <div className="flex justify-between gap-4">
        <div className="h-5 w-1/3 bg-brand-primary-200 rounded animate-pulse" />
        <div className="flex justify-end gap-6">
          <div className="h-5 w-16 bg-brand-primary-200 rounded animate-pulse" />
          <div className="h-5 w-12 bg-brand-primary-200 rounded animate-pulse" />
        </div>
      </div>
      <hr />
    </div>
  );
}
