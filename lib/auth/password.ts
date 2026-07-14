import bcrypt from "bcryptjs";

const COST = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, COST);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Used to equalize login timing when the email doesn't exist — we still run
 * one bcrypt compare so "unknown email" and "wrong password" take the same time.
 */
export const DUMMY_HASH = bcrypt.hashSync("dummy-timing-equalizer", COST);
