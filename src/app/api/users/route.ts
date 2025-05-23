import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store (resetea al reiniciar el server)
let users: { id: number; name: string }[] = [{ id: 1, name: "Jane Doe" }];
const lastRequest: { [ip: string]: number } = {};

function getIP(req: NextRequest) {
  return req.headers.get("x-forwarded-for") || "local";
}

export async function GET(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { name } = await req.json();
  const user = { id: Math.floor(Math.random() * 10000), name };
  users.push(user);
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id, name } = await req.json();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  users[idx].name = name;
  return NextResponse.json(users[idx]);
}

export async function PATCH(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id, name } = await req.json();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  users[idx].name = name;
  return NextResponse.json(users[idx]);
}

export async function DELETE(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id } = await req.json();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  users = users.filter((u) => u.id !== id);
  return NextResponse.json({ success: true, id });
}
