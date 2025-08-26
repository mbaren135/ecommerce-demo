import { ProductType } from "@/lib/types";
import formatCategory from "@/lib/utils/format-product-category";
import ProductRating from "./rating-stars";

export default function ProductInfo({product}: {product: Omit<ProductType, 'image'>}) {
  return (
    <>
      <div className="flex flex-row gap-2 items-start justify-between">
        <h1 className="font-bold text-3xl">
          {product.title} -{" "}
          <span className="italic">{formatCategory(product.category)}</span>
        </h1>
        <p className="text-2xl font-semibold text-brand-accent">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <hr />
      <p className="text-xl font-semibold">{product.description}</p>
      <ProductRating rating={product.rating} />
      {/* {JSON.stringify(product)} */}
    </>
  );
}
