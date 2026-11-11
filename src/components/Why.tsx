import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { principles } from "../config";
import { StruvooMark } from "./Logo";
import { Reveal, SectionLabel, SplitWords } from "./ui";

export default function Why() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ring = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const markY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="why" ref={ref} className="relative scroll-mt-24 overflow-hidden bg-abyss py-24 sm:py-28 lg:py-40">
      {/* oversized kinetic word band */}
      <div className="pointer-events-none absolute inset-x-0 top-[8%] overflow-hidden opacity-[0.5]" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-8 pr-8">
              {["STRATEGY", "CREATIVE", "TECHNOLOGY", "PERFORMANCE", "MOMENTUM"].map((w) => (
                <span key={w} className="display text-[clamp(3rem,9vw,8rem)] text-white/[0.05]">
                  {w}
                  <span className="ml-8 text-azure/20">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-6 xl:px-10">
        <SectionLabel index="05">Why Struvoo</SectionLabel>

        <h2 className="display mt-8 max-w-[19ch] text-[clamp(2.15rem,5.9vw,5.15rem)]">
          <SplitWords text="We don't just make things look good." />
          <br />
          <span className="text-azure">
            <SplitWords text="We make them work." delay={0.2} />
          </span>
        </h2>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* kinetic plate */}
          <div className="lg:col-span-4">
            <div className="relative aspect-square w-full max-w-[420px] overflow-hidden border border-silver/12 bg-navy/40">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(166,179,197,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(166,179,197,0.12) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <motion.div className="absolute inset-0" style={{ rotate: ring }}>
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle cx="100" cy="100" r="82" fill="none" stroke="#38BDF8" strokeOpacity="0.35" strokeDasharray="3 9" />
                  <circle cx="100" cy="100" r="58" fill="none" stroke="#A6B3C5" strokeOpacity="0.22" />
                  <path d="M100 18 L100 4 M182 100 L196 100 M100 182 L100 196 M4 100 L18 100" stroke="#38BDF8" strokeOpacity="0.5" />
                </svg>
              </motion.div>
              <motion.div className="absolute inset-0 flex items-center justify-center" style={{ y: markY }}>
                <StruvooMark className="h-[38%] w-[38%]" id="why" />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 border-t border-silver/12 bg-abyss/60 px-4 py-3">
                <p className="label text-silver/70">Fig. A — Method over decoration</p>
              </div>
            </div>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[34ch] font-display text-[1.18rem] font-semibold uppercase leading-tight tracking-[-0.01em] text-white/92">
                Good design earns attention. Strategic design earns outcomes.
              </p>
              <p className="mt-4 max-w-[38ch] text-[0.96rem] leading-[1.8] text-silver">
                Every engagement starts with the commercial goal and works backwards to the craft —
                which is why the work looks distinctive and still does its job.
              </p>
            </Reveal>
          </div>

          {/* principle stack */}
          <div className="lg:col-span-8">
            <div className="border-t border-silver/20">
              {principles.map((p, i) => (
                <Reveal key={p.index} delay={i * 0.06}>
                  <div className="group relative grid grid-cols-[auto_1fr] items-start gap-5 overflow-hidden border-b border-silver/12 py-8 transition-colors duration-500 hover:border-azure/45 sm:gap-8 sm:py-10">
                    <span
                      className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-azure/10 to-transparent transition-all duration-700 group-hover:w-full"
                      aria-hidden="true"
                    />
                    <span className="label tnum relative z-10 pt-2 text-silver/45 transition-colors duration-500 group-hover:text-azure">
                      {p.index}
                    </span>
                    <div className="relative z-10">
                      <h3 className="display text-[clamp(1.35rem,3.1vw,2.15rem)] text-white transition-transform duration-500 group-hover:translate-x-2">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-[58ch] text-[0.96rem] leading-[1.8] text-silver">{p.body}</p>
                    </div>
                    <span
                      className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-0 -translate-y-1/2 bg-azure transition-all duration-700 group-hover:w-24 lg:block"
                      aria-hidden="true"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
