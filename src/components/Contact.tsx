"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");
    data.append("subject", "New project inquiry from dobletoma.com");
    data.append("from_name", "Doble Toma website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">

      <div className="relative z-10">

      {/* ── Big clay CTA ── */}
      <div className="px-5 md:px-[5vw] pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="bg-espresso-900 rounded-5xl p-10 lg:p-16 relative overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <p className="text-white/85 text-xs font-semibold uppercase tracking-widest mb-4">
                    Ready when you are.
                  </p>
                  <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-lg">
                    Let&rsquo;s create something{" "}
                    <span className="italic font-light">worth sharing.</span>
                  </h2>
                </div>

                <div className="flex flex-col gap-4 min-w-fit">
                  <a
                    href="mailto:dobletoma.studio@gmail.com"
                    className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 text-espresso-900 font-bold text-sm hover:scale-[1.02] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    dobletoma.studio@gmail.com
                  </a>
                  <a
                    href="https://instagram.com/dobletoma.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/15 rounded-2xl px-6 py-4 text-white font-bold text-sm hover:bg-white/25 transition-all duration-300 border border-white/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    @dobletoma.studio
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Contact form ── */}
      <div className="px-5 md:px-[5vw] pb-24 lg:pb-32 pt-8">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={100}>
            <div className="glass-dark rounded-[2.5rem] p-8 lg:p-12">
              <h3 className="font-sans font-bold text-2xl text-white mb-2">Start a Project</h3>
              <p className="text-sand-100/70 text-sm mb-8">
                Tell us what you have in mind.{" "}
                <span className="text-xs text-sand-100/55">We&rsquo;ll respond within 24 hours.</span>
              </p>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-clay-500/20 flex items-center justify-center mb-5 border border-clay-500/30">
                    <svg className="w-7 h-7 text-clay-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-bold text-xl text-white mb-2">Message received</p>
                  <p className="text-sand-100/70 text-sm max-w-xs">
                    We&rsquo;re reviewing your project and will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                  {[
                    { id: "name",     label: "Your name",            type: "text",  required: true  },
                    { id: "business", label: "Property / Brand name", type: "text",  required: true  },
                    { id: "email",    label: "Email address",        type: "email", required: true  },
                    { id: "social",   label: "Instagram or website", type: "text", required: false },
                  ].map((f) => (
                    <div key={f.id}>
                      <label
                        htmlFor={f.id}
                        className="block text-[11px] font-semibold uppercase tracking-widest text-sand-100/65 mb-2"
                      >
                        {f.label}
                        {f.required && <span className="text-clay-400 ml-1">*</span>}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        required={f.required}
                        className="w-full bg-sand-100/8 border border-sand-100/12 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-clay-400/50 focus:bg-sand-100/10 transition-all placeholder-sand-100/35 font-sans"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-semibold uppercase tracking-widest text-sand-100/35 mb-2"
                    >
                      Tell us what you need <span className="text-clay-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us about your property, what kind of content you need, and your goals..."
                      className="w-full bg-sand-100/8 border border-sand-100/12 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-clay-400/50 focus:bg-sand-100/10 transition-all resize-none placeholder-sand-100/35 font-sans"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-10 py-4 rounded-full bg-dusty-500 text-white font-bold text-sm hover:bg-dusty-600 active:scale-[0.97] transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? "Sending…" : "Send message →"}
                    </button>
                    {error && (
                      <p className="mt-3 text-clay-400 text-xs">
                        Something went wrong sending your message. Please try again, or email us directly at dobletoma.studio@gmail.com.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      </div>
    </section>
  );
}
