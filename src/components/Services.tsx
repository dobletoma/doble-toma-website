"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const services = [
  {
    number: "01",
    title: "Social Media Content",
    description: "One-time content shoots created around your space, brand, and goals. We plan what to capture, film, edit and deliver polished content ready for your social media.",
    tags: ["Reels", "Photography", "Drone"],
    wide: true,
  },
  {
    number: "02",
    title: "Social Media Management",
    description: "Ongoing content shoots and social media management for brands that want us to take care of their online presence. We plan, create, post, and keep your content consistent — coming back regularly to capture fresh content for your socials.",
    tags: ["Planning", "Posting", "Consistency"],
  },
  {
    number: "03",
    title: "UGC Creation",
    description: "Natural, creator-style content made for social media. We create UGC videos that feel authentic and native to the platform, helping your brand connect with its audience in a more personal way.",
    tags: ["UGC", "Creator Content", "Social"],
  },
  {
    number: "04",
    title: "Photography",
    description: "Lifestyle and brand photography created to show your brand from every angle — capturing spaces, products, people, details, and experiences for your social media.",
    tags: ["Lifestyle", "Interiors", "Property"],
    wide: true,
  },
  {
    number: "05",
    title: "Content Strategy",
    description: "We help you decide what to create, what to post, and how to show up online. From content ideas and planning to shot lists and creative direction, we build a strategy around your brand and goals.",
    tags: ["Strategy", "Planning", "Visual Identity"],
  },
];

export default function Services() {
  const [activated, setActivated] = useState<boolean[]>(() => services.map(() => false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activate = (i: number) => {
    setActivated((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  useEffect(() => {
    // On touch devices there's no hover, so cards lock into the dark
    // accent color as they scroll into view instead — and once activated,
    // they stay that way (matches the desktop hover-and-stick behavior).
    // The -50% top/bottom margin collapses the observer's root to a single
    // line across the middle of the viewport, so a card activates right as
    // it crosses the center of the screen rather than as soon as it appears.
    // Scoped to real touch-only devices via "(hover: none)" rather than a
    // width breakpoint — on desktop, activation must come from an actual
    // hover on that specific card, not from scrolling past it (two cards
    // sharing a row would otherwise cross center at the same scroll
    // position and light up together). A width check would also wrongly
    // stay off on a wide/landscape phone.
    const mq = window.matchMedia("(hover: none)");
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (!mq.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) activate(idx);
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
    <section id="services" className="relative py-24 lg:py-32 px-5 md:px-[5vw] overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto">

        <Reveal>
          <div className="glass-dark inline-block rounded-[2.5rem] px-8 py-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-clay-500">
                Services
              </span>
            </div>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white max-w-xl">
              Everything you need,{" "}
              <span className="italic font-light text-clay-400">in one place.</span>
            </h2>
          </div>
        </Reveal>

        {/* Services grid — editorial glass menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const on = activated[i];
            return (
              <Reveal
                key={s.number}
                delay={i * 60}
                className={s.wide ? "sm:col-span-2" : ""}
              >
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onMouseEnter={() => activate(i)}
                  className={`h-full rounded-[2rem] transition-all duration-500 hover:-translate-y-1 ${
                    on ? "glass-dark" : "glass-light glass-light-soft"
                  }`}
                >
                  <div className="p-8 lg:p-10 h-full flex flex-col justify-between min-h-[240px]">
                    <div>
                      <div
                        className={`text-[10px] font-bold uppercase tracking-widest mb-5 transition-colors duration-500 ${
                          on ? "text-white/50" : "text-ink-300"
                        }`}
                      >
                        {s.number}
                      </div>
                      <h3
                        className={`font-sans font-extrabold text-2xl lg:text-3xl mb-3 tracking-tight transition-colors duration-500 ${
                          on ? "text-white" : "text-ink-900"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-500 ${
                          on ? "text-white/90" : "text-ink-500"
                        }`}
                      >
                        {s.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-500 ${
                            on ? "bg-white/15 text-white" : "bg-white/50 text-ink-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Accent cell */}
          <Reveal delay={320} className="glass-dark rounded-[2rem]">
            <div className="p-8 lg:p-10 flex flex-col justify-between min-h-[240px] h-full">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-5">→</div>
                <div className="italic font-light text-3xl lg:text-4xl text-sand-50 leading-[1.1]">
                  Ways we can work together
                </div>
              </div>
              <p className="text-white/85 text-sm mt-4">
                From one-time shoots to ongoing content and social media support.
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
