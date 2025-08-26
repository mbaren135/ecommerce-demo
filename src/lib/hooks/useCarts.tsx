import { CartType } from "../types";

type Pending = { status: "pending"; promise: Promise<CartType[]> };
type Success = { status: "success"; data: CartType[] };
type Failure = { status: "error"; error: Error };
type Entry = Pending | Success | Failure;
const cache = new Map<string, Entry>();

export function clearCartCache(userId: string) {
  cache.delete(userId);
}

export default function useCarts(userId: string): CartType[] {
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
  return entry.data
}
