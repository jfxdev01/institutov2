import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminToken } from "@/lib/auth";

const MAX = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "Arquivo ausente" }, { status: 400 });
  }
  if (file.size > MAX) {
    return NextResponse.json({ error: "Arquivo muito grande (máx. 5MB)" }, { status: 400 });
  }

  const original =
    "name" in file && typeof (file as File).name === "string"
      ? (file as File).name
      : "upload";
  const ext = path.extname(original) || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext.toLowerCase())
    ? ext.toLowerCase()
    : ".jpg";
  const name = `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buf);

  const url = `/uploads/${name}`;
  return NextResponse.json({ url });
}
