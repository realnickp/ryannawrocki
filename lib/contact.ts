// CONTACT_NOTIFY_EMAIL supports one address or a comma-separated list.
// Blank/whitespace entries are dropped; empty overall means "unset".
export function parseRecipients(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
