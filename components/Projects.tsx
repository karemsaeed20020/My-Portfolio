"use client";
import { useState } from "react";
import Image from "next/image";
import { projects } from "@/app/data";

export default function Projects() {
  const [hov, setHov] = useState<number|null>(null);
  const featured = projects.filter(p=>p.featured);
  const others   = projects.filter(p=>!p.featured);

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,var(--border2),transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="sr flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="sec-label block mb-3">03 — Projects</span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold" style={{ color:"var(--text)" }}>
              Selected <span className="grad">Work</span>
            </h2>
          </div>
          <p className="font-mono text-xs max-w-xs text-right leading-relaxed" style={{ color:"var(--dim)" }}>
            Production apps · internship builds · personal explorations
          </p>
        </div>

        {/* Featured */}
        <div className="space-y-5 mb-8">
          {featured.map((p,i) => (
            <div
              key={p.id}
              onMouseEnter={()=>setHov(p.id)}
              onMouseLeave={()=>setHov(null)}
              className={`sr glass rounded-2xl overflow-hidden d${i+1}`}
            >
              <div className={`grid ${i%2===0?"lg:grid-cols-[1fr_360px]":"lg:grid-cols-[360px_1fr]"} items-stretch`}>
                {/* Text */}
                <div className={`p-8 lg:p-10 flex flex-col justify-between ${i%2!==0?"lg:order-2":""}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-xs" style={{ color:"var(--dim)" }}>
                        {String(i+1).padStart(2,"0")}
                      </span>
                      <div className="h-px flex-1" style={{ background:"var(--border)" }} />
                      <span className="font-mono text-xs" style={{ color:"var(--dim)" }}>{p.year}</span>
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold mb-1" style={{ color:"var(--text)" }}>
                      {p.title}
                    </h3>
                    <p className="font-mono text-xs mb-5" style={{ color: p.accent }}>{p.subtitle}</p>
                    <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color:"var(--muted)" }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-7">
                      {p.tags.map(t=><span key={t} className="badge">{t}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-blue rounded-lg text-xs py-2.5 px-5">
                      <span>Code</span><span>↗</span>
                    </a>
                    {p.live!=="#" && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost rounded-lg text-xs py-2.5 px-5">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className={`relative min-h-56 overflow-hidden ${i%2!==0?"lg:order-1":""}`}
                  style={{ background:"var(--card2)" }}>
                  <Image
                    src={p.image} alt={p.title} fill
                    className={`object-cover transition-transform duration-700 ${hov===p.id?"scale-105":"scale-100"}`}
                    onError={e=>{(e.target as HTMLImageElement).style.display="none";}}
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center font-display text-2xl font-bold border"
                      style={{ borderColor:`${p.accent}44`, color:p.accent, background:`${p.accent}11` }}>
                      {p.title.charAt(0)}
                    </div>
                    <span className="font-mono text-xs" style={{ color:"var(--dim)" }}>Add screenshot</span>
                  </div>
                  {/* Left accent */}
                  <div className="absolute top-0 left-0 bottom-0 w-0.5" style={{ background: p.accent }} />
                  {/* Overlay */}
                  <div className="absolute inset-0" style={{ background:"linear-gradient(180deg,transparent 40%,rgba(11,15,26,0.5) 100%)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        <div>
          <div className="sr flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background:"var(--border2)" }} />
            <span className="sec-label">More Projects</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((p,i)=>(
              <div
                key={p.id}
                onMouseEnter={()=>setHov(p.id)}
                onMouseLeave={()=>setHov(null)}
                className={`sr glass rounded-2xl p-6 d${i+1} relative overflow-hidden group`}
              >
                {/* Accent top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background:p.accent }} />

                {/* Number */}
                <div className="font-display text-4xl font-black mb-4 transition-colors duration-300"
                  style={{ color: hov===p.id ? `${p.accent}22` : "var(--border2)" }}>
                  {String(featured.length+i+1).padStart(2,"0")}
                </div>

                <h3 className="font-display text-base font-bold mb-1" style={{ color:"var(--text)" }}>{p.title}</h3>
                <p className="font-mono text-xs mb-3" style={{ color:p.accent }}>{p.subtitle}</p>
                <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color:"var(--muted)" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.slice(0,3).map(t=>(
                    <span key={t} className="font-mono text-xs px-2 py-0.5 rounded border"
                      style={{ borderColor:`${p.accent}33`, color:`${p.accent}bb`, background:`${p.accent}0a` }}>
                      {t}
                    </span>
                  ))}
                </div>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                  style={{ color:"var(--dim)" }}
                  onMouseEnter={e=>(e.currentTarget.style.color=p.accent)}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--dim)")}
                >
                  GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
