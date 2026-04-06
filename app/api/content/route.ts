import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminToken } from "@/lib/auth";
import { readSiteData, writeSiteData } from "@/lib/content";
import type { SiteData } from "@/lib/types";

export async function GET() {
  const data = await readSiteData();
  return NextResponse.json(data);
}

async function assertAdmin() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  return verifyAdminToken(token);
}

export async function PUT(request: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
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
