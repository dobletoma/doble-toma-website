"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { projects, type Category } from "@/data/portfolio";

// "Wellness Retreats" and "Experiences" paused for now, per client request —
// add back to this list when asked: "Wellness Retreats", "Experiences"
const categories: (Category | "All")[] = ["All", "Boutique Hotels", "Villas", "Airbnbs"];

// Each video's poster lives alongside it as "{basename}-poster.jpg".
const posterFor = (video: string) => video.replace(/\.mp4$/, "-poster.jpg");

export default function Work() {
  const [active, setActive] = useState<Category | "All">("All");
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const mutedRef = useRef<Record<string, boolean>>({});
  mutedRef.current = muted;
  // Cards start as just a poster image — the real video source is only
  // attached once the card scrolls near the viewport, so a page with 6
  // autoplaying videos doesn't try to fetch all of them on first load.
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleSound = (id: string) => {
    const el = videoRefs.current[id];
    if (!el) return;
    el.muted = !el.muted;
    setMuted((prev) => ({ ...prev, [id]: el.muted }));
  };

  // If a card's sound is on and it scrolls more than half out of view,
  // mute it again — sound shouldn't keep playing once you've moved on.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) return;
          const id = Object.keys(cardRefs.current).find((key) => cardRefs.current[key] === entry.target);
          if (!id || mutedRef.current[id] === undefined || mutedRef.current[id]) return;
          const video = videoRefs.current[id];
          if (video) video.muted = true;
          setMuted((prev) => ({ ...prev, [id]: true }));
        });
      },
      { threshold: [0, 0.5, 1] }
    );
    Object.values(cardRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  // Viewport-based lazy loading: a card's video source attaches once the
  // card is within ~600px of the viewport (so it's ready by the time it's
  // actually visible, without every video fetching on page load).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = Object.keys(cardRefs.current).find((key) => cardRefs.current[key] === entry.target);
          if (!id) return;
          setLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
        });
      },
      { rootMargin: "600px 0px", threshold: 0 }
    );
    Object.values(cardRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-24 lg:py-32 px-5 md:px-[5vw] overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header row */}
        <Reveal>
          <div className="glass-dark rounded-[2.5rem] p-8 md:p-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-clay-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-clay-500">
                  Selected Work
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white">
                Projects that{" "}
                <span className="italic font-light text-clay-400">move people.</span>
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    active === cat
                      ? "bg-clay-500 text-white"
                      : "glass-chip text-sand-100/80 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Portfolio grid — larger editorial imagery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {filtered.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 70}
              className={project.wide ? "sm:col-span-2" : ""}
            >
              <div
                ref={(el) => { cardRefs.current[project.id] = el; }}
                className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer card-hover max-h-[70vh] mx-auto ${
                  project.aspect || (project.wide ? "aspect-[21/9]" : "aspect-[4/5]")
                }`}
              >
                {project.video ? (
                  <video
                    ref={(el) => { videoRefs.current[project.id] = el; }}
                    src={loaded[project.id] ? project.video : undefined}
                    poster={posterFor(project.video)}
                    preload="none"
                    autoPlay={loaded[project.id]}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/75 via-espresso-900/10 to-transparent" />

                {/* Category pill */}
                <div className="absolute top-5 left-5">
                  <span className="glass-chip text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Sound toggle (video projects only) */}
                {project.video && (
                  <div className="absolute top-16 left-5">
                    <button
                      onClick={() => toggleSound(project.id)}
                      aria-label={muted[project.id] === false ? "Mute video" : "Unmute video"}
                      className="glass-chip flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer hover:bg-white/10 transition-all duration-300"
                    >
                      <span className="w-6 h-6 rounded-full bg-clay-500 flex items-center justify-center shrink-0">
                        {muted[project.id] === false ? (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9l4 6m0-6l-4 6" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[11px] font-bold text-white">
                        {muted[project.id] === false ? "Sound On" : "Tap for Sound"}
                      </span>
                    </button>
                  </div>
                )}

                {/* Tag pills */}
                <div className="absolute top-5 right-5 flex flex-wrap gap-1.5 justify-end">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-clay-500/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom info */}
                {project.video ? (
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="glass-chip rounded-2xl px-5 py-3.5">
                      <p className="text-white font-bold text-base leading-tight">
                        {project.title}
                      </p>
                      <p className="text-white/75 text-xs mt-0.5">{project.location}</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sand-100/70 text-xs uppercase tracking-widest font-sans mb-1">
                      {project.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-bold text-2xl leading-tight">
                        {project.title}
                      </p>
                      <div className="w-9 h-9 rounded-full bg-clay-500/80 border border-clay-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-12 flex justify-center">
            <a
              href="#services"
              className="glass-chip inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm hover:bg-clay-500 active:scale-[0.97] transition-all duration-300"
            >
              Ways we can work together
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
