/**
 * The canales.md brand mark — a terminal prompt `>_`.
 * Shares its geometry with the favicon / app icons (see design/brand/icon.svg).
 * `idSuffix` keeps the gradient ids unique when several marks render on one page.
 */
export default function LogoMark({
  size = 28,
  idSuffix = "nav",
  className = "",
}: {
  size?: number;
  idSuffix?: string;
  className?: string;
}) {
  const g = `lm-g-${idSuffix}`;
  const gb = `lm-gb-${idSuffix}`;
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="canales.md logo"
    >
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={gb} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60A5FA" />
          <stop offset="0.55" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <rect
        x="28"
        y="28"
        width="456"
        height="456"
        rx="116"
        fill="#0E0F13"
        stroke={`url(#${g})`}
        strokeWidth="16"
      />
      <path
        d="M150 184 L246 256 L150 328"
        fill="none"
        stroke={`url(#${gb})`}
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="270" y="296" width="104" height="34" rx="17" fill="#FBBF24" />
    </svg>
  );
}
