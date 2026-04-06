import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
    return NextResponse.json({ error: "Desabilitado no GitHub Pages" }, { status: 404 });
  }
  const [{ cookies }, { getAdminCookieName, verifyAdminToken }] = await Promise.all([
    import("next/headers"),
    import("@/lib/auth"),
  ]);
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  return NextResponse.json({ ok: verifyAdminToken(token) });
}
