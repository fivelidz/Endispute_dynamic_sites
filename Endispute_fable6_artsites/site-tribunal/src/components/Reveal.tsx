"use client";
import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
  as?: "div" | "section" | "header" | "footer" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} className={`rise ${className}`} data-d={delay}>
      {children}
    </Comp>
  );
}
