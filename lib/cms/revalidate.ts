import { revalidatePath, revalidateTag } from "next/cache";

/** Fire after any admin write so public pages update within seconds. */
export function revalidateContent(
  kind: "posts" | "events" | "videos",
  slug?: string,
): void {
  revalidateTag(kind);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (kind === "posts") {
    revalidatePath("/issues");
    if (slug) revalidatePath(`/issues/${slug}`);
  }
  if (kind === "videos") revalidatePath("/issues");
  if (kind === "events") revalidatePath("/events");
}
