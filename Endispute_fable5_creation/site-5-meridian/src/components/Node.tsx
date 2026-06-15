"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Reusable section node marker. In normal flow, so whileInView is safe.
 * Circle fills gold + emits one expanding ring when it scrolls into view.
 */
export default function Node({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        {/* one-shot expanding ring */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[#ffffff]"
          initial={{ scale: 1, opacity: 0.8 }}
          whileInView={{ scale: 3, opacity: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        {/* filling dot */}
        <motion.span
          className="block h-3.5 w-3.5 rounded-full"
          initial={{ backgroundColor: "#26262e", boxShadow: "0 0 0px rgba(255,255,255,0)" }}
          whileInView={{
            backgroundColor: "#ffffff",
            boxShadow: "0 0 14px rgba(255,255,255,0.7)",
          }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9a9a9a]">
        {label}
      </span>
    </div>
  );
}
