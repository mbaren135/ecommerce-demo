import { type NextRequest, NextResponse } from "next/server";

const FAKESTOREURL = "https://fakestoreapi.com";

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const resp = await fetch(`${FAKESTOREURL}/users/${id}`);
  if (!resp.ok) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const user = await resp.json();

  return NextResponse.json({
    status: 200,
    user: {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      name: user.name,
    },
  });
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const data = await req.json();

  const resp = await fetch(`${FAKESTOREURL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!resp.ok) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const updatedUser = await resp.json();
  return NextResponse.json({
    status: 200,
    updatedUser: updatedUser,
  });
}

export async function DELETE(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const resp = await fetch(`${FAKESTOREURL}/users/${id}`, {
    method: "DELETE",
  });

  if (!resp.ok) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  return NextResponse.json({ status: 200 });
}
