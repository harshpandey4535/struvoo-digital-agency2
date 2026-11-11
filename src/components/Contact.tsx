import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, Phone, MapPin } from "lucide-react";
import { services, site } from "../config";
import { EASE, Magnetic, SectionLabel, SplitWords } from "./ui";
import StreakField from "./StreakField";

const budgets = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Let's scope it together"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: services[0].title,
    budget: budgets[1],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "A valid email keeps the reply moving.";
    if (form.message.trim().length < 12) next.message = "A little more detail helps us prepare.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `New project enquiry — ${form.name}${form.company ? ` (${form.company})` : ""}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "—"}`,
      `Service of interest: ${form.service}`,
      `Indicative budget: ${form.budget}`,
      "",
      "Project outline:",
      form.message,
      "",
      "— Sent from struvoo.com",
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const fieldClass =
    "w-full border-b border-silver/25 bg-transparent px-0 py-3.5 text-[0.98rem] text-white placeholder:text-silver/45 transition-colors duration-300 focus:border-azure focus:outline-none";

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-abyss">
      <div className="absolute inset-0">
        <StreakField className="h-full w-full" density={0.55} focusY={0.22} interactive={false} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,18,34,0.94) 0%, rgba(10,18,34,0.72) 30%, rgba(10,18,34,0.96) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="07" tone="azure">
              Start a Project
            </SectionLabel>

            <h2 className="display mt-7 text-[clamp(2.35rem,6.4vw,5.25rem)]">
              <SplitWords text="Your next growth story starts here." />
            </h2>

            <p className="mt-7 max-w-[42ch] text-[1.06rem] leading-[1.8] text-silver">
              Have an ambitious idea? Let&apos;s turn it into something people remember.
            </p>

            <div className="mt-11 space-y-5">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 border-b border-silver/14 pb-5 transition-colors hover:border-azure/60"
              >
                <Mail size={17} strokeWidth={1.8} className="text-azure" />
                <span className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-white transition-colors group-hover:text-azure">
                  {site.email}
                </span>
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  className="ml-auto text-silver/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-azure"
                />
              </a>
              <a
                href={site.phoneHref}
                className="group flex items-center gap-4 border-b border-silver/14 pb-5 transition-colors hover:border-azure/60"
              >
                <Phone size={17} strokeWidth={1.8} className="text-azure" />
                <span className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-white transition-colors group-hover:text-azure">
                  {site.phone}
                </span>
              </a>
              <div className="flex items-center gap-4">
                <MapPin size={17} strokeWidth={1.8} className="text-azure" />
                <span className="text-[0.95rem] text-silver">{site.location}</span>
              </div>
            </div>

            <div className="mt-9 inline-flex items-center gap-3 border border-azure/30 bg-azure/10 px-4 py-3">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-azure" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure" />
              </span>
              <span className="label text-azure">{site.availability}</span>
            </div>
          </div>

          {/* form plate */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative border border-silver/15 bg-navy/55 p-6 backdrop-blur-sm sm:p-9">
              <div className="flex items-center justify-between border-b border-silver/15 pb-4">
                <span className="label text-silver/70">Project Enquiry</span>
                <span className="label tnum text-silver/45">Form 01</span>
              </div>

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="py-12"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-azure/50 bg-azure/12">
                      <Check size={22} strokeWidth={2.2} className="text-azure" />
                    </div>
                    <h3 className="display mt-6 text-[1.65rem] text-white">Your email client is opening.</h3>
                    <p className="mt-4 max-w-[44ch] text-[0.96rem] leading-[1.8] text-silver">
                      The enquiry has been composed for you — press send in your mail app and we&apos;ll
                      reply within one business day. If nothing happened, copy the address below and
                      write to us directly.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="inline-flex items-center gap-2.5 border border-silver/25 px-5 py-3 label text-white transition-colors hover:border-azure hover:text-azure"
                      >
                        {copied ? <Check size={13} strokeWidth={2.4} /> : <Copy size={13} strokeWidth={2.2} />}
                        {copied ? "Copied" : `Copy ${site.email}`}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="label text-silver/70 underline-offset-4 transition-colors hover:text-azure hover:underline"
                      >
                        Edit the message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-7 space-y-7"
                  >
                    <div className="grid gap-7 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="label text-silver/60">
                          Your name *
                        </label>
                        <input
                          id="c-name"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Alex Morgan"
                          className={fieldClass}
                          aria-invalid={Boolean(errors.name)}
                        />
                        {errors.name && <p className="mt-2 label text-azure">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-email" className="label text-silver/60">
                          Email *
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@company.com"
                          className={fieldClass}
                          aria-invalid={Boolean(errors.email)}
                        />
                        {errors.email && <p className="mt-2 label text-azure">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-company" className="label text-silver/60">
                        Company
                      </label>
                      <input
                        id="c-company"
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                        placeholder="Brand or organisation"
                        className={fieldClass}
                      />
                    </div>

                    <div className="grid gap-7 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-service" className="label text-silver/60">
                          Service of interest
                        </label>
                        <select
                          id="c-service"
                          value={form.service}
                          onChange={(e) => set("service", e.target.value)}
                          className={`${fieldClass} appearance-none`}
                        >
                          {services.map((s) => (
                            <option key={s.id} value={s.title} className="bg-navy text-white">
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c-budget" className="label text-silver/60">
                          Indicative budget
                        </label>
                        <select
                          id="c-budget"
                          value={form.budget}
                          onChange={(e) => set("budget", e.target.value)}
                          className={`${fieldClass} appearance-none`}
                        >
                          {budgets.map((b) => (
                            <option key={b} value={b} className="bg-navy text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="label text-silver/60">
                        Project outline *
                      </label>
                      <textarea
                        id="c-message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="What are you building, and what should it achieve?"
                        className={`${fieldClass} resize-none`}
                        aria-invalid={Boolean(errors.message)}
                      />
                      {errors.message && <p className="mt-2 label text-azure">{errors.message}</p>}
                    </div>

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                      <Magnetic>
                        <button
                          type="submit"
                          data-cursor="SEND"
                          className="label-lg group relative inline-flex items-center gap-3 overflow-hidden bg-azure px-8 py-[1.15rem] text-navy"
                        >
                          <span className="absolute inset-0 -translate-x-full skew-x-[-18deg] bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
                          <span className="relative z-10">Start your project</span>
                          <ArrowUpRight
                            size={14}
                            strokeWidth={2.6}
                            className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </button>
                      </Magnetic>
                      <p className="max-w-[30ch] text-[0.82rem] leading-relaxed text-silver/70">
                        This opens your own mail client — nothing is stored on this site.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
