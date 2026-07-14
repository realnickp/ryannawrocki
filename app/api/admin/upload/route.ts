import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

/** Magic-byte checks — never trust filename or client-declared MIME. */
function looksLikeImage(b: Buffer): boolean {
  const isJpeg = b.length > 2 && b[0] === 0xff && b[1] === 0xd8;
  const isPng =
    b.length > 8 &&
    b.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
  const isWebp =
    b.length > 12 &&
    b.subarray(0, 4).toString("ascii") === "RIFF" &&
    b.subarray(8, 12).toString("ascii") === "WEBP";
  return isJpeg || isPng || isWebp;
}

export async function POST(req: Request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image too large (max 8 MB)" }, { status: 400 });
  }
  const buf = Buffer.from(await file.arrayBuffer());
  if (!looksLikeImage(buf)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, or WebP images are allowed" },
      { status: 400 },
    );
  }

  // Re-encode: applies EXIF rotation, strips metadata (incl. GPS), caps size.
  let out: Buffer;
  try {
    out = await sharp(buf)
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Could not process image" }, { status: 400 });
  }

  const key = `posts/${randomUUID()}.webp`;
  const db = supabaseAdmin();
  const { error } = await db.storage
    .from("media")
    .upload(key, out, { contentType: "image/webp", cacheControl: "31536000" });
  if (error) {
    console.error("[upload]", error.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
  const { data } = db.storage.from("media").getPublicUrl(key);
  return NextResponse.json({ url: data.publicUrl });
}
