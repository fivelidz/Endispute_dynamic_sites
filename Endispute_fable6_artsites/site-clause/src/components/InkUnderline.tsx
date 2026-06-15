import type { ReactNode } from "react";

/**
 * InkUnderline — a key phrase with a hand-drawn oxblood underline that
 * draws itself (stroke-dashoffset) when its containing Reveal gets `.in`.
 */
export default function InkUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="ink-underline">
      {children}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
        <path
          style={{ ["--u-len" as string]: "210" }}
          d="M2 7 C 40 2, 80 11, 120 5 C 150 1, 180 9, 198 5"
        />
      </svg>
    </span>
  );
}
