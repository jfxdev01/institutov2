import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
    return NextResponse.json({ error: "Desabilitado no GitHub Pages" }, { status: 404 });
  }
  const { createAdminToken, getAdminCookieName, verifyAdminPassword } = await import(
    "@/lib/auth"
  );
  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || !verifyAdminPassword(body.password)) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }
    const token = createAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(getAdminCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Erro ao entrar" }, { status: 500 });
  }
}
