import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import StreakField from "./StreakField";
import { StruvooMark, Wordmark } from "./Logo";
import { EASE, Magnetic, SplitWords } from "./ui";

/** The dashed rule with dots — taken straight from the approved wordmark underline. */
function DottedRule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 12" className={className} preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="6" x2="600" y2="6" stroke="#38BDF8" strokeOpacity="0.5" strokeWidth="1" />
      {[40, 140, 240, 340, 440, 540].map((x) => (
        <circle key={x} cx={x} cy="6" r="3.2" fill="#38BDF8" />
      ))}
    </svg>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const ease = EASE;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy pt-[72px] lg:pt-[108px]"
    >
      {/* --- cinematic speed field (reference: image 2) --- */}
      <div className="absolute inset-0">
        <StreakField className="absolute inset-0 h-full w-full" density={1} focusY={0.52} />
        {/* convergence tint + vignette so the logo plate reads */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 78% at 50% 52%, rgba(16,28,50,0.12) 0%, rgba(16,28,50,0.55) 42%, rgba(10,18,34,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(180deg, rgba(16,28,50,0) 0%, #101C32 92%)" }}
        />
        {/* technical grid — brand-board construction lines */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(166,179,197,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(166,179,197,0.16) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage: "radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 78%)",
          }}
        />
      </div>

      {/* --- centred logo plate --- */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-6">
        <motion.div style={{ y: logoY, scale: logoScale }} className="flex flex-col items-center">
          <div className="relative">
            {/* ignition glow behind the mark */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(56,189,248,0.32) 0%, rgba(56,189,248,0) 68%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.6, ease }}
            />

            <motion.div
              className="relative flex items-center justify-center gap-5 sm:gap-8"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.74, filter: "blur(14px)" }}
              animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.25, ease }}
            >
              <motion.div
                initial={{ rotate: reduce ? 0 : -26, opacity: 0 }}
                animate={ready ? { rotate: 0, opacity: 1 } : {}}
                transition={{ duration: 1.3, ease, delay: 0.08 }}
                className="relative"
              >
                <StruvooMark
                  className="h-[76px] w-[76px] sm:h-[104px] sm:w-[104px] lg:h-[132px] lg:w-[132px]"
                  id="hero"
                  title="Struvoo"
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 90px rgba(56,189,248,0.42)" }}
                />
              </motion.div>

              <div className="relative overflow-hidden">
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={ready ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 1.15, ease, delay: 0.28 }}
                >
                  <Wordmark className="font-logo text-[clamp(2.65rem,11vw,7.4rem)] leading-[0.86]" />
                </motion.div>
                {/* light sweep across the wordmark */}
                {ready && !reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-24"
                    style={{
                      background:
                        "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
                      mixBlendMode: "overlay",
                    }}
                    initial={{ x: "-140%" }}
                    animate={{ x: "140%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 1.05 }}
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              className="mx-auto mt-7 w-[min(620px,86vw)]"
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={ready ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.1, ease, delay: 0.75 }}
            >
              <DottedRule className="h-3 w-full" />
            </motion.div>
          </div>

          {/* statement */}
          <motion.h1
            className="display mt-8 max-w-[22ch] text-[clamp(1.45rem,3.6vw,2.9rem)] leading-[1.02] text-white sm:mt-10"
            style={{ y: copyY, opacity: fade }}
          >
            {ready ? (
              <SplitWords text="We turn digital presence into digital performance." stagger={0.055} />
            ) : (
              <span className="opacity-0">We turn digital presence into digital performance.</span>
            )}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[52ch] text-[0.98rem] leading-relaxed text-silver sm:text-[1.08rem]"
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.95 }}
          >
            From powerful digital experiences to performance-driven marketing, we help ambitious
            brands move forward.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
          >
            <Magnetic>
              <a
                href="#contact"
                data-cursor="OPEN"
                className="label-lg group relative inline-flex items-center gap-3 overflow-hidden bg-azure px-9 py-[1.15rem] text-navy"
              >
                <span className="absolute inset-0 -translate-x-full skew-x-[-18deg] bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10">Let&apos;s build something great</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2.6}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#work"
                data-cursor="VIEW"
                className="label-lg group inline-flex items-center gap-3 border border-silver/30 px-9 py-[1.15rem] text-white transition-colors duration-300 hover:border-azure hover:text-azure"
              >
                Explore our work
                <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* --- baseline: brand-board annotations --- */}
      <motion.div
        className="relative z-10 border-t border-silver/12"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.25 }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 sm:px-6 xl:px-10">
          <a href="#services" className="group flex items-center gap-3 label text-silver/70 transition-colors hover:text-azure">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-silver/25 transition-colors group-hover:border-azure">
              <ArrowDown size={13} strokeWidth={2.2} className="transition-transform duration-500 group-hover:translate-y-0.5" />
            </span>
            Scroll to explore
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {["Performance", "Creative", "Technology", "Results"].map((t) => (
              <span key={t} className="label text-silver/55">
                {t}
              </span>
            ))}
          </div>
          <span className="label tnum text-silver/50">Est. — Studio 04</span>
        </div>
      </motion.div>
    </section>
  );
}
