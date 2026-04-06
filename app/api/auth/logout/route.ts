import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export async function POST() {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
    return NextResponse.json({ error: "Desabilitado no GitHub Pages" }, { status: 404 });
  }
  const { getAdminCookieName } = await import("@/lib/auth");
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getAdminCookieName(), "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
