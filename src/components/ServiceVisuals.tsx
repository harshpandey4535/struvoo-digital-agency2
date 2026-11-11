import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./ui";

const plate = "relative aspect-[5/4] max-h-[58vh] w-full overflow-hidden";

function Frame({ children, caption, code }: { children: React.ReactNode; caption: string; code: string }) {
  return (
    <div className={`${plate} border border-silver/15 bg-[#0C1729]`}>
      <div className="absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: "linear-gradient(rgba(166,179,197,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(166,179,197,0.10) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      {children}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-silver/12 bg-abyss/70 px-4 py-2.5 backdrop-blur-sm">
        <span className="label text-silver/60">{caption}</span>
        <span className="label tnum text-azure/70">{code}</span>
      </div>
    </div>
  );
}

/* 01 — PERFORMANCE MARKETING ------------------------------------------------ */
function PerformanceVisual() {
  const bars = [0.32, 0.48, 0.4, 0.62, 0.55, 0.78, 0.68, 0.92];
  return (
    <Frame caption="Live campaign signal" code="FIG. 01">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="svc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="30" y1={60 + i * 50} x2="380" y2={60 + i * 50} stroke="#A6B3C5" strokeOpacity="0.14" />
        ))}
        {bars.map((b, i) => (
          <motion.rect
            key={i}
            x={38 + i * 43}
            width="18"
            rx="2"
            fill="#38BDF8"
            fillOpacity="0.28"
            initial={{ height: 0, y: 240 }}
            animate={{ height: [0, b * 150, b * 110, b * 165], y: [240, 240 - b * 150, 240 - b * 110, 240 - b * 165] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.12 }}
          />
        ))}
        <motion.path
          d="M30 210 C 80 196, 108 168, 150 172 S 216 128, 258 118 S 330 74, 380 58"
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }}
        />
        <motion.path
          d="M30 210 C 80 196, 108 168, 150 172 S 216 128, 258 118 S 330 74, 380 58 L 380 250 L 30 250 Z"
          fill="url(#svc-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <line x1="30" y1="112" x2="380" y2="112" stroke="#38BDF8" strokeOpacity="0.5" strokeDasharray="5 6" />
        <motion.circle
          cx="380" cy="58" r="5" fill="#FFFFFF"
          animate={{ r: [4, 7, 4], opacity: [1, 0.55, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute left-4 top-4 space-y-1.5">
        {["ROAS ↑", "CPA ↓", "CTR ↑"].map((t) => (
          <motion.div
            key={t}
            className="w-fit border border-azure/30 bg-azure/10 px-2.5 py-1 label tnum text-azure"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {t}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* 02 — WEB DESIGN & DEVELOPMENT -------------------------------------------- */
function WebVisual() {
  const blocks = [
    { x: 24, y: 62, w: 200, h: 14, o: 0.9 },
    { x: 24, y: 88, w: 132, h: 14, o: 0.55 },
    { x: 24, y: 118, w: 92, h: 62, o: 0.32 },
    { x: 128, y: 118, w: 92, h: 62, o: 0.32 },
    { x: 232, y: 118, w: 92, h: 62, o: 0.32 },
    { x: 24, y: 192, w: 300, h: 10, o: 0.22 },
  ];
  return (
    <Frame caption="Interface assembly" code="FIG. 02">
      {[2, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm border border-silver/12 bg-[#122038]"
          style={{ left: `${12 + i * 16}px`, top: `${44 + i * 12}px`, right: `${40 - i * 12}px`, bottom: `${72 - i * 8}px` }}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
      <div className="absolute left-[36px] right-[16px] top-[62px] bottom-[46px] overflow-hidden rounded-sm border border-azure/25 bg-[#0E1B30]">
        <div className="flex items-center gap-1.5 border-b border-silver/12 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-silver/35" />
          <span className="h-2 w-2 rounded-full bg-silver/25" />
          <span className="h-2 w-2 rounded-full bg-azure/70" />
          <span className="ml-3 h-2 flex-1 rounded-full bg-silver/12" />
        </div>
        <div className="relative p-4">
          {blocks.map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-[2px] bg-azure"
              style={{ left: b.x - 12, top: b.y - 46, width: b.w, height: b.h, opacity: b.o }}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: b.o, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.14, repeat: Infinity, repeatDelay: 3.4, ease: EASE }}
            />
          ))}
          <motion.div
            className="absolute z-10 h-5 w-5"
            animate={{ x: [30, 190, 120, 250, 60], y: [20, 90, 130, 40, 20] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 20 20" className="h-full w-full drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
              <path d="M2 2 L2 16 L6.2 12 L9 18 L12 16.4 L9.3 10.8 L15 10.4 Z" fill="#FFFFFF" />
            </svg>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

/* 03 — VIDEO EDITING ------------------------------------------------------- */
function VideoVisual() {
  const tracks = [
    { y: 26, clips: [[0, 78], [88, 54], [152, 96], [258, 66]] },
    { y: 62, clips: [[10, 120], [142, 74], [228, 108]] },
    { y: 98, clips: [[0, 44], [56, 132], [200, 40], [252, 84]] },
  ];
  return (
    <Frame caption="Timeline / master sequence" code="FIG. 03">
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="label tnum text-azure">00:00:12:04</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 46 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full bg-azure/60"
              animate={{ height: [4, 22, 8, 16, 5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.035 }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-4 top-[72px]">
        {tracks.map((t, ti) => (
          <div key={ti} className="relative mb-3 h-8 rounded-[2px] border border-silver/10 bg-[#0F1D33]">
            {t.clips.map(([x, w], ci) => (
              <motion.div
                key={ci}
                className="absolute inset-y-1 origin-left rounded-[2px]"
                style={{ left: x, width: w, background: ti === 1 ? "rgba(56,189,248,0.55)" : "rgba(166,179,197,0.22)" }}
                initial={{ scaleX: 0.2, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: (ti * 3 + ci) * 0.1, repeat: Infinity, repeatDelay: 4, ease: EASE }}
              />
            ))}
          </div>
        ))}
      </div>
      <motion.div
        className="absolute bottom-[74px] top-[62px] w-px bg-white"
        initial={{ left: "2%" }}
        animate={{ left: ["2%", "97%", "2%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -left-[5px] -top-1 h-3 w-3 rotate-45 bg-white" />
      </motion.div>
    </Frame>
  );
}

/* 04 — MOTION GRAPHICS ---------------------------------------------------- */
function MotionVisual() {
  return (
    <Frame caption="Kinetic composition" code="FIG. 04">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute h-[210px] w-[210px] rounded-full border border-azure/45"
          animate={{ rotate: 360, scale: [1, 1.06, 1] }}
          transition={{ rotate: { duration: 22, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-azure" />
        </motion.div>
        <motion.div
          className="absolute h-[150px] w-[150px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border border-white/25" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
        </motion.div>
        <motion.div
          className="absolute h-[112px] w-[112px] border border-silver/40"
          animate={{ rotate: [45, 135, 45], borderRadius: ["4px", "50%", "4px"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-[62px] w-[62px] bg-azure"
          animate={{ rotate: [0, 90, 180], scale: [1, 0.55, 1], borderRadius: ["6px", "50%", "6px"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 flex items-center justify-center overflow-hidden">
          <motion.span
            className="display text-[clamp(1.6rem,4.6vw,2.6rem)] text-white/90"
            animate={{ letterSpacing: ["0.24em", "-0.01em", "0.24em"], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            MOTION
          </motion.span>
        </div>
      </div>
    </Frame>
  );
}

/* 05 — SOCIAL MEDIA MANAGEMENT -------------------------------------------- */
function SocialVisual() {
  const tiles = [
    { h: 92, o: 0.9 },
    { h: 132, o: 0.55 },
    { h: 74, o: 0.75 },
    { h: 118, o: 0.35 },
    { h: 88, o: 0.6 },
    { h: 126, o: 0.45 },
  ];
  return (
    <Frame caption="Content grid / 30-day plan" code="FIG. 05">
      <div className="absolute inset-x-4 top-4 bottom-[52px] overflow-hidden">
        <motion.div
          className="grid grid-cols-3 gap-2.5"
          animate={{ y: [0, -70, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-[2px] border border-silver/12"
              style={{ height: t.h, background: `rgba(56,189,248,${0.1 + t.o * 0.24})` }}
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
            >
              <div className="absolute inset-x-2 top-2 h-1.5 rounded-full bg-white/25" />
              <div className="absolute inset-x-2 top-5 h-1.5 w-2/3 rounded-full bg-white/12" />
              {i % 3 === 0 && (
                <motion.div
                  className="absolute bottom-2 left-2 h-6 w-6 rounded-full border border-azure/70"
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-[42px] overflow-hidden border-y border-silver/12 py-1.5">
        <motion.div
          className="flex w-max gap-6 whitespace-nowrap"
          animate={{ x: [0, -180] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          {["CONTENT STRATEGY", "CREATIVE PLANNING", "PUBLISHING", "COMMUNITY", "REPORTING"].map((t, i) => (
            <span key={i} className="label text-silver/60">
              {t} <span className="text-azure/70">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </Frame>
  );
}

export default function ServiceVisual({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const visuals = [<PerformanceVisual key="p" />, <WebVisual key="w" />, <VideoVisual key="v" />, <MotionVisual key="m" />, <SocialVisual key="s" />];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -14 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {visuals[index]}
    </motion.div>
  );
}
