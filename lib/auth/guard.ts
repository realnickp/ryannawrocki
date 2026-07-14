import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  verifySessionToken,
  type SessionPayload,
} from "./session";

/**
 * Defense-in-depth: every /api/admin handler re-verifies the session even
 * though middleware already gates the route. Returns null when invalid.
 */
export async function requireSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
