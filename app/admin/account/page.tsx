"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/admin/client";

export default function AccountPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      setMsg({ ok: false, text: "New passwords don't match." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      await adminFetch("/api/admin/password", {
        method: "POST",
        body: { currentPassword: current, newPassword: next },
      });
      setMsg({ ok: true, text: "Password updated." });
      setCurrent(""); setNext(""); setConfirm("");
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="font-display text-2xl font-extrabold text-brand-navy">Account</h1>
      <div className="card-soft mt-6 p-7">
        <p className="eyebrow">Change Password</p>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="form-label">Current password</span>
            <input type="password" autoComplete="current-password" required
              value={current} onChange={(e) => setCurrent(e.target.value)} className="form-input" />
          </label>
          <label className="block">
            <span className="form-label">New password (min 10 characters)</span>
            <input type="password" autoComplete="new-password" required minLength={10}
              value={next} onChange={(e) => setNext(e.target.value)} className="form-input" />
          </label>
          <label className="block">
            <span className="form-label">Confirm new password</span>
            <input type="password" autoComplete="new-password" required
              value={confirm} onChange={(e) => setConfirm(e.target.value)} className="form-input" />
          </label>
          {msg && (
            <p className={msg.ok ? "text-sm font-semibold text-emerald-700" : "form-error"}>
              {msg.text}
            </p>
          )}
          <button type="submit" disabled={busy} className="btn-maroon">
            {busy ? "Saving…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
