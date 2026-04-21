import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  const MASTER_PASSWORD = process.env.ADMIN_PASSWORD || "GrossICT2026!";
  
  if (password === MASTER_PASSWORD) {
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
