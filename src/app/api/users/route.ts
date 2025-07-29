import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store (resets on server restart)
let users: { id: number; name: string; password: string; token: string }[] = [];
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
  // Expose all fields for demo
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const body = await req.json();

  // LOGIN MOCK (NO id, solo name, password, token)
  if (body.login) {
    const { name, password, token } = body;
    
    // VALIDACIÓN PARA LOGIN
    if (!name || !password || !token) {
      return NextResponse.json(
        { error: "All fields are required for login." },
        { status: 400 }
      );
    }
    
    const user = users.find(
      (u) => u.name === name && u.password === password && u.token === token
    );
    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }
  }

  // VALIDACIÓN PARA CREAR USUARIO
  const { name, password } = body;
  
  if (!name || !password) {
    return NextResponse.json(
      { error: "Name and password are required." },
      { status: 400 }
    );
  }
  
  if (typeof name !== 'string' || typeof password !== 'string') {
    return NextResponse.json(
      { error: "Name and password must be strings." },
      { status: 400 }
    );
  }
  
  if (name.trim() === '' || password.trim() === '') {
    return NextResponse.json(
      { error: "Name and password cannot be empty." },
      { status: 400 }
    );
  }

  // ...existing user creation logic...
  const token = generateToken();
  const user = { id: Math.floor(Math.random() * 10000), name: name.trim(), password: password.trim(), token };
  users.push(user);
  return NextResponse.json({ user, token });
}

export async function PUT(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now(); // ← CORREGIDO: now() en lugar de Now()
  const { id, name } = await req.json();
  
  // VALIDACIÓN PARA PUT
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json(
      { error: "Valid name is required." },
      { status: 400 }
    );
  }
  
  const token = req.headers.get("x-user-token");
  const password = req.headers.get("x-user-password");
  
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }
  
  if (!password) {
    return NextResponse.json({ error: "Missing password" }, { status: 401 });
  }
  
  const user = users.find((u) => u.id === id && u.token === token && u.password === password);
  if (!user) {
    return NextResponse.json(
      { error: "User not found or invalid credentials" },
      { status: 404 }
    );
  }
  
  user.name = name.trim();
  return NextResponse.json({
    id: user.id,
    name: user.name,
    password: user.password,
    token: user.token,
  });
}

export async function PATCH(req: NextRequest) {
  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id, name } = await req.json();
  
  // VALIDACIÓN PARA PATCH
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json(
      { error: "Valid name is required." },
      { status: 400 }
    );
  }
  
  const token = req.headers.get("x-user-token");
  const password = req.headers.get("x-user-password");
  
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }
  
  if (!password) {
    return NextResponse.json({ error: "Missing password" }, { status: 401 });
  }
  
  const user = users.find((u) => u.id === id && u.token === token && u.password === password);
  if (!user) {
    return NextResponse.json(
      { error: "User not found or invalid credentials" },
      { status: 404 }
    );
  }
  
  user.name = name.trim();
  return NextResponse.json({
    id: user.id,
    name: user.name,
    password: user.password,
    token: user.token,
  });
}

export async function DELETE(req: NextRequest) {
  // Si la ruta es /api/users/all, borra todos los usuarios
  if (req.nextUrl.pathname.endsWith("/api/users/all")) {
    users = [];
    return NextResponse.json({ success: true });
  }

  const ip = getIP(req);
  if (Date.now() - (lastRequest[ip] || 0) < 1000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  lastRequest[ip] = Date.now();
  const { id } = await req.json();
  
  const token = req.headers.get("x-user-token");
  const password = req.headers.get("x-user-password");
  
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }
  
  if (!password) {
    return NextResponse.json({ error: "Missing password" }, { status: 401 });
  }
  
  const idx = users.findIndex((u) => u.id === id && u.token === token && u.password === password);
  if (idx === -1) {
    return NextResponse.json(
      { error: "User not found or invalid credentials" },
      { status: 404 }
    );
  }
  
  users = users.filter((u, i) => i !== idx);
  return NextResponse.json({ success: true, id });
}