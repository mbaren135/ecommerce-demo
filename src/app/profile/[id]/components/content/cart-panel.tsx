import { CartType } from "@/lib/types";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect, useState } from "react";
import BrandButton from "@/components/ui/button";

type Pending = { status: "pending"; promise: Promise<CartType[]> };
type Success = { status: "success"; data: CartType[] };
type Failure = { status: "error"; error: Error };
type Entry = Pending | Success | Failure;
const cache = new Map<string, Entry>();

function useCarts(userId: string): CartType[] {
  const key = userId;
  const entry = cache.get(key);

  if (!entry) {
    const promise = fetch(`/api/carts/by-user/${userId}`)
      .then(async (resp) => {
        if (!resp.ok) {
          if (resp.status === 404) {
            throw new Error("No carts found for this user", { cause: 404 });
          } else {
            throw new Error("Bad Request: Could not retrieve carts", {
              cause: resp.status,
            });
          }
        }
        const data = await resp.json();
        return data.carts as CartType[];
      })
      .then((carts) => {
        cache.set(key, { status: "success", data: carts });
        return carts;
      })
      .catch((err: unknown) => {
        const error = err instanceof Error ? err : new Error("Unknown error");
        cache.set(key, { status: "error", error });
        throw error;
      });

    cache.set(key, { status: "pending", promise });
    throw promise;
  }

  if (entry.status === "pending") throw entry.promise;
  if (entry.status === "error") throw entry.error;
  return entry.data;
}

export default function ProfileCart({ userId }: { userId: string }) {
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);

  //   if (error) {
  //     return <ErrorDisplay error={error} />;
  //   }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => cache.delete(userId)}
      resetKeys={[userId]}
    >
      <Suspense>
        <ProfileCartInner userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}

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
            You don't have any cart drops right now!
          </h1>
          <p className="text-lg">
            Manage your drops by heading to the shopping cart tab above.
          </p>
          <hr />
        </div>
      ) : (
        <div
              className="flex items-start justify-between w-full text-brand-accent"
            >
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
  const fetchedCarts = useCarts(userId);
  const [carts, setCarts] = useState<CartType[] | null>(null);

  useEffect(() => {
    setCarts(fetchedCarts);
  }, [fetchedCarts]);

  return (
    <div className="flex flex-col gap-4 p-6">
      {(carts ?? []).map((cart) => (
        <div key={cart.id}>{JSON.stringify(cart)}</div>
      ))}
    </div>
  );
}
