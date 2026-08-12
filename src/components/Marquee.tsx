"use client";

const items = [
  "Social Media Content",
  "Boutique Hotels",
  "Villas",
  "Luxury Hotels",
  "Airbnb Content",
  "Curated Experiences",
  "Travel Content Creation",
  "UGC",
  "Drone Footage",
  "Drone Photography",
  "Reels & Shorts",
  "Hospitality Marketing",
  "Hotel Content Creation",
];

export default function Marquee() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 30s linear infinite; }
      `}</style>
      <div className="relative py-4 overflow-hidden border-y border-white/15" style={{ background: "rgba(20,20,16,0.16)", backdropFilter: "blur(6px)" }}>
        <div className="marquee-track flex gap-8 whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 text-[11px] font-bold text-white uppercase tracking-[0.15em] flex-shrink-0"
            >
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
