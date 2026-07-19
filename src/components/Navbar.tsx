"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";

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
  const [activeId, setActiveId] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.slice(1))
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (mobileOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [mobileOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setMobileOpen(false);
      toggleBtnRef.current?.focus();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

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
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-blue-400 to-violet-400 transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
            <a
              href="https://cal.com/josecanales/ai-consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase px-5 py-2 border border-white/20 rounded-full text-white/80 hover:bg-white/[0.06] hover:border-white/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all duration-500"
            >
              Let&apos;s Talk
            </a>
          </div>

          <button
            ref={toggleBtnRef}
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

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Site navigation"
        className="fixed inset-0 z-40 w-full h-full max-w-none max-h-none m-0 p-0 border-none bg-[#0A0A0B]/95 backdrop-blur-2xl backdrop:bg-transparent"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobile();
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              aria-current={activeId === item.href.slice(1) ? "true" : undefined}
              className={`text-2xl tracking-[0.3em] uppercase transition-colors min-h-[44px] flex items-center ${
                activeId === item.href.slice(1) ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </dialog>
    </>
  );
}
