import { MutableUser } from "@/lib/types";
import ProfileDetails from "./details-panel";
import { Suspense, useState } from "react";
import DetailsSkeleton from "./details-skeleton";

// Cache for storing promises and results
const cache = new Map<string, Promise<MutableUser> | MutableUser>();

// Custom hook that works with Suspense
function useUser(userId: string): MutableUser {
  const cacheKey = userId;
  
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    
    if (cached instanceof Promise) {
      // Still loading, throw the promise for Suspense to catch
      throw cached;
    }
    
    // Return cached result
    //@ts-ignore
    return cached;
  }
  
  // Create and cache the promise
  const promise = fetch(`/api/users/${userId}`)
    .then(async (resp) => {
      if (!resp.ok) {
        throw new Error(`Bad Request: User with id ${userId} not found!`);
      }
      const data = await resp.json();
      const user = data.user;
      
      // Cache the result
      cache.set(cacheKey, user);
      return user;
    })
    .catch((error) => {
      // Remove failed promise from cache so it can be retried
      cache.delete(cacheKey);
      throw error;
    });
  
  cache.set(cacheKey, promise);
  throw promise; // Suspense will catch this
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
    return <div>Boo hoo</div>;
  }

  return null;
}

// Error boundary wrapper
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    if (error instanceof Promise) {
      throw error; // Re-throw promises for Suspense
    }
    return <>Error</>;
  }
}

export default function ProfileContent({
  userId,
  content,
}: {
  userId: string;
  content: "details" | "cart" | "delete";
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<DetailsSkeleton />}>
        <ProfileContentInner userId={userId} content={content} />
      </Suspense>
    </ErrorBoundary>
  );
}