import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Work from "./components/Work";
import Why from "./components/Why";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-navy text-white antialiased">
        <a
          href="#services"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-azure focus:px-5 focus:py-3 focus:text-navy"
        >
          Skip to content
        </a>

        <Cursor />
        <Loader onDone={onDone} />
        <Nav />

        <main>
          <Hero ready={ready} />
          <Intro />
          <Services />
          <Work />
          <Why />
          <Process />
          <Contact />
        </main>

        <Footer />
        <div className="grain" aria-hidden="true" />
      </div>
    </MotionConfig>
  );
}
