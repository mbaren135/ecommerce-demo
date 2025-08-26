import { ProductType } from ".";

type Cart = {
    id: number;
    userId: number;
    date: string;
    products: {
        product: ProductType | null;
        quantity: number;
    }[];
    __v: number;
}

type PrimitiveCart = {
    id: number;
    userId: number;
    date: string;
    products: {
        productId: number;
        quantity: number;
    }[];
    __v: number;
}

export type { Cart, PrimitiveCart };