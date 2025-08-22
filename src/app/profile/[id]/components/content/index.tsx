import { MutableUser } from "@/lib/types";
import { ErrorBoundary } from "react-error-boundary";
import ProfileDetails from "./details-panel";
import { Suspense, useEffect, useState } from "react";
import DetailsSkeleton from "./details-skeleton";
import BrandButton from "@/components/ui/button";
import ProfileDelete from "./delete-panel";

// Cache for storing promises and results
type Pending = { status: "pending"; promise: Promise<MutableUser> };
type Success = { status: "success"; data: MutableUser };
type Failure = { status: "error"; error: Error };
type Entry = Pending | Success | Failure;
const cache = new Map<string, Entry>();

function useUser(userId: string): MutableUser {
  const key = userId;
  const entry = cache.get(key);

  if (!entry) {
    const promise = fetch(`/api/users/${userId}`)
      .then(async (resp) => {
        if (!resp.ok) {
          throw new Error(`Bad Request: User with id ${userId} not found`);
        }
        const data = await resp.json();
        return data.user as MutableUser;
      })
      .then((user) => {
        cache.set(key, { status: "success", data: user });
        return user;
      })
      .catch((err: unknown) => {
        const error = err instanceof Error ? err : new Error("Unknown error");
        // IMPORTANT: store the error instead of deleting the entry
        cache.set(key, { status: "error", error });
        throw error;
      });

    cache.set(key, { status: "pending", promise });
    throw promise;
  }

  if (entry.status === "pending") throw entry.promise;
  if (entry.status === "error") throw entry.error;
  return entry.data; // success
}

// Component that uses the user data
function ProfileContentInner({
  userId,
  content,
}: {
  userId: string;
  content: "details" | "cart" | "delete";
}) {
  const fetchedUser = useUser(userId);
  const [user, setUser] = useState<MutableUser>(fetchedUser);

  // Sync local editable state when fetched user changes
  useEffect(() => {
    setUser(fetchedUser);
  }, [fetchedUser]);

  // Update local state when fetchedUser changes (e.g., different userId)
  if (user.id !== fetchedUser.id) {
    setUser(fetchedUser);
  }

  if (content === "details") {
    return <ProfileDetails user={user} setUser={setUser} />;
  }

  if (content === "cart") {
    return <div>Shopping Cart</div>;
  }

  if (content === "delete") {
    return <ProfileDelete userId={userId} />;
  }

  return null;
}

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
      className="flex items-start justify-between space-y-12 w-full text-brand-accent p-6"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Something went wrong!</h1>
        <pre className="text-md">{error.message}</pre>
      </div>
      <BrandButton
        variant="delete"
        onClick={resetErrorBoundary}
      >
        Try Again
      </BrandButton>
    </div>
  );
}

export default function ProfileContent({
  userId,
  content,
}: {
  userId: string;
  content: "details" | "cart" | "delete";
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => cache.delete(userId)}
      resetKeys={[userId]}
    >
      <Suspense fallback={<DetailsSkeleton />}>
        <ProfileContentInner userId={userId} content={content} />
      </Suspense>
    </ErrorBoundary>
  );
}
