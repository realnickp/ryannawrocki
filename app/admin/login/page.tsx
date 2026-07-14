"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await adminFetch("/api/admin/login", {
        method: "POST",
        body: { email, password },
      });
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <div className="card-soft p-8">
        <div className="gold-tick" />
        <p className="eyebrow mt-4">Campaign Admin</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold text-brand-navy">
          Sign in
        </h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="form-label">Email</span>
            <input
              type="email" autoComplete="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} className="form-input"
            />
          </label>
          <label className="block">
            <span className="form-label">Password</span>
            <input
              type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={busy} className="btn-maroon w-full justify-center">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
