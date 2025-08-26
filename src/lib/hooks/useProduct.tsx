import { ProductType } from "../types";

type Pending = { status: "pending"; promise: Promise<ProductType> };
type Success = { status: "success"; data: ProductType };
type Failure = { status: "error"; error: Error };
type Entry = Pending | Success | Failure;   
const cache = new Map<string, Entry>();

export function clearProductCache(productId: string) {
  cache.delete(productId);
}

export default function useProduct(productId: string): ProductType {
    const key = productId;
    const entry = cache.get(key);

    if (!entry) {
        const promise = fetch(`/api/products/${productId}`)
        .then(async (resp) => {
            if (!resp.ok) {
                throw new Error(`Bad Request: Product with id ${productId} not found`, { cause: resp.status});
            }
            const data = await resp.json();
            return data.product as ProductType;
        })
        .then((product) => {
            cache.set(key, { status: "success", data: product });
            return product;
        })
        .catch((err: unknown) => {
            const error = err instanceof Error ? err : new Error("Unknown error");
            // IMPORTANT: store the error instead of deleting the entry
            cache.set(key, { status: "error", error });
            throw error;
        })

        cache.set(key, { status: "pending", promise });
        throw promise;
    }

    if (entry.status === "pending") throw entry.promise;
    if (entry.status === "error") throw entry.error;
    return entry.data; // success
}