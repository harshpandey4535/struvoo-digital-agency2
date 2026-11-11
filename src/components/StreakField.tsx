import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Streak = {
  ang: number;
  dist: number;
  speed: number;
  w: number;
  alpha: number;
  sprite: number;
};

type Props = {
  className?: string;
  /** relative number of streaks (1 = desktop hero) */
  density?: number;
  interactive?: boolean;
  /** 0..1 — how far the vanishing point sits down the canvas */
  focusY?: number;
};

const PALETTE: Array<[number, number, number]> = [
  [125, 211, 252], // azure light
  [56, 189, 248], // electric blue
  [34, 211, 238], // cyan
  [232, 244, 255], // white core
  [30, 127, 194], // deep blue
];

function makeSprite(rgb: [number, number, number]) {
  const w = 48;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return c;

  const [r, gg, b] = rgb;
  const v = g.createLinearGradient(0, 0, 0, h);
  v.addColorStop(0, `rgba(${r},${gg},${b},0)`);
  v.addColorStop(0.42, `rgba(${r},${gg},${b},0.85)`);
  v.addColorStop(0.62, `rgba(${r},${gg},${b},1)`);
  v.addColorStop(1, `rgba(${r},${gg},${b},0)`);
  g.fillStyle = v;
  g.fillRect(0, 0, w, h);

  const hgrad = g.createLinearGradient(0, 0, w, 0);
  hgrad.addColorStop(0, "rgba(0,0,0,0)");
  hgrad.addColorStop(0.35, "rgba(0,0,0,0.85)");
  hgrad.addColorStop(0.5, "rgba(0,0,0,1)");
  hgrad.addColorStop(0.65, "rgba(0,0,0,0.85)");
  hgrad.addColorStop(1, "rgba(0,0,0,0)");
  g.globalCompositeOperation = "destination-in";
  g.fillStyle = hgrad;
  g.fillRect(0, 0, w, h);
  return c;
}

/**
 * A warp-tunnel of speed-blurred light streaks converging on a vanishing point.
 * Hand-written canvas, sprite-tapered streaks, additive blending, pointer parallax.
 * Renders a single static frame under prefers-reduced-motion.
 */
export default function StreakField({
  className = "",
  density = 1,
  interactive = true,
  focusY = 0.5,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const sprites = PALETTE.map(makeSprite);
    let raf = 0;
    let w = 0;
    let h = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const target = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const maxDist = () => Math.hypot(w, h) * 0.78;

    const isSmall = window.matchMedia("(max-width: 640px)").matches;
    const count = Math.round((isSmall ? 78 : 168) * density);
    const streaks: Streak[] = [];

    const spawn = (s: Streak, initial = false) => {
      s.ang = Math.random() * Math.PI * 2;
      s.dist = initial ? Math.random() * maxDist() : Math.random() * 40 + 6;
      s.speed = 1.6 + Math.random() * 5.2;
      s.w = 1.2 + Math.random() * 5.6;
      s.alpha = 0.16 + Math.random() * 0.62;
      s.sprite = Math.floor(Math.random() * sprites.length);
    };

    for (let i = 0; i < count; i++) {
      const s: Streak = { ang: 0, dist: 0, speed: 0, w: 0, alpha: 0, sprite: 0 };
      spawn(s, true);
      streaks.push(s);
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (interactive && !reduce) window.addEventListener("pointermove", onPointer, { passive: true });

    const render = (advance: boolean) => {
      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;

      const vpx = w * 0.5 + pointer.x * w * 0.055;
      const vpy = h * focusY + pointer.y * h * 0.05;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const glow = ctx.createRadialGradient(vpx, vpy, 0, vpx, vpy, Math.max(w, h) * 0.62);
      glow.addColorStop(0, "rgba(46,120,190,0.30)");
      glow.addColorStop(0.35, "rgba(30,80,140,0.12)");
      glow.addColorStop(1, "rgba(16,28,50,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const md = maxDist();
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        if (advance) {
          s.dist += s.speed * (0.55 + (s.dist / md) * 3.4);
          if (s.dist > md) spawn(s);
        }
        const squash = 0.62;
        const x = vpx + Math.cos(s.ang) * s.dist;
        const y = vpy + Math.sin(s.ang) * s.dist * squash;
        const len = 14 + s.dist * 0.46;
        const fade =
          Math.min(1, s.dist / 90) * Math.min(1, (md - s.dist) / (md * 0.42));
        if (fade <= 0.01) continue;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.ang);
        ctx.globalAlpha = s.alpha * fade * 0.9;
        ctx.drawImage(sprites[s.sprite], -len * 0.5, -s.w * 0.5, len, s.w);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduce) {
      render(false);
    } else {
      const loop = () => {
        if (!running) return;
        render(true);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density, interactive, focusY, reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
