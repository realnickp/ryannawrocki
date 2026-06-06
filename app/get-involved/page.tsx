import { redirect } from "next/navigation";

// Get Involved was merged into the Contact page. Keep this route as a permanent
// redirect so old links, bookmarks, and any cached search results still resolve.
export default function GetInvolvedRedirect() {
  redirect("/contact");
}
