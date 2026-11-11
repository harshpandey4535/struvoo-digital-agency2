import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StruvooMark, Wordmark } from "./Logo";
import { EASE } from "./ui";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(
      () => {
        setShow(false);
        onDone();
      },
      reduce ? 220 : 1250
    );
    return () => window.clearTimeout(t);
  }, [onDone, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-abyss"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)", opacity: 1 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(60% 50% at 50% 50%, rgba(56,189,248,0.16), rgba(10,18,34,0) 72%)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <StruvooMark className="h-20 w-20" id="load" title="Struvoo" />
          </motion.div>

          <motion.div
            className="mt-7 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Wordmark className="font-logo text-[1.9rem]" />
          </motion.div>

          <motion.div
            className="mt-6 h-px w-[172px] origin-left bg-silver/25"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.05, ease: "easeInOut" }}
          >
            <div className="h-full w-full origin-left bg-azure" />
          </motion.div>

          <motion.p
            className="label mt-5 text-silver/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Digital Growth &amp; Creative Agency
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
