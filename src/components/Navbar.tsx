"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process" },
];

function NavWordmark({ small = false }: { small?: boolean }) {
  const size = small ? "text-[11px]" : "text-[13px]";
  return (
    <div className="leading-[0.82] text-center">
      <div className={`font-sans font-light tracking-tight text-logo ${size}`}>
        DOBLE
      </div>
      <div className={`font-sans font-extrabold tracking-tight text-logo ${size}`}>
        TOMA
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── Desktop nav ── */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-5xl hidden md:block">
        <nav
          className={`glass-nav relative flex items-center justify-between px-6 py-3 rounded-full transition-shadow duration-500 ${
            scrolled ? "shadow-[0_12px_44px_rgba(0,0,0,0.32)]" : ""
          }`}
        >
          <a href="#hero" className="flex items-center select-none shrink-0 z-10">
            <NavWordmark />
          </a>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[12px] font-medium text-sand-100/85 hover:text-logo transition-colors duration-200 tracking-wide uppercase"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-dusty-500 text-white text-[12px] font-bold hover:bg-dusty-600 active:scale-95 transition-all duration-200 shrink-0 tracking-wide z-10"
          >
            Work with Us ↗
          </a>
        </nav>
      </header>

      {/* ── Mobile nav ── */}
      <header className="fixed top-5 left-0 right-0 z-50 px-4 md:hidden">
        <nav className="glass-nav flex items-center justify-between px-5 py-3 rounded-full">
          <a href="#hero" className="flex items-center select-none">
            <NavWordmark small />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        <div className={`overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="glass-nav mt-2 rounded-3xl px-5 py-5 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-sand-100/85 hover:text-logo transition-colors uppercase tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-5 py-3 rounded-full bg-dusty-500 text-white text-sm font-bold text-center hover:bg-dusty-600 transition-colors"
            >
              Work with Us ↗
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
