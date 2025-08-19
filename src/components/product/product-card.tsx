"use client";
import Image from "next/image";
import { ProductType } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import BrandButton from "../ui/button";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-brand-light-400 py-0 pt-6 pb-2">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="space-y-2 flex flex-col flex-grow">
          <h3 className="font-semibold text-brand-dark line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-brand-primary line-clamp-4">
            {product.description}
          </p>
          <p className="text-md text-brand-primary italic flex-grow">
            {product.category}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-brand-accent">
              ${product.price.toFixed(2)}
            </span>
            <BrandButton>Add to Cart</BrandButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
