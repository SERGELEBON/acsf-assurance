"use client";

import { create } from "zustand";
import type { PageId } from "@/lib/site-data";

interface RouterState {
  page: PageId;
  anchor: string | null;
  navigate: (page: PageId, anchor?: string) => void;
  syncFromHash: () => void;
}

function pageFromHash(): { page: PageId; anchor: string | null } {
  if (typeof window === "undefined") return { page: "accueil", anchor: null };
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash) return { page: "accueil", anchor: null };
  const [p, anchor] = hash.split("#");
  return { page: (p || "accueil") as PageId, anchor: anchor || null };
}

export const useRouter = create<RouterState>((set) => ({
  page: "accueil",
  anchor: null,
  navigate: (page, anchor) => {
    const hash = anchor ? `#/${page}#${anchor}` : `#/${page}`;
    if (typeof window !== "undefined") {
      if (window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      if (anchor) {
        setTimeout(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    }
    set({ page, anchor: anchor ?? null });
  },
  syncFromHash: () => {
    const { page, anchor } = pageFromHash();
    set({ page, anchor });
  },
}));
