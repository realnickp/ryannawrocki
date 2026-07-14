import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "admin_session";
/**
 * Token lifetime cap. The cookie itself is a SESSION cookie (no Max-Age), so
 * closing the browser signs you out; this cap additionally forces a fresh
 * login after 12 hours even in a browser that never closes.
 */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours
const ALG = "HS256";

export type SessionPayload = { sub: string; email: string };

function secretKey(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(s);
}

export async function createSessionToken(p: SessionPayload): Promise<string> {
  return new SignJWT({ email: p.email })
    .setProtectedHeader({ alg: ALG })
    .setSubject(p.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: [ALG],
    });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
