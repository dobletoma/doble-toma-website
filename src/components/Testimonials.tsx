import Reveal from "./Reveal";

const testimonials = [
  {
    quote: "Since working with Doble Toma, our direct bookings from Instagram nearly doubled. The content finally looks like the experience we actually offer.",
    author: "Elena Cross",
    brand: "Casa Amara · Tulum",
    result: "+85% direct bookings",
  },
  {
    quote: "They don't just show up and shoot — they understand hospitality. Every reel feels like a scene from the stay itself.",
    author: "Marco Villanueva",
    brand: "Hotel Solana · Oaxaca",
    result: "2× social engagement",
  },
  {
    quote: "We launched with zero content and a story no one had seen. Three months later, guests were booking because of what they saw online.",
    author: "Isabelle Laurent",
    brand: "Villa Estero · Careyes",
    result: "Fully booked season",
  },
];

const cardStyles = [
  { card: "bg-espresso-900", strip: "bg-clay-500", stripLabel: "text-white/70", stripResult: "text-white", quote: "text-white/75", border: "border-white/10", author: "text-white", brandText: "text-white/35" },
  { card: "bg-sand-100 border border-sand-300", strip: "bg-sage-500/25", stripLabel: "text-ink-500", stripResult: "text-ink-900", quote: "text-ink-600", border: "border-sand-300", author: "text-ink-900", brandText: "text-ink-400" },
  { card: "bg-sand-100 border border-sand-300", strip: "bg-dusty-500/25", stripLabel: "text-ink-500", stripResult: "text-ink-900", quote: "text-ink-600", border: "border-sand-300", author: "text-ink-900", brandText: "text-ink-400" },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 px-5 md:px-[5vw] bg-sand-50">
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-clay-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-clay-500">
              What Clients Say
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-ink-900 mb-16 max-w-xl">
            Our clients{" "}
            <span className="italic font-light text-clay-500">speak for us.</span>
          </h2>
        </Reveal>

        {/* Magazine-style testimonial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const c = cardStyles[i];
            return (
              <Reveal key={i} delay={i * 100}>
                <div className={`rounded-4xl overflow-hidden h-full flex flex-col ${c.card}`}>

                  {/* Header strip */}
                  <div className={`px-7 py-4 ${c.strip}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.stripLabel}`}>
                      Doble Toma Review · Client
                    </p>
                    <p className={`text-lg italic font-light mt-0.5 ${c.stripResult}`}>
                      {t.result}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="px-7 py-7 flex flex-col justify-between flex-1">
                    <p className={`text-[15px] leading-relaxed italic ${c.quote}`}>
                      <span className="text-5xl leading-[0] align-[-18px] mr-1 not-italic text-clay-400">"</span>
                      {t.quote}
                    </p>
                    <div className={`mt-7 pt-5 border-t ${c.border}`}>
                      <p className={`text-sm font-bold ${c.author}`}>
                        {t.author}
                      </p>
                      <p className={`text-xs mt-0.5 uppercase tracking-widest ${c.brandText}`}>
                        {t.brand}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
