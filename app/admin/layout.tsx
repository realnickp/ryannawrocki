import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Campaign Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen bg-brand-paper2 pt-20">
      <header className="border-b border-brand-hairline bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-lg font-extrabold text-brand-navy">
              Campaign Admin
            </Link>
            <nav className="flex gap-5 text-sm font-semibold text-brand-slate">
              <Link href="/admin" className="hover:text-brand-maroon">Dashboard</Link>
              <Link href="/admin/videos" className="hover:text-brand-maroon">Videos</Link>
              <Link href="/admin/account" className="hover:text-brand-maroon">Account</Link>
              <Link href="/" className="hover:text-brand-maroon">View Site ↗</Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] px-6 py-10">{children}</main>
    </div>
  );
}
