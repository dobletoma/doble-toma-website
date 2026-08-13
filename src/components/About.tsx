import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 px-5 md:px-[5vw] overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto">

        <Reveal>
          <div className="glass-dark rounded-[2.5rem] p-6 md:p-10">

            {/* ── Editorial header ── */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-clay-500">
                About Us
              </span>
            </div>

            {/* ── Asymmetric grid ── */}
            <div className="grid lg:grid-cols-2 gap-6 items-stretch">

              {/* ── Big editorial typography + photo ── */}
              <div className="flex flex-col gap-6 h-full">

                {/* What we believe in */}
                <div className="bg-espresso-900 rounded-[2rem] p-10 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-sand-100/90">
                      What We Believe In
                    </span>
                  </div>
                  <h3 className="font-sans italic font-light text-3xl md:text-4xl leading-tight tracking-tight text-logo mb-4">
                    Great spaces deserve great content.
                  </h3>
                  <p className="text-sand-100/90 text-base leading-relaxed">
                    We believe in creating visuals that feel true to a place, connect with the right people, and make them want to experience it.
                  </p>
                </div>

                {/* Founder image — sized to the photo's own aspect ratio so nothing gets cropped */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[1991/1593]">
                  <Image
                    src="/founders-paulina-adriana.jpg"
                    alt="Paulina Garza and Adriana Jimenez, founders of Doble Toma"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex gap-3">
                      <div className="glass-chip flex-1 rounded-2xl px-4 py-3">
                        <p className="text-white font-semibold text-sm">Adriana Jimenez</p>
                        <p className="text-sand-100/75 text-xs mt-0.5">Co-Founder & Creative Producer</p>
                      </div>
                      <div className="glass-chip flex-1 rounded-2xl px-4 py-3">
                        <p className="text-white font-semibold text-sm">Paulina Garza</p>
                        <p className="text-sand-100/75 text-xs mt-0.5">Co-Founder & Creative Director</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Story + stats ── */}
              <div className="flex flex-col">

                <h2 className="font-sans font-extrabold text-4xl lg:text-5xl leading-tight tracking-tight text-logo mb-6">
                  Every space deserves to be seen.{" "}
                  <span className="italic font-light text-clay-400">
                    That&rsquo;s where we come in.
                  </span>
                </h2>
                <p className="text-sand-100/90 text-base leading-relaxed mb-4">
                  Doble Toma is a creative content studio founded by Paulina Garza and Adriana Jimenez. We create social-first content for boutique hotels, villas, Airbnbs, and hospitality brands.
                </p>
                <p className="text-sand-100/90 text-base leading-relaxed mb-4">
                  From creative direction and production to filming, editing, and final delivery, we handle every step of the creative process—creating content designed to inspire travel and drive bookings.
                </p>
                <p className="text-sand-100/90 text-base leading-relaxed italic">
                  Based in Monterrey, Mexico — available worldwide.
                </p>

                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-sand-100/15">
                  <p className="text-sm font-medium text-logo italic">
                    "Two founders. One shared vision."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-8">
                  <div className="rounded-[1.5rem] p-5 md:p-7 text-white text-center" style={{ background: "rgba(181,98,63,0.9)" }}>
                    <p className="font-extrabold text-4xl md:text-5xl leading-none tracking-tight">6+</p>
                    <p className="mt-2 text-white/90 text-sm font-medium leading-snug">
                      Luxury Properties Filmed
                    </p>
                  </div>
                  <div className="bg-espresso-900 rounded-[1.5rem] p-5 md:p-7 text-white text-center">
                    <p className="font-extrabold text-4xl md:text-5xl leading-none tracking-tight">100%</p>
                    <p className="mt-2 text-white/80 text-sm font-medium leading-snug">
                      Tailored Content
                    </p>
                  </div>
                </div>

                {/* "From concept to delivery" */}
                <div className="mt-8 pt-8 border-t border-sand-100/15">
                  <p className="text-xs font-semibold uppercase tracking-widest text-clay-400 mb-4">
                    From Concept to Delivery
                  </p>
                  <div className="grid grid-cols-2 grid-rows-4 grid-flow-col gap-2">
                    {[
                      "Creative Direction",
                      "Content Planning",
                      "Production & Filming",
                      "Drone Content",
                      "UGC Creation",
                      "Editing & Post-Production",
                      "Final Delivery",
                    ].map((item, i) => (
                      <div key={item} className="flex items-start gap-2 text-base leading-relaxed text-sand-100/90">
                        <span className="text-xs font-bold text-clay-400 shrink-0 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
