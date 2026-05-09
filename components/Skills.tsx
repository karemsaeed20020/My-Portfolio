"use client";
import { skills, concepts } from "@/app/data";

export default function Skills() {
  const grad = ["linear-gradient(90deg,#3B82F6,#2563EB)","linear-gradient(90deg,#22D3EE,#0891B2)","linear-gradient(90deg,#A78BFA,#7C3AED)"];

  return (
    <section id="skills" className="sk-section py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,var(--border2),transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="sr mb-16 grid lg:grid-cols-[1fr_2fr] gap-10 items-end">
          <div>
            <span className="sec-label block mb-3">02 — Skills</span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold" style={{ color:"var(--text)" }}>
              Tech<br /><span className="grad">Stack</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed max-w-lg self-end" style={{ color:"var(--muted)" }}>
            Technologies I use to build scalable, maintainable full-stack systems — from database design to polished UIs.
          </p>
        </div>

        {/* Skill columns */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {skills.map((cat, ci) => (
            <div key={cat.category} className={`sr glass rounded-2xl p-7 d${ci+1}`}>
              <div className="flex items-center gap-2 mb-6 pb-5 border-b" style={{ borderColor:"var(--border)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: ci===0?"var(--blue)":ci===1?"var(--cyan)":"#A78BFA" }} />
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color:"var(--muted)" }}>{cat.category}</span>
              </div>
              <div className="space-y-5">
                {cat.items.map((sk, si) => (
                  <div key={sk.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm" style={{ color:"var(--text)" }}>{sk.name}</span>
                      <span className="font-mono text-xs" style={{ color:"var(--dim)" }}>{sk.pct}%</span>
                    </div>
                    <div className="sk-track">
                      <div className="sk-fill" style={{ background: grad[ci], transitionDelay:`${si*0.1+ci*0.15}s` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Concepts cloud */}
        <div className="sr d2">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background:"var(--border2)" }} />
            <span className="sec-label">Concepts & Principles</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {concepts.map(c => (
              <span key={c} className="badge cursor-default">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
