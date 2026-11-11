import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Desktop-only custom cursor: a precise dot with a trailing ring that expands
 * over interactive elements and shows a label (VIEW / OPEN / SEND) on plates.
 * Disabled entirely for touch input and for reduced-motion users.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("cursor-none-desktop");
    setActive(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        if (ring) ring.style.opacity = "1";
        if (dot) dot.style.opacity = "1";
      }
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(target ? target.dataset.cursor || "VIEW" : null);
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [reduce]);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      >
        <div
          className={`h-[6px] w-[6px] rounded-full bg-azure transition-transform duration-200 ${
            label ? "scale-0" : "scale-100"
          }`}
          style={{ boxShadow: "0 0 12px rgba(56,189,248,0.9)" }}
        />
      </div>

      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[69] opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      >
        <div
          className={`flex items-center justify-center rounded-full border border-azure/60 transition-all duration-300 ease-out ${
            label ? "h-[86px] w-[86px] bg-azure/95" : down ? "h-[26px] w-[26px]" : "h-[38px] w-[38px]"
          }`}
          style={{ transform: "translate(-50%,-50%)" }}
        >
          {label && (
            <span className="label text-[0.56rem] text-navy" style={{ letterSpacing: "0.22em" }}>
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
