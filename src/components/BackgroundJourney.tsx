"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

// One continuous photographic environment that morphs as the user scrolls —
// each waypoint corresponds to a section's id, in DOM order. At every scroll
// position exactly one or two adjacent layers are visible and their
// opacities always sum to 1, so the raw page background is never exposed.
const waypoints = [
  { id: "hero",     src: "/bg-hero.jpg" }, // dark green tropical leaves layered closely together
  { id: "about",    src: "/bg-about.jpg", dim: 0.32 }, // smooth sandstone — dimmed further so the light glass panel's text (incl. clay-orange accents) stays readable over its brightest highlights
  { id: "work",     src: "/bg-work.jpg" }, // rich dark navy ocean water, deep and saturated — more luxurious tone
  { id: "services", src: "/bg-services.jpg" }, // warm amber-brown wood slab, swirling organic grain, shot from a normal distance (not macro) so it stays crisp at full-screen size
  { id: "process",  src: "/bg-process.jpg" }, // sand / paper texture
  { id: "contact",  src: "/bg-contact.jpg", dim: 0.5 }, // dark green leaves, water droplets — dimmed further since the Footer sits directly on this image with no card behind it
];

// Fraction of each inter-waypoint gap spent actually crossfading — confined
// to the END of the gap so a section's image is fully settled by the time
// its own top is reached (not centered, which let the previous image linger
// into the next section's opening). 0.35 = last 35% of the gap.
const TRANSITION_SPAN = 0.35;

export default function BackgroundJourney() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positionsRef = useRef<number[]>(waypoints.map((_, i) => i / (waypoints.length - 1)));
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      positionsRef.current = waypoints.map((w, i) => {
        // Anchor to each section's TOP (not its center) so the crossfade
        // into a section's image finishes exactly when that section's top
        // arrives on screen, instead of bleeding the previous background
        // into the start of the next section.
        if (i === 0) return 0;
        const el = document.getElementById(w.id);
        if (!el) return i / (waypoints.length - 1);
        return Math.min(1, Math.max(0, el.offsetTop / docHeight));
      });
    };

    const smoothstep = (x: number) => x * x * (3 - 2 * x);

    // Eased progress between two adjacent waypoints: flat at 0 for most of
    // the gap, then a smooth S-curve blend only in the final TRANSITION_SPAN
    // — so weight reaches exactly 1 right as the next section's top arrives.
    const easeGap = (p: number) => {
      const lo = 1 - TRANSITION_SPAN;
      if (p <= lo) return 0;
      if (p >= 1) return 1;
      return smoothstep((p - lo) / TRANSITION_SPAN);
    };

    const apply = () => {
      rafRef.current = null;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const t = docHeight > 0 ? window.scrollY / docHeight : 0;
      const positions = positionsRef.current;
      const n = waypoints.length;

      // Reset all weights to 0, then set the (at most two) active ones.
      const weights = new Array(n).fill(0);

      if (t <= positions[0]) {
        weights[0] = 1;
      } else if (t >= positions[n - 1]) {
        weights[n - 1] = 1;
      } else {
        let idx = 0;
        for (let i = 0; i < n - 1; i++) {
          if (t >= positions[i] && t <= positions[i + 1]) { idx = i; break; }
        }
        const span = Math.max(1e-6, positions[idx + 1] - positions[idx]);
        const p = (t - positions[idx]) / span;
        const eased = reducedMotion.current ? Math.round(p) : easeGap(p);
        weights[idx] = 1 - eased;
        weights[idx + 1] = eased;
      }

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const w = weights[i];
        el.style.opacity = String(w);
        if (reducedMotion.current) {
          el.style.transform = "";
          el.style.filter = "";
          return;
        }
        // Morph intensity peaks exactly at the 50/50 crossover of a
        // transition and is zero once either image is fully dominant.
        const intensity = 2 * Math.min(w, 1 - w); // 0 at w=0/1, 1 at w=0.5
        el.style.filter = intensity > 0.01 ? `blur(${(intensity * 10).toFixed(1)}px)` : "";
        el.style.transform = `scale(${(1 + intensity * 0.035).toFixed(3)})`;
      });
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(apply);
    };

    // Section heights change a lot across breakpoints (Services/Process grids
    // go from 1 column to 3–5 columns), which shifts every position below
    // them. Re-measuring alone isn't enough — the on-screen weights must be
    // re-applied too, or the previous section's image stays frozen on screen
    // until the next scroll tick.
    const onResize = () => {
      measure();
      apply();
    };

    measure();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // The page's total height can keep shifting after mount for reasons a
    // resize/scroll listener never sees: web fonts swapping in (reflowing
    // every large headline), late-loading content, etc. A fixed timeout is a
    // guess; a ResizeObserver on the document reacts to the real thing
    // whenever it happens, so positions never go stale.
    let roRaf: number | null = null;
    const ro = new ResizeObserver(() => {
      if (roRaf != null) return;
      roRaf = requestAnimationFrame(() => {
        roRaf = null;
        onResize();
      });
    });
    ro.observe(document.documentElement);

    if (typeof document.fonts?.ready?.then === "function") {
      document.fonts.ready.then(onResize);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (roRaf != null) cancelAnimationFrame(roRaf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {waypoints.map((w, i) => (
        <div
          key={w.id}
          ref={(el) => { layerRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity, transform, filter" }}
        >
          <Image
            src={w.src}
            alt=""
            fill
            loading="eager"
            quality={95}
            className="object-cover"
            sizes="100vw"
            style={w.dim ? { filter: `brightness(${w.dim})` } : undefined}
          />
        </div>
      ))}
      {/* One shared, subtle vignette — kept light so the photo stays crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/16 via-transparent to-black/26" />
    </div>
  );
}
