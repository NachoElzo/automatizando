import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store (resets on server restart)
let users: { id: number; name: string; token?: string }[] = [
  { id: 1, name: "Jane Doe", token: "admin" },
];
const lastRequest: { [ip: string]: number } = {};

function getIP(req: NextRequest) {
  return req.headers.get("x-forwarded-for") || "local";
}

// Helper to generate a random token
function generateToken() {
  return Math.random().toString(36).substring(2, 12);
}

export async function GET(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  // Do not expose tokens in GET
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return NextResponse.json(users.map(({ token, ...u }) => u));
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { name } = await req.json();
  const token = generateToken();
  const user = { id: Math.floor(Math.random() * 10000), name, token };
  users.push(user);
  // Return token only on creation
  return NextResponse.json({ user: { id: user.id, name: user.name }, token });
}

function getUserByIdAndToken(id: number, token: string | null) {
  return users.find((u) => u.id === id && u.token === token);
}

export async function PUT(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id, name } = await req.json();
  const token = req.headers.get("x-user-token");
  if (!token)
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  const user = getUserByIdAndToken(id, token);
  if (!user)
    return NextResponse.json(
      { error: "User not found or invalid token" },
      { status: 401 }
    );
  user.name = name;
  return NextResponse.json({ id: user.id, name: user.name });
}

export async function PATCH(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id, name } = await req.json();
  const token = req.headers.get("x-user-token");
  if (!token)
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  const user = getUserByIdAndToken(id, token);
  if (!user)
    return NextResponse.json(
      { error: "User not found or invalid token" },
      { status: 401 }
    );
  user.name = name;
  return NextResponse.json({ id: user.id, name: user.name });
}

export async function DELETE(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id } = await req.json();
  const token = req.headers.get("x-user-token");
  if (!token)
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  const idx = users.findIndex((u) => u.id === id && u.token === token);
  if (idx === -1)
    return NextResponse.json(
      { error: "User not found or invalid token" },
      { status: 401 }
    );
  users = users.filter((u, i) => i !== idx);
  return NextResponse.json({ success: true, id });
}
