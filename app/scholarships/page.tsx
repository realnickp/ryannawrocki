import { redirect } from "next/navigation";

// The Legislative Scholarships section was retired per the campaign's
// direction. Redirect any lingering links to the homepage.
export default function ScholarshipsPage() {
  redirect("/");
}
