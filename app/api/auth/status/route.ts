import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminToken } from "@/lib/auth";

export async function GET() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  return NextResponse.json({ ok: verifyAdminToken(token) });
}
