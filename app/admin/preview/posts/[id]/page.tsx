import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sanitizeBodyHtml } from "@/lib/cms/sanitize";
import { splitHtmlAfterParagraphs, type PostRow } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

/** Admin-only draft preview — same visual skeleton as the public article. */
export default async function PreviewPost({ params }: { params: { id: string } }) {
  const { data } = await supabaseAdmin()
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (!data) notFound();
  const post = data as PostRow;
  const safe = sanitizeBodyHtml(post.body_html);
  const [lead, rest] = splitHtmlAfterParagraphs(safe, 2);

  return (
    <div className="bg-white">
      <p className="bg-amber-100 px-6 py-2 text-center text-xs font-bold uppercase tracking-wider text-amber-900">
        Preview — {post.status === "draft" ? "this post is a DRAFT (not public)" : "published"}
      </p>
      <div className="mx-auto max-w-[860px] px-6 py-12">
        <div className="gold-tick" />
        <p className="eyebrow mt-5">{post.topic} · {post.date}</p>
        <h1 className="h-display mt-4 max-w-[24ch]">{post.title}</h1>
        {post.dek && <p className="lede mt-6 max-w-[60ch]">{post.dek}</p>}
        <p className="article-byline mt-7">
          By <strong>{post.author}</strong>{post.read_time ? ` · ${post.read_time}` : ""}
        </p>
      </div>
      {post.cover_image && (
        <div className="mx-auto max-w-[1100px] px-6 pb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover_image} alt={post.cover_alt ?? ""}
            className="photo-frame aspect-[16/9] w-full object-cover"
            style={{ objectPosition: post.cover_position ?? "center 30%" }} />
        </div>
      )}
      <div className="mx-auto max-w-[760px] px-6 pb-16">
        <div className="prose-light article-body" dangerouslySetInnerHTML={{ __html: lead }} />
        {post.pull_quote && (
          <div className="article-pullquote"><p>“{post.pull_quote}”</p></div>
        )}
        {rest && (
          <div className="prose-light article-body" dangerouslySetInnerHTML={{ __html: rest }} />
        )}
        {post.key_points && post.key_points.length > 0 && (
          <div className="keypoints mt-12">
            <p className="eyebrow">Where Ryan Stands</p>
            <ul className="mt-5 space-y-3">
              {post.key_points.map((k) => (
                <li key={k} className="text-brand-slate">— {k}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
