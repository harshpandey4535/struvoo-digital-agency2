import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, X, MoveHorizontal } from "lucide-react";
import { projects, type Project } from "../config";
import { EASE, SectionLabel, SplitWords, onImgError } from "./ui";

export default function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);
  const [sectionH, setSectionH] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setDistance(0);
      setSectionH(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(d);
      setSectionH(d + window.innerHeight);
    };
    measure();
    const t = window.setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [isDesktop]);

  const distanceRef = useRef(0);
  distanceRef.current = distance;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, (p) => -p * distanceRef.current);
  const x = useSpring(rawX, { stiffness: 130, damping: 26, mass: 0.4 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative scroll-mt-0 bg-navy"
      style={isDesktop && sectionH ? { height: `${sectionH}px` } : undefined}
    >
      <div className="flex flex-col py-24 lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden lg:py-0">
        {/* section header */}
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:pt-[104px] xl:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel index="04">Selected Work</SectionLabel>
              <h2 className="display mt-5 max-w-[18ch] text-[clamp(1.85rem,3.7vw,3.25rem)]">
                <SplitWords text="Built to stand out. Designed to perform." />
              </h2>
            </div>
            <p className="max-w-[38ch] text-[0.92rem] leading-relaxed text-silver lg:pb-2">
              Demonstration projects shown below are structured examples — replaceable one-for-one
              with approved client case studies. No results or clients are implied.
            </p>
          </div>
        </div>

        {/* horizontal track */}
        <div className="no-scrollbar mt-12 flex items-stretch overflow-x-auto overflow-y-hidden py-2 lg:mt-0 lg:flex-1 lg:overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex items-stretch gap-6 pl-5 pr-[16vw] sm:pl-6 lg:gap-10 lg:pl-10"
            style={{ x: isDesktop ? x : 0 }}
          >
            {projects.map((p, i) => (
              <article
                key={p.id}
                data-cursor="VIEW"
                onClick={() => setOpen(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(p);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View sample project ${p.title}`}
                className="group relative flex min-h-0 w-[78vw] max-w-[520px] shrink-0 cursor-pointer flex-col sm:w-[56vw] lg:w-[32vw]"
              >
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-abyss lg:aspect-auto lg:min-h-0 lg:flex-1">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.industry} sample project visual`}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                    decoding="async"
                    onError={onImgError}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(10,18,34,0.30) 0%, rgba(10,18,34,0.10) 40%, rgba(10,18,34,0.92) 100%)",
                    }}
                  />
                  <div className="absolute inset-0 border border-white/10 transition-colors duration-500 group-hover:border-azure/50" />

                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <span className="bg-azure px-2.5 py-1.5 label text-navy">Sample</span>
                    <span className="label tnum text-white/80">
                      0{i + 1} / 0{projects.length}
                    </span>
                  </div>

                  <div className="absolute inset-x-5 bottom-5">
                    <p className="label text-azure/90">{p.industry}</p>
                    <h3 className="display mt-2.5 text-[clamp(1.55rem,2.7vw,2.35rem)] text-white">{p.title}</h3>
                    <div className="mt-3 h-px w-full bg-white/18" />
                    <p className="mt-3 text-[0.85rem] leading-relaxed text-silver">{p.services}</p>
                  </div>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-navy/40 backdrop-blur-sm">
                      <ArrowUpRight size={22} strokeWidth={1.8} className="text-white" />
                    </span>
                  </div>
                </div>

                <p className="mt-5 max-w-[36ch] shrink-0 text-[0.92rem] leading-relaxed text-silver/85">
                  {p.summary}
                </p>
              </article>
            ))}

            {/* end plate */}
            <div className="flex w-[70vw] max-w-[420px] shrink-0 flex-col justify-center border-l border-silver/15 pl-8 lg:w-[24vw]">
              <p className="label text-silver/55">End of index</p>
              <p className="display mt-4 text-[clamp(1.5rem,2.6vw,2.15rem)] text-white">
                Your project belongs here.
              </p>
              <a
                href="#contact"
                data-cursor="OPEN"
                className="group mt-7 inline-flex w-fit items-center gap-3 label text-azure"
              >
                Start a project
                <ArrowUpRight size={14} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* track footer */}
        <div className="mx-auto mt-8 w-full max-w-[1600px] px-5 sm:px-6 lg:mt-0 lg:pb-7 xl:px-10">
          <div className="flex items-center gap-5">
            <span className="label flex items-center gap-2 text-silver/55">
              <MoveHorizontal size={13} strokeWidth={2} /> Scroll
            </span>
            <div className="relative h-px flex-1 bg-silver/18">
              <motion.div className="absolute inset-y-0 left-0 bg-azure" style={{ width: progressWidth }} />
            </div>
            <span className="label tnum text-silver/55">04</span>
          </div>
        </div>
      </div>

      {/* project detail overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] overflow-y-auto bg-abyss/96 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.title} sample project detail`}
          >
            <motion.div
              className="mx-auto min-h-full max-w-[1180px] px-5 py-10 sm:px-8 lg:py-16"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="label text-azure">Sample Project — Replaceable</span>
                  <h3 className="display mt-4 text-[clamp(2.1rem,6vw,4.4rem)]">{open.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close project detail"
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-silver/25 text-white transition-colors hover:border-azure hover:text-azure"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-9 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={open.image}
                      alt={`${open.title} sample visual`}
                      className="h-full w-full object-cover"
                      onError={onImgError}
                    />
                    <div className="absolute inset-0 border border-white/10" />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <dl className="space-y-5">
                    {[
                      ["Industry", open.industry],
                      ["Services", open.services],
                      ["Status", open.year],
                      ["Focus", open.tone],
                    ].map(([k, v]) => (
                      <div key={k} className="border-b border-silver/12 pb-4">
                        <dt className="label text-silver/55">{k}</dt>
                        <dd className="mt-2 font-display text-[1.02rem] font-semibold uppercase tracking-[-0.01em] text-white">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-7 text-[0.98rem] leading-[1.8] text-silver">{open.detail}</p>

                  <p className="label mt-8 text-silver/55">Deliverables</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {open.deliverables.map((d) => (
                      <li key={d} className="border border-silver/18 px-3 py-2 label text-silver/80">
                        {d}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    onClick={() => setOpen(null)}
                    className="group mt-9 inline-flex items-center gap-3 bg-azure px-7 py-4 label text-navy"
                  >
                    Discuss a project like this
                    <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
