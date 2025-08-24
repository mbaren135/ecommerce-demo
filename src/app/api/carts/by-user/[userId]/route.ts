import { CartType } from "@/lib/types";
import { PrimitiveCart } from "@/lib/types/cart";
import { type NextRequest, NextResponse } from "next/server";

const FAKESTOREURL = "https://fakestoreapi.com";

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;
  const resp = await fetch(`${FAKESTOREURL}/carts`);

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Bad Request: Could not retrieve carts" },
      { status: 400 }
    );
  }

  const data = await resp.json();

  const userCarts = data.filter(
    (cart: CartType) => cart.userId.toString() === userId
  );

  if (userCarts.length === 0) {
    return NextResponse.json(
      { error: "No carts found for this user" },
      { status: 404 }
    );
  }

  const carts = await Promise.all(
    userCarts.map(async (cart: PrimitiveCart) => {
      const products = await Promise.all(
        cart.products.map(async (item) => {
          const prodResp = await fetch(
            `${FAKESTOREURL}/products/${item.productId}`
          );
          if (prodResp.ok) {
            const productData = await prodResp.json();
            return { product: productData, quantity: item.quantity };
          } else {
            return { product: null, quantity: item.quantity };
          }
        })
      );
      return { ...cart, products };
    })
  );

  return NextResponse.json({ status: 200, carts });
}
