import { NextResponse } from "next/server";

const FAKESTOREURL = "https://fakestoreapi.com";

export async function GET() {
  const resp = await fetch(`${FAKESTOREURL}/products`);

  if (!resp.ok) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const data = await resp.json();

  return NextResponse.json({
    status: 200,
    products: data,
  });
}
