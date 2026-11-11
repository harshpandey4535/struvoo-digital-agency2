/**
 * STRUVOO IDENTITY — drawn as real vector artwork.
 *
 * The emblem is a geometric fusion: two counter-rotating blades held inside a circle,
 * separated by an S-curve with sharp tips at 10-to-4 o'clock. Two blades = S + V,
 * the enclosing circle = O. Proportions, colour split and wordmark styling follow the
 * approved Struvoo brand board exactly (S and V in electric blue, TRU / OO in white).
 */

export const BLADE_A =
  "M 86 15 A 52 52 0 0 1 34 105 C 79 103 85 78 60 60 C 46 47 52 26 86 15 Z";
export const BLADE_B =
  "M 86 15 A 52 52 0 0 0 34 105 C 66 95 75 74 60 60 C 34 41 43 19 86 15 Z";

type MarkProps = {
  className?: string;
  /** duo = electric blue + white blades (primary), mono = single colour */
  variant?: "duo" | "mono" | "white" | "ghost";
  id?: string;
  title?: string;
};

export function StruvooMark({ className = "", variant = "duo", id = "m", title }: MarkProps) {
  const mono = variant === "mono";
  const white = variant === "white";
  const ghost = variant === "ghost";

  const fillA = mono ? "#38BDF8" : white ? "#FFFFFF" : ghost ? "none" : `url(#${id}-a)`;
  const fillB = mono ? "#38BDF8" : white ? "#FFFFFF" : ghost ? "none" : `url(#${id}-b)`;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="12" y1="16" x2="102" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="52%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E7FC2" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="20" y1="8" x2="96" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#DCE9F7" />
          <stop offset="100%" stopColor="#A6B3C5" />
        </linearGradient>
      </defs>
      {ghost && (
        <g stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="2.2" strokeLinejoin="round">
          <path d={BLADE_A} />
          <path d={BLADE_B} />
        </g>
      )}
      <g>
        <path d={BLADE_B} fill={fillB} />
        <path d={BLADE_A} fill={fillA} />
      </g>
    </svg>
  );
}

/** Horizontal lockup: emblem + wordmark. */
export function LogoLockup({
  className = "",
  markClass = "h-10 w-10",
  textClass = "text-[1.75rem]",
  label,
}: {
  className?: string;
  markClass?: string;
  textClass?: string;
  label?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <StruvooMark className={markClass} id={label ?? "lock"} />
      <Wordmark className={`font-logo ${textClass}`} />
    </span>
  );
}

/** The wordmark. S and V carry the electric blue, as per the approved board. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-logo font-extrabold uppercase leading-none tracking-[-0.035em] ${className}`}
    >
      <span className="text-azure">S</span>
      <span className="text-white">TRU</span>
      <span className="text-azure">V</span>
      <span className="text-white">OO</span>
    </span>
  );
}

/** Full stacked lockup used in the footer / loader, with the guideline rule + descriptor. */
export function LogoStacked({ className = "", markClass = "h-14 w-14" }: { className?: string; markClass?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-3">
        <StruvooMark className={markClass} id="stack" />
        <Wordmark className="font-logo text-[2.15rem]" />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="h-px w-full max-w-[13rem] bg-silver/40" />
        <span className="label whitespace-nowrap text-silver/80">Digital Growth &amp; Creative Agency</span>
      </div>
    </div>
  );
}
