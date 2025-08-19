import { NextResponse } from "next/server";

const FAKESTOREURL = "https://fakestoreapi.com";

export async function GET() {
  const resp = await fetch(`${FAKESTOREURL}/users`);

  if (!resp.ok) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const data = await resp.json();

  return NextResponse.json({
    status: 200,
    users: data,
  });
}
