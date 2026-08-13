"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "2",   label: "Creative\nFounders" },
  { value: "6+",  label: "Luxury Properties\nFilmed" },
  { value: "100%", label: "Tailored\nContent" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  // If the video has sound on and gets scrolled more than half out of
  // view, mute it again — sound shouldn't keep playing once you've moved on.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.5 && !mutedRef.current) {
          const video = videoRef.current;
          if (video) video.muted = true;
          setMuted(true);
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-5 md:px-[5vw] pt-36 md:pt-52 pb-8 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center">

          {/* ── Left column — glass panel ── */}
          <div className="glass-dark flex flex-col rounded-[2.5rem] p-7 md:p-10">

            {/* Studio pill */}
            <div className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 self-start ml-0">
              <span className="text-[11px] font-medium text-sand-100/85 tracking-widest uppercase whitespace-nowrap">
                Creative Content Studio
              </span>
            </div>

            {/* Wordmark — echoes the logo's thin + bold stacked treatment */}
            <h1 className="leading-[0.86] text-center self-start">
              <span className="block font-sans font-light text-display tracking-tight text-logo">DOBLE</span>
              <span className="block font-sans font-extrabold text-display tracking-tight text-logo">TOMA</span>
            </h1>

            <p className="mt-6 text-sand-100/80 not-italic text-xl md:text-2xl lg:text-[1.65rem] leading-snug max-w-xs lg:max-w-sm ml-0">
              Capturing the essence of{" "}
              <span className="text-clay-400 italic font-semibold">elevated spaces.</span>
            </p>

            <p className="mt-3 text-sand-100/65 text-sm leading-relaxed max-w-sm ml-0">
              We create social-first content for boutique hotels, villas, luxury stays, and curated experiences — the kind that makes people stop scrolling and start booking.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3 ml-0">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-dusty-500 text-white font-bold text-sm hover:bg-dusty-600 active:scale-[0.97] transition-all duration-300"
              >
                See Our Work
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Stat cards */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm ml-0">
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="glass-chip rounded-3xl px-4 py-4"
                >
                  <p className="font-sans font-extrabold text-2xl text-sand-50 leading-none tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium text-sand-100/65 leading-snug whitespace-pre-line">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — editorial image card ── */}
          <div className="relative mt-8 lg:mt-0 self-stretch flex items-center">
            <div
              ref={containerRef}
              className="relative w-full group overflow-hidden"
              style={{
                borderRadius: "2.5rem",
                height: "clamp(480px, 80vh, 840px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <video
                ref={videoRef}
                src="/casa-ohana-hero.mp4"
                poster="/casa-ohana-hero-poster.jpg"
                preload="auto"
                autoPlay
                loop
                muted={muted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Sound toggle */}
              <div className="absolute top-5 right-5">
                <button
                  onClick={toggleSound}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="glass-chip flex items-center gap-2.5 rounded-full px-5 py-2.5 cursor-pointer hover:bg-white/10 transition-all duration-300"
                >
                  <span className="w-7 h-7 rounded-full bg-clay-500 flex items-center justify-center shrink-0">
                    {muted ? (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9l4 6m0-6l-4 6" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[13px] font-bold text-white">{muted ? "Tap for Sound" : "Sound On"}</span>
                </button>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass-chip rounded-2xl px-5 py-3.5">
                  <p className="text-sand-100/70 text-[10px] uppercase tracking-widest font-sans mb-0.5">Recent Work</p>
                  <p className="text-white font-bold text-base leading-tight">Casa Ohana</p>
                  <p className="text-white/75 text-xs mt-0.5">Puerto Escondido, Oaxaca</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute z-10 bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-20">
        <span className="text-[8px] tracking-[0.2em] uppercase text-white font-sans">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
