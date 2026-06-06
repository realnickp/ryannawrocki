"use client";

import { useEffect, useState } from "react";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";

type Shot = { src: string; alt: string; position?: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/**
 * The two "Out in the Community" photo ribbons. All shots share one pool and
 * get reshuffled into two rows on every load, so the galleries look different
 * each visit.
 *
 * The first render (server + initial client hydration) uses a deterministic
 * split to avoid a hydration mismatch; we reshuffle right after mount.
 */
export function CommunityMarquee({ shots }: { shots: Shot[] }) {
  const half = Math.ceil(shots.length / 2);
  const [rows, setRows] = useState<[Shot[], Shot[]]>([
    shots.slice(0, half),
    shots.slice(half),
  ]);

  useEffect(() => {
    const mixed = shuffle(shots);
    const h = Math.ceil(mixed.length / 2);
    setRows([mixed.slice(0, h), mixed.slice(h)]);
  }, [shots]);

  return (
    <div className="flex flex-col gap-5">
      <PhotoMarquee shots={rows[0]} />
      <PhotoMarquee shots={rows[1]} reverse />
    </div>
  );
}
