import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "../config";
import { SectionLabel, SplitWords, Reveal } from "./ui";

export default function Process() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 68%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24 bg-navy py-24 sm:py-28 lg:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.55), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 xl:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="06">Our Process</SectionLabel>
            <h2 className="display mt-6 max-w-[14ch] text-[clamp(2.15rem,5.8vw,4.9rem)]">
              <SplitWords text="From first idea to final impact." />
            </h2>
          </div>
          <p className="max-w-[36ch] text-[0.96rem] leading-[1.8] text-silver lg:pb-3">
            A four-stage operating rhythm. Clear enough to keep projects moving, flexible enough to
            adapt the moment the data says something new.
          </p>
        </div>

        {/* connector */}
        <div className="relative mt-16 lg:mt-24">
          <div className="absolute left-0 right-0 top-[13px] hidden h-px bg-silver/16 lg:block" aria-hidden="true">
            <motion.div className="h-full origin-left bg-azure" style={{ scaleX: lineScale }} />
          </div>
          <div className="absolute bottom-0 left-[13px] top-0 w-px bg-silver/16 lg:hidden" aria-hidden="true">
            <motion.div className="w-full origin-top bg-azure" style={{ scaleY: lineScale, height: "100%" }} />
          </div>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {processSteps.map((s, i) => (
              <Reveal key={s.index} delay={i * 0.12}>
                <li className="relative grid grid-cols-[auto_1fr] gap-6 lg:block">
                  <div className="relative z-10 flex items-center">
                    <motion.span
                      className="flex h-[26px] w-[26px] items-center justify-center rounded-full border bg-navy"
                      initial={{ borderColor: "rgba(166,179,197,0.3)", scale: 1 }}
                      whileInView={{
                        borderColor: ["rgba(56,189,248,0.3)", "rgba(56,189,248,1)", "rgba(56,189,248,0.6)"],
                        scale: [1, 1.25, 1],
                      }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.18 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-azure" />
                    </motion.span>
                  </div>

                  <div className="lg:mt-8">
                    <div className="flex items-baseline gap-4">
                      <span className="label tnum text-azure">{s.index}</span>
                      <span className="h-px flex-1 bg-silver/14" />
                    </div>
                    <h3 className="display mt-4 text-[clamp(1.75rem,3.4vw,2.55rem)] text-white">{s.title}</h3>
                    <p className="mt-4 max-w-[34ch] text-[0.95rem] leading-[1.8] text-silver">{s.body}</p>
                    <p className="label mt-6 text-silver/55">{s.meta}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
