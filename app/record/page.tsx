import { redirect } from "next/navigation";

// The standalone Record page was retired per the campaign's direction; the
// delivered record now lives inside each priority ("What we've delivered").
// Redirect any lingering links to the Priorities page.
export default function RecordPage() {
  redirect("/priorities");
}
