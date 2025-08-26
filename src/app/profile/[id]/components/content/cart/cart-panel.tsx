import { CartType } from "@/lib/types";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect, useState } from "react";
import BrandButton from "@/components/ui/button";
import useCarts, { clearCartCache } from "@/lib/hooks/useCarts";
import useUser from "@/lib/hooks/useUser";
import formatName from "@/lib/utils/format-user-name";
import CartExpander from "./cart-expander";
import CartSkeleton from "./cart-skeleton";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const status =
    error.cause && typeof error.cause === "number" ? error.cause : 400;

  return (
    <div role="alert" className="flex flex-col gap-4 p-6">
      {status === 404 ? (
        <div className="flex flex-col justify-start w-full gap-2 text-brand-primary">
          <h1 className="text-3xl font-bold">
            You don&apos;t have any cart drops right now!
          </h1>
          <p className="text-lg">
            Manage your drops by heading to the shopping cart tab above.
          </p>
          <hr />
        </div>
      ) : (
        <div className="flex items-start justify-between w-full text-brand-accent">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">Something went wrong!</h1>
            <pre className="text-md">{error.message}</pre>
          </div>
          <BrandButton variant="delete" onClick={resetErrorBoundary}>
            Try Again
          </BrandButton>
        </div>
      )}
    </div>
  );
}

function ProfileCartInner({ userId }: { userId: string }) {
  const cartData = useCarts(userId);
  const user = useUser(userId);
  const [carts, setCarts] = useState<CartType[] | null>(null);
  const [openCart, setOpenCart] = useState<number | null>(null);

  useEffect(() => {
    setCarts(cartData);
  }, [cartData]);
 
  useEffect(() => {
    console.log(openCart);
  }, [openCart]);

  return (
    <div className="flex flex-col items-center space-y-12 w-full text-brand-primary p-6">
      <div className="flex flex-col justify-start w-full gap-2">
        <h1 className="text-3xl font-bold">
          {formatName(user.name)}, you have {carts?.length} cart
          {carts?.length && carts?.length > 1 && "s"} to view
        </h1>
        <p className="text-lg">
          Click on a cart below to view your dropped items.
        </p>
        <hr />
      </div>
      {(carts ?? []).map((cart, index) => (
        <CartExpander key={cart.id} cart={cart} openCart={openCart} setOpenCart={setOpenCart} index={index + 1}/>
      ))}
    </div>
  );
}
export default function ProfileCart({ userId }: { userId: string }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => clearCartCache(userId)}
      resetKeys={[userId]}
    >
      <Suspense fallback={<CartSkeleton />}>
        <ProfileCartInner userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}
