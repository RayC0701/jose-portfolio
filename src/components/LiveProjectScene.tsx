/**
 * A motion overlay that makes the active carousel card read as a live system:
 * a slow diagonal sheen, a drifting scanline, and an accent-tinted equalizer with
 * a pulsing "LIVE" badge. Purely decorative (aria-hidden, pointer-events-none).
 * Mounted only on the centered card and only when motion is allowed — see
 * ProjectCarousel, which gates on isCenter && !reduceMotion so reduced-motion
 * users simply keep the static dashboard image.
 */
const EQ_BARS = [
  { h: 9, d: "0.9s", delay: "0s" },
  { h: 15, d: "1.1s", delay: "-0.4s" },
  { h: 7, d: "0.8s", delay: "-0.7s" },
  { h: 17, d: "1.25s", delay: "-0.2s" },
  { h: 11, d: "1.0s", delay: "-0.9s" },
  { h: 6, d: "0.85s", delay: "-0.5s" },
];

export default function LiveProjectScene({ accentColor }: { accentColor: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ animation: "fadeIn 0.6s ease forwards" }}
    >
      {/* diagonal glass sheen sweeping across the dashboard */}
      <div
        className="lps-sheen absolute -inset-y-4 left-0 w-1/3"
        style={{
          background:
            "linear-gradient(105deg, transparent, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.10) 55%, transparent)",
        }}
      />

      {/* faint horizontal scanline drifting down */}
      <div
        className="lps-scanline absolute left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
        }}
      />

      {/* LIVE badge + equalizer, bottom-right */}
      <div className="absolute top-3 right-3 flex items-center gap-2 rounded-full px-2.5 py-1"
        style={{
          background: "rgba(8,9,12,0.7)",
          border: `1px solid ${accentColor}35`,
          backdropFilter: "blur(4px)",
        }}
      >
        <span
          className="lps-dot block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
        />
        <span
          className="text-[9px] font-semibold tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          Live
        </span>
        <span className="flex items-end gap-[2px] h-4 ml-0.5">
          {EQ_BARS.map((b, i) => (
            <span
              key={i}
              className="lps-bar block w-[2.5px] rounded-full"
              style={{
                height: `${b.h}px`,
                backgroundColor: accentColor,
                animationDuration: b.d,
                animationDelay: b.delay,
                opacity: 0.85,
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
