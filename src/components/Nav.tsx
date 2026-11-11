import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { LogoLockup, StruvooMark } from "./Logo";
import { navLinks, site } from "../config";
import { EASE } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["services", "work", "about", "process", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* utility strip — mirrors the brand board's technical header */}
      <div
        className={`fixed inset-x-0 top-0 z-50 hidden border-b border-silver/10 bg-abyss/80 backdrop-blur-md transition-all duration-500 lg:block ${
          scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-6 xl:px-10">
          <div className="flex items-center gap-6">
            <span className="label text-silver/60">{site.tagline}</span>
            <span className="h-3 w-px bg-silver/20" />
            <span className="label flex items-center gap-2 text-azure/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-azure" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-azure" />
              </span>
              {site.availability}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={site.phoneHref}
              className="label flex items-center gap-2 text-silver/70 transition-colors hover:text-azure"
            >
              <Phone size={11} strokeWidth={2.2} />
              {site.phone}
            </a>
            <span className="h-3 w-px bg-silver/20" />
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="label text-silver/60 transition-colors hover:text-azure"
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 border-b border-silver/12 bg-navy/85 backdrop-blur-xl"
            : "top-0 lg:top-9"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-6 xl:px-10">
          <a href="#top" aria-label="Struvoo — home" className="group relative z-[60]">
            <LogoLockup markClass="h-9 w-9 transition-transform duration-500 group-hover:rotate-[24deg]" textClass="text-[1.55rem]" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const isActive = active === l.href.replace("#", "");
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`group relative px-4 py-2 label transition-colors duration-300 ${
                    isActive ? "text-azure" : "text-silver/85 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute bottom-0.5 left-4 right-4 h-px origin-left bg-azure transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-cursor="OPEN"
              className="group relative hidden items-center gap-2 overflow-hidden bg-azure px-6 py-3 label text-navy transition-colors duration-300 sm:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-full skew-x-[-18deg] bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">Start a Project</span>
              <ArrowUpRight size={13} strokeWidth={2.5} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[60] flex h-11 w-11 items-center justify-center border border-silver/25 text-white transition-colors hover:border-azure hover:text-azure lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* scroll progress hairline */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[58] h-[2px] origin-left bg-gradient-to-r from-azure-deep via-azure to-azure-light"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col bg-abyss lg:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
          >
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-6">
              <StruvooMark className="h-9 w-9" id="menu" />
              <span className="label text-silver/60">Menu</span>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-5 sm:px-6" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between border-b border-silver/12 py-5"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.55, ease: EASE }}
                >
                  <span className="display text-[2.15rem] leading-none text-white transition-colors group-hover:text-azure">
                    {l.label}
                  </span>
                  <span className="label tnum text-silver/50">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="px-5 pb-10 sm:px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between bg-azure px-6 py-4 label text-navy"
              >
                Start a Project <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
              <div className="mt-6 flex flex-col gap-2">
                <a href={`mailto:${site.email}`} className="label text-silver/80 transition-colors hover:text-azure">
                  {site.email}
                </a>
                <a href={site.phoneHref} className="label text-silver/80 transition-colors hover:text-azure">
                  {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
