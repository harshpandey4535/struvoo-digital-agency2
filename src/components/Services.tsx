import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "../config";
import { SectionLabel, SplitWords } from "./ui";
import ServiceVisual from "./ServiceVisuals";

function ServiceChapter({
  index,
  active,
  onEnter,
}: {
  index: number;
  active: boolean;
  onEnter: () => void;
}) {
  const s = services[index];
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" });
  useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  return (
    <div
      ref={ref}
      id={s.id}
      className="flex min-h-[62vh] scroll-mt-28 flex-col justify-center border-t border-silver/12 py-12 lg:min-h-[78vh] lg:py-16"
    >
      <div className="flex items-baseline gap-5">
        <span className={`label tnum transition-colors duration-500 ${active ? "text-azure" : "text-silver/45"}`}>
          {s.index}
        </span>
        <span
          className={`h-px flex-1 origin-left transition-transform duration-700 ${
            active ? "scale-x-100 bg-azure/60" : "scale-x-[0.12] bg-silver/25"
          }`}
        />
        <span className="label text-silver/40">Service</span>
      </div>

      <h3
        className={`display mt-6 text-[clamp(1.85rem,4.4vw,3.35rem)] transition-colors duration-500 ${
          active ? "text-white" : "text-silver/55"
        }`}
      >
        {s.title}
      </h3>

      <p className="mt-4 max-w-[38ch] font-display text-[1.05rem] font-medium leading-snug text-azure/90 sm:text-[1.22rem]">
        {s.lede}
      </p>

      <p className="mt-5 max-w-[52ch] text-[0.96rem] leading-relaxed text-silver">{s.body}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {s.points.map((p) => (
          <span
            key={p}
            className="border border-silver/18 px-3 py-2 label text-silver/75 transition-colors duration-300 hover:border-azure/50 hover:text-azure"
          >
            {p}
          </span>
        ))}
      </div>

      {/* mobile-only inline visual */}
      <div className="mt-9 lg:hidden">
        <ServiceVisual index={index} />
      </div>

      <a
        href="#contact"
        data-cursor="OPEN"
        className="group mt-9 inline-flex w-fit items-center gap-3 label text-white transition-colors hover:text-azure"
      >
        <span className="relative">
          Explore this service
          <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-azure transition-transform duration-500 group-hover:scale-x-100" />
        </span>
        <ArrowUpRight size={14} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative scroll-mt-24 bg-abyss py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 xl:px-10">
        <SectionLabel index="03">Our Services</SectionLabel>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-[clamp(2.15rem,6.2vw,5.4rem)] lg:col-span-8">
            <SplitWords text="Everything your brand needs to move forward." />
          </h2>
          <p className="max-w-[42ch] text-[0.98rem] leading-relaxed text-silver lg:col-span-4 lg:pb-3">
            Five disciplines, one operating system. We run them together because that is the only way
            the work compounds — creative informed by data, performance informed by craft.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
          {/* sticky visual stage */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <ServiceVisual key={active} index={active} />
                </AnimatePresence>
                <div className="mt-5 flex items-center gap-3">
                  {services.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={s.title}
                      className={`h-1 transition-all duration-500 ${
                        i === active ? "w-12 bg-azure" : "w-6 bg-silver/25 hover:bg-silver/50"
                      }`}
                    />
                  ))}
                  <span className="label tnum ml-auto text-silver/50">
                    0{active + 1} / 0{services.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* scrolling index */}
          <div>
            {services.map((_, i) => (
              <ServiceChapter key={i} index={i} active={active === i} onEnter={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
