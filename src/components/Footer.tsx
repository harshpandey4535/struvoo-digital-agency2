import { ArrowUp, ArrowUpRight } from "lucide-react";
import { LogoStacked, StruvooMark } from "./Logo";
import { navLinks, services, site } from "../config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-silver/12 bg-navy">
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-[0.22]"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.55) 0%, rgba(56,189,248,0) 68%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 pb-10 pt-20 sm:px-6 lg:px-10 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <LogoStacked />
            <p className="mt-8 max-w-[34ch] text-[0.95rem] leading-[1.8] text-silver">
              We turn digital presence into digital performance — for brands that would rather lead
              their category than follow it.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="group flex h-11 items-center gap-2 border border-silver/20 px-4 label text-silver/80 transition-colors duration-300 hover:border-azure hover:text-azure"
                >
                  {s.label}
                  <ArrowUpRight
                    size={12}
                    strokeWidth={2.2}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <p className="label text-silver/50">Navigate</p>
            <ul className="mt-6 space-y-3.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[0.95rem] text-white/85 transition-colors hover:text-azure"
                  >
                    <span className="h-px w-0 bg-azure transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#top" className="group inline-flex items-center gap-2 text-[0.95rem] text-white/85 transition-colors hover:text-azure">
                  <span className="h-px w-0 bg-azure transition-all duration-300 group-hover:w-4" />
                  Back to top
                </a>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Services">
            <p className="label text-silver/50">Services</p>
            <ul className="mt-6 space-y-3.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group inline-flex items-center gap-3 text-[0.95rem] text-white/85 transition-colors hover:text-azure"
                  >
                    <span className="label tnum text-silver/40 transition-colors group-hover:text-azure">{s.index}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label text-silver/50">Contact</p>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a href={`mailto:${site.email}`} className="text-[0.95rem] text-white/85 transition-colors hover:text-azure">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="text-[0.95rem] text-white/85 transition-colors hover:text-azure">
                  {site.phone}
                </a>
              </li>
              <li className="text-[0.95rem] text-silver">{site.location}</li>
            </ul>

            <a
              href="#contact"
              data-cursor="OPEN"
              className="group mt-8 inline-flex items-center gap-3 border border-silver/25 px-6 py-4 label text-white transition-colors duration-300 hover:border-azure hover:text-azure"
            >
              Start a project
              <ArrowUpRight
                size={13}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-silver/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <StruvooMark className="h-7 w-7" id="foot" />
            <p className="label text-silver/55">
              © {year} Struvoo — {site.tagline}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label text-silver/40">Portfolio entries shown are sample demonstrations</span>
            <a href="#top" className="group flex items-center gap-2 label text-silver/70 transition-colors hover:text-azure">
              Back to top
              <ArrowUp size={12} strokeWidth={2.2} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
