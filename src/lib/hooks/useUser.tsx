import { MutableUser } from "../types";

// Cache for storing promises and results
type Pending = { status: "pending"; promise: Promise<MutableUser> };
type Success = { status: "success"; data: MutableUser };
type Failure = { status: "error"; error: Error };
type Entry = Pending | Success | Failure;
const cache = new Map<string, Entry>();

export function clearUserCache(userId: string) {
  cache.delete(userId);
}

export default function useUser(userId: string): MutableUser {
  const key = userId;
  const entry = cache.get(key);

  if (!entry) {
    const promise = fetch(`/api/users/${userId}`)
      .then(async (resp) => {
        if (!resp.ok) {
          throw new Error(`Bad Request: User with id ${userId} not found`, { cause: resp.status});
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
