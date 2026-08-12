"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const steps = [
  {
    step: "01",
    title: "Discover",
    description: "Tell us about your property, brand, or experience and what you’re looking for.",
  },
  {
    step: "02",
    title: "Connect",
    description: "We’ll set up a quick call to learn more about your vision, goals, and the content you need.",
  },
  {
    step: "03",
    title: "Plan",
    description: "We’ll create a shot list and content plan tailored to your brand, so we know exactly what we want to capture before we arrive.",
  },
  {
    step: "04",
    title: "Create",
    description: "We come to you and capture your space, experience, or brand through video, photography, UGC, and drone content.",
  },
  {
    step: "05",
    title: "Deliver",
    description: "We edit everything and send you polished, ready-to-use content for your social media and brand.",
  },
];

export default function Process() {
  const [spotlighted, setSpotlighted] = useState<boolean[]>(() => steps.map(() => false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Mobile has no hover, so instead the card centered on screen lights up
    // orange as you scroll — and unlike Services' cards, this one is not
    // sticky: it turns off again once you scroll past it. Desktop keeps the
    // plain CSS :hover behavior untouched. Gated on "(hover: none)" — a real
    // touch-only-device check — rather than viewport width, since a wide or
    // landscape phone can easily exceed a px breakpoint and would otherwise
    // silently fall back to CSS :hover-on-tap (which is what looked like
    // "you have to tap it" on a real device).
    const mq = window.matchMedia("(hover: none)");
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (!mq.matches) {
        setSpotlighted(steps.map(() => false));
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx === -1) return;
            setSpotlighted((prev) => {
              if (prev[idx] === entry.isIntersecting) return prev;
              const next = [...prev];
              next[idx] = entry.isIntersecting;
              return next;
            });
          });
        },
        { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
      );
      cardRefs.current.forEach((el) => el && observer!.observe(el));
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      mq.removeEventListener("change", setup);
      observer?.disconnect();
    };
  }, []);

  return (
    <section id="process" className="relative py-24 lg:py-32 px-5 md:px-[5vw] overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto">

        <Reveal>
          <div className="glass-light rounded-[2.5rem] px-8 py-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-clay-500">
                How We Work
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-ink-900 max-w-md">
                A simple process, built to{" "}
                <span className="italic font-light text-clay-500">
                  perform.
                </span>
              </h2>
              <a
                href="#contact"
                className="self-start lg:self-end inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-dusty-500 text-white font-bold text-sm hover:bg-dusty-600 active:scale-[0.97] transition-all duration-300"
              >
                Let&rsquo;s Begin
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => {
            const on = spotlighted[i];
            return (
              <Reveal key={s.step} delay={i * 80}>
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`glass-light group rounded-[2rem] p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-clay-500 ${
                    on ? "bg-clay-500 -translate-y-1" : ""
                  }`}
                >
                  <span
                    className={`block font-sans font-extrabold text-5xl leading-none mb-6 tracking-tight transition-colors duration-300 group-hover:text-white/20 ${
                      on ? "text-white/20" : "text-ink-100"
                    }`}
                  >
                    {s.step}
                  </span>
                  <h3
                    className={`font-sans font-bold text-xl mb-3 tracking-tight uppercase transition-colors duration-300 group-hover:text-white ${
                      on ? "text-white" : "text-ink-900"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90 ${
                      on ? "text-white/90" : "text-ink-500"
                    }`}
                  >
                    {s.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Closing note */}
        <Reveal delay={400}>
          <div className="mt-8 text-center py-8 px-6 bg-clay-500 rounded-[2.5rem] border border-white/20">
            <p className="text-white/90 text-sm mb-2">From the first idea to the final delivery.</p>
            <p className="text-white font-bold text-lg">
              Tell us what you need. We&rsquo;ll take care of the rest.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
