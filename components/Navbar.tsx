"use client";
import { useState, useEffect } from "react";
import { personal } from "@/app/data";

const links = [
  { href:"#about",      label:"About" },
  { href:"#skills",     label:"Skills" },
  { href:"#projects",   label:"Projects" },
  { href:"#experience", label:"Experience" },
  { href:"#contact",    label:"Contact" },
];

export default function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior:"smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? "rgba(11,15,26,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s, padding 0.4s, background 0.4s, border 0.4s, backdrop-filter 0.4s",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go("#about")} className="font-display text-lg font-bold text-text">
            Kareem<span style={{ color:"var(--blue)" }}>.</span>
          </button>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className="nav-link px-4 py-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-text transition-colors duration-200 relative group"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="dot-glow" />
              Open to work
            </div>
            <a href={`mailto:${personal.email}`} className="btn btn-blue text-xs py-2 px-5 rounded-md">
              <span>Hire Me</span>
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-1" aria-label="menu">
            <span className={`block h-px w-6 bg-text transition-all duration-300 ${open?"rotate-45 translate-y-2.5":""}`} />
            <span className={`block h-px w-6 bg-text transition-all duration-300 ${open?"opacity-0":""}`} />
            <span className={`block h-px w-6 bg-text transition-all duration-300 ${open?"-rotate-45 -translate-y-2.5":""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center px-10 transition-all duration-500"
        style={{ background:"var(--bg)", opacity: open?1:0, pointerEvents: open?"auto":"none" }}
      >
        <div className="space-y-1 mb-12">
          {links.map((l,i) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="block w-full text-left font-display text-5xl font-bold text-text hover:text-blue-400 transition-colors duration-200 py-2"
              style={{ transitionDelay: open ? `${i*0.07}s`:"0s" }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex gap-6">
          <a href={personal.github}   target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted hover:text-blue-400 transition-colors uppercase tracking-widest">GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted hover:text-blue-400 transition-colors uppercase tracking-widest">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
