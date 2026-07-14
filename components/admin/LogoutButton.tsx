"use client";

import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin/client";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-xs font-semibold uppercase tracking-wider text-brand-slate hover:text-brand-maroon"
      onClick={async () => {
        await adminFetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
