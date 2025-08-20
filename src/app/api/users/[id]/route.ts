import { NextResponse } from "next/server";
import { use } from "react";

const FAKESTOREURL = "https://fakestoreapi.com";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const resp = await fetch(`${FAKESTOREURL}/users/${id}`);
  if (!resp.ok) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const user = await resp.json();

  return NextResponse.json({
    status: 200,
    user: user,
  });
}
