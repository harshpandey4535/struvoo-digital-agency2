import { motion, useMotionValue, useSpring, type MotionProps } from "framer-motion";
import { useRef, type ReactNode, type SyntheticEvent } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Designed stand-in surface, used if a photograph fails to load. */
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1024">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#16263F"/><stop offset="0.55" stop-color="#0A1222"/><stop offset="1" stop-color="#1E7FC2"/>
    </linearGradient>
    <linearGradient id="s" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#38BDF8" stop-opacity="0"/><stop offset="0.5" stop-color="#7DD3FC" stop-opacity="0.85"/><stop offset="1" stop-color="#38BDF8" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1536" height="1024" fill="url(#g)"/>
  <g fill="url(#s)">
    <rect x="-120" y="240" width="1800" height="10" transform="rotate(-18 768 512)"/>
    <rect x="-120" y="360" width="1800" height="22" transform="rotate(-18 768 512)" opacity="0.55"/>
    <rect x="-120" y="520" width="1800" height="6" transform="rotate(-18 768 512)" opacity="0.8"/>
    <rect x="-120" y="640" width="1800" height="16" transform="rotate(-18 768 512)" opacity="0.4"/>
    <rect x="-120" y="780" width="1800" height="8" transform="rotate(-18 768 512)" opacity="0.7"/>
  </g>
</svg>`;

export const FALLBACK_IMG = `data:image/svg+xml,${encodeURIComponent(FALLBACK_SVG)}`;

export function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  const el = e.currentTarget;
  if (el.dataset.fallback === "1") return;
  el.dataset.fallback = "1";
  el.src = FALLBACK_IMG;
}

/** Word-by-word masked reveal — used for the statements that deserve an entrance. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="mask-word">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, amount: 0.35 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Simple staggered fade/slide for grouped content. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  once = true,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Section header plate: index + tracked micro-caps label + hairline rule. */
export function SectionLabel({
  index,
  children,
  className = "",
  tone = "silver",
}: {
  index: string;
  children: ReactNode;
  className?: string;
  tone?: "silver" | "azure";
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`label tnum ${tone === "azure" ? "text-azure" : "text-silver/70"}`}>{index}</span>
      <span className="h-px w-8 bg-silver/30" />
      <span className={`label ${tone === "azure" ? "text-azure" : "text-silver/90"}`}>{children}</span>
    </div>
  );
}

/** Magnetic wrapper — desktop only; degrades to a plain container on touch. */
export function Magnetic({
  children,
  className = "",
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.35 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Primary button treatment used across the page. */
export function PrimaryButton({
  children,
  href,
  onClick,
  type,
  className = "",
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  variant?: "solid" | "outline";
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 label transition-colors duration-300";
  const skin =
    variant === "solid"
      ? "bg-azure text-navy hover:text-navy"
      : "border border-silver/35 text-white hover:border-azure hover:text-azure";

  const inner = (
    <>
      <span
        className={`absolute inset-0 -translate-x-full skew-x-[-18deg] transition-transform duration-500 ease-out group-hover:translate-x-0 ${
          variant === "solid" ? "bg-white" : "bg-azure/12"
        }`}
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${skin} ${className}`}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={`${base} ${skin} ${className}`}>
      {inner}
    </button>
  );
}
