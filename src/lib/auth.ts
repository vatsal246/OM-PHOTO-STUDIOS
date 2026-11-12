import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "om_admin_session";
const SECRET = process.env.JWT_SECRET || "om-photo-studio-secure-local-jwt-secret-key-malad-2026";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  // Safe comparison
  if (password.length !== adminPassword.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(adminPassword));
}

export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`admin:${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, providedSignature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check age (7 days)
  const now = Date.now();
  if (now - timestamp > MAX_AGE_SECONDS * 1000 || timestamp > now + 60000) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", SECRET)
    .update(`admin:${timestampStr}`)
    .digest("hex");

  if (expectedSignature.length !== providedSignature.length) return false;

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(providedSignature)
  );
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(sessionToken);
}

export { ADMIN_COOKIE_NAME, MAX_AGE_SECONDS };

