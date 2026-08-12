export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10">
      <div className="max-w-7xl mx-auto px-5 md:px-[5vw]">

        {/* Big editorial closing line */}
        <div className="py-16 lg:py-20 border-b border-sand-100/5 text-center">
          <p
            className="font-sans font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-logo"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
          >
            Made to be seen.
          </p>
          <p
            className="italic font-light text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-clay-400"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
          >
            Made to be shared.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-sans font-extrabold text-base tracking-tight text-logo uppercase">
              Doble Toma
            </span>
            <span className="text-[9px] tracking-widest text-clay-400 uppercase font-sans mt-0.5">
              Creative Content Studio
            </span>
          </div>

          <p className="text-white/45 text-xs font-sans">
            © {year} Doble Toma. All rights reserved.
          </p>

          <nav className="flex gap-6">
            {[
              { label: "About",    href: "#about" },
              { label: "Work",     href: "#work" },
              { label: "Services", href: "#services" },
              { label: "Contact",  href: "#contact" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs font-medium text-white/55 hover:text-white/90 transition-colors uppercase tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
