"use client";

/**
 * ProcessSection — owns the chosen process-animation variant and renders both
 * the section and a small floating "review" picker so options can be compared
 * live. The choice persists to localStorage and a ?process= URL param (so a
 * selected option can be shared by link). The picker is unobtrusive and can be
 * collapsed; it's intended as a review aid while a direction is chosen.
 */

import { useEffect, useState } from "react";
import ProcessVariants, {
  PROCESS_VARIANTS,
  type ProcessVariant,
} from "@/components/ProcessVariants";

const STORAGE_KEY = "endispute:processVariant";
const VALID = new Set(PROCESS_VARIANTS.map((v) => v.id));

function readInitial(): ProcessVariant {
  if (typeof window === "undefined") return "flow";
  const fromUrl = new URLSearchParams(window.location.search).get("process");
  if (fromUrl && VALID.has(fromUrl as ProcessVariant)) return fromUrl as ProcessVariant;
  const fromStore = window.localStorage.getItem(STORAGE_KEY);
  if (fromStore && VALID.has(fromStore as ProcessVariant)) return fromStore as ProcessVariant;
  return "flow";
}

export default function ProcessSection() {
  // Start with the SSR default ("flow"); correct from URL/storage after mount
  // to avoid hydration mismatch.
  const [variant, setVariant] = useState<ProcessVariant>("flow");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVariant(readInitial());
    setMounted(true);
  }, []);

  const choose = (v: ProcessVariant) => {
    setVariant(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
      const url = new URL(window.location.href);
      url.searchParams.set("process", v);
      window.history.replaceState({}, "", url);
    } catch {
      /* ignore */
    }
    // re-trigger scroll animations by nudging the section into view
    requestAnimationFrame(() => {
      document.getElementById("process")?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  };

  const current = PROCESS_VARIANTS.find((v) => v.id === variant) ?? PROCESS_VARIANTS[0];

  return (
    <>
      {/* the section (re-keyed so animations re-run when the variant changes) */}
      <ProcessVariants key={variant} variant={variant} />

      {/* floating review picker */}
      {mounted && (
        <div className="fixed bottom-5 right-5 z-[60] hidden lg:block" style={{ fontFamily: "var(--font-mono)" }}>
          {open && (
            <div className="mb-3 w-80 rounded-md border border-[#3a3320] bg-[#0d0d0d]/95 backdrop-blur p-2 shadow-2xl">
              <div className="px-2 py-2 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4a14a]">
                  Process animation
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#c8bfa8]/40">
                  review tool
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {PROCESS_VARIANTS.map((v) => {
                  const isActive = v.id === variant;
                  return (
                    <li key={v.id}>
                      <button
                        type="button"
                        onClick={() => choose(v.id)}
                        className={`w-full text-left rounded px-3 py-2 transition-colors ${
                          isActive
                            ? "bg-[#d4a14a]/15 border border-[#d4a14a]/50"
                            : "border border-transparent hover:bg-white/5"
                        }`}
                      >
                        <span
                          className="block text-[12px]"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: isActive ? "#f4eedf" : "#c8bfa8",
                          }}
                        >
                          {v.label}
                        </span>
                        <span className="block text-[10px] leading-snug text-[#c8bfa8]/45 mt-0.5">
                          {v.blurb}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="px-3 pt-2 pb-1 text-[9px] text-[#c8bfa8]/35 leading-snug">
                Your choice is saved &amp; added to the URL — share the link to send
                this exact option.
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full border border-[#3a3320] bg-[#0d0d0d]/95 backdrop-blur px-4 py-2.5 shadow-2xl hover:border-[#d4a14a]/60 transition-colors"
            aria-expanded={open}
            aria-label="Choose process animation style"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a14a] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#c8bfa8]">
              Process style
            </span>
            <span
              className="text-[11px]"
              style={{ fontFamily: "var(--font-display)", color: "#d4a14a" }}
            >
              {current.label.split(" — ")[0]}
            </span>
            <span className="text-[#c8bfa8]/50 text-[10px]">{open ? "▾" : "▴"}</span>
          </button>
        </div>
      )}
    </>
  );
}
