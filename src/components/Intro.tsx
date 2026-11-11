import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services } from "../config";
import { SectionLabel, SplitWords, Reveal, onImgError } from "./ui";

export default function Intro() {
  const bandRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["4%", "-16%"]);

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-navy">
      {/* --- editorial block --- */}
      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pb-28 lg:pt-40">
        <SectionLabel index="02">Introduction</SectionLabel>

        <h2 className="display mt-8 max-w-[16ch] text-[clamp(2.35rem,7.6vw,6.4rem)]">
          <SplitWords text="Creativity with a purpose." />
          <br />
          <span className="text-azure">
            <SplitWords text="Growth with a strategy." delay={0.18} />
          </span>
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[1.12rem] leading-[1.75] text-white/92 sm:text-[1.28rem]">
                Struvoo is a digital growth and creative agency. We build the digital presence of
                ambitious businesses — then we make that presence perform.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-[1rem] leading-[1.8] text-silver">
                Design, marketing and technology are usually treated as three separate budgets. We
                treat them as one system. The website is the campaign's destination. The campaign is
                the content's distribution. The content is the brand's proof. When those parts are
                designed together, growth stops being accidental.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-5">
                <span className="h-px w-16 bg-azure" />
                <p className="label text-silver/80">Strategy · Craft · Measurement</p>
              </div>
            </Reveal>
          </div>

          {/* capability index — brand-board annotation style */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-center justify-between border-b border-silver/20 pb-3">
              <span className="label text-silver/70">Capability Index</span>
              <span className="label tnum text-silver/45">05 Disciplines</span>
            </div>
            <ul>
              {services.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.07}>
                  <li>
                    <a
                      href={`#${s.id}`}
                      className="group flex items-center gap-6 border-b border-silver/12 py-5 transition-colors duration-300 hover:border-azure/50"
                    >
                      <span className="label tnum w-8 shrink-0 text-silver/45 transition-colors group-hover:text-azure">
                        {s.index}
                      </span>
                      <span className="font-display text-[1.05rem] font-semibold uppercase tracking-[-0.01em] text-white/90 transition-colors group-hover:text-azure sm:text-[1.28rem]">
                        {s.title}
                      </span>
                      <span className="ml-auto h-px w-8 shrink-0 bg-silver/30 transition-all duration-500 group-hover:w-16 group-hover:bg-azure" />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- full-bleed studio band --- */}
      <div ref={bandRef} className="relative h-[52vh] min-h-[340px] w-full overflow-hidden sm:h-[62vh]">
        <motion.img
          src="images/studio.jpg"
          alt="Struvoo studio after hours — motion design and performance work in progress"
          className="absolute inset-0 h-[128%] w-full object-cover"
          style={{ y: imgY }}
          loading="lazy"
          decoding="async"
          onError={onImgError}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,28,50,0.92) 0%, rgba(16,28,50,0.34) 34%, rgba(10,18,34,0.86) 100%)",
          }}
        />
        <div className="absolute inset-0 mix-blend-color" style={{ background: "rgba(30,127,194,0.34)" }} />

        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ x: wordX }}
          aria-hidden="true"
        >
          <div className="flex w-max items-center gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="display text-[clamp(3.4rem,13vw,11rem)] text-white/12"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
              >
                GROWTH WITH MOMENTUM
              </span>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <p className="max-w-[34ch] font-display text-[1.15rem] font-semibold uppercase leading-tight tracking-[-0.01em] text-white sm:text-[1.55rem]">
              An agency built for the pace of digital.
            </p>
            <p className="label text-silver/80">Performance · Web · Video · Motion · Social</p>
          </div>
        </div>
      </div>
    </section>
  );
}
