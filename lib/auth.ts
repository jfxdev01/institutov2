import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "instituto_v2_admin";

export function getAdminCookieName(): string {
  return COOKIE;
}

function sign(secret: string): string {
  return createHmac("sha256", secret).update("instituto-v2-admin-session").digest("hex");
}

export function createAdminToken(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SECRET não configurado");
  }
  return sign(secret);
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const expected = sign(secret);
  try {
    const a = Buffer.from(token, "utf-8");
    const b = Buffer.from(expected, "utf-8");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
