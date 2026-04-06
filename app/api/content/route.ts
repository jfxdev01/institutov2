import { NextResponse } from "next/server";
import type { SiteData } from "@/lib/types";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
    return NextResponse.json({ error: "Desabilitado no GitHub Pages" }, { status: 404 });
  }
  const { readSiteData } = await import("@/lib/content");
  const data = await readSiteData();
  return NextResponse.json(data);
}

async function assertAdmin() {
  const [{ cookies }, { getAdminCookieName, verifyAdminToken }] = await Promise.all([
    import("next/headers"),
    import("@/lib/auth"),
  ]);
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  return verifyAdminToken(token);
}

export async function PUT(request: Request) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
    return NextResponse.json({ error: "Desabilitado no GitHub Pages" }, { status: 404 });
  }
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const { writeSiteData } = await import("@/lib/content");
    const body = (await request.json()) as SiteData;
    if (!body?.site || !body?.professionals) {
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
    }
    await writeSiteData(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Falha ao salvar" }, { status: 500 });
  }
}
