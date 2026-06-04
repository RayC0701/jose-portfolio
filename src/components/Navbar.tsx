"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Metrics", href: "#metrics" },
  { label: "Engineering", href: "#engineering" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 backdrop-blur-md ${
          scrolled
            ? "bg-[#0A0A0B]/60 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#0A0A0B]/10 border-b border-white/[0.02]"
        } ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
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
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
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
        <div className="fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl tracking-[0.3em] uppercase text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
