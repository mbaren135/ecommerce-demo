import { type NextRequest, NextResponse } from "next/server";
import { ProductType } from "@/lib/types";

const FAKESTOREURL = "https://fakestoreapi.com";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const resp = await fetch(`${FAKESTOREURL}/products/${id}`);
  if (!resp.ok) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const product: ProductType = await resp.json();
  return NextResponse.json({ status: 200, product: product });
}
