"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Metrics", href: "#metrics" },
  { label: "Engineering", href: "#engineering" },
  { label: "Contact", href: "#contact" },
];

function subscribeScroll(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrolled(): boolean {
  return window.scrollY > 80;
}

function getScrolledServer(): boolean {
  return false;
}

export default function Navbar() {
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getScrolledServer);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 backdrop-blur-md ${
          scrolled
            ? "bg-[#0A0A0B]/60 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#0A0A0B]/10 border-b border-white/[0.02]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-bold tracking-[0.3em] uppercase text-white/90"
          >
            @canales.md
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs tracking-[0.2em] uppercase px-5 py-2 border border-white/20 rounded-full text-white/80 hover:bg-white/[0.06] hover:border-white/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all duration-500"
            >
              Let&apos;s Talk
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-11 h-11 -mr-3 flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl tracking-[0.3em] uppercase text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
