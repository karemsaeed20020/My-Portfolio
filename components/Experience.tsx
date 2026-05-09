"use client";
import { experience, education, personal } from "@/app/data";

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,var(--border2),transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="sr mb-16">
          <span className="sec-label block mb-3">04 — Journey</span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold" style={{ color:"var(--text)" }}>
            Experience &<br /><span className="grad">Education</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Timeline */}
          <div>
            <div className="sr flex items-center gap-3 mb-8">
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color:"var(--dim)" }}>Work History</span>
            </div>

            <div className="relative pl-10">
              <div className="tl-line" />
              <div className="space-y-8">
                {experience.map((exp,i)=>(
                  <div key={i} className={`sr d${i+1} relative`}>
                    {/* Timeline dot */}
                    <div className="absolute" style={{ left:-10+(-24), top:20 }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center border-2"
                        style={{ background:"var(--bg)", borderColor:exp.color, boxShadow:`0 0 12px ${exp.color}55` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background:exp.color }} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="glass rounded-2xl p-7">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                        <div>
                          <h3 className="font-display text-xl font-bold mb-1" style={{ color:"var(--text)" }}>{exp.role}</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background:exp.color }} />
                            <span className="font-mono text-sm font-medium" style={{ color:exp.color }}>{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-xs px-3 py-1 rounded border" style={{ color:"var(--muted)", borderColor:"var(--border2)" }}>{exp.period}</span>
                          <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ color:exp.color, background:`${exp.color}15` }}>{exp.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs mb-5" style={{ color:"var(--dim)" }}>
                        <span>📍</span>{exp.location}
                      </div>

                      <ul className="space-y-2.5">
                        {exp.points.map((pt,j)=>(
                          <li key={j} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color:"var(--muted)" }}>
                            <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background:exp.color }} />
                            <span dangerouslySetInnerHTML={{ __html: pt.replace(/\*\*(.*?)\*\*/g,`<strong style="color:var(--text);font-weight:600">$1</strong>`) }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {/* Education */}
            <div className="sr d1">
              <span className="font-mono text-xs tracking-widest uppercase block mb-4" style={{ color:"var(--dim)" }}>Education</span>
              <div className="glass rounded-2xl p-6">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="font-display text-lg font-bold mb-1" style={{ color:"var(--text)" }}>{education.degree}</h3>
                <div className="font-mono text-xs mb-0.5" style={{ color:"var(--blue)" }}>{education.university}</div>
                <div className="font-mono text-xs mb-5" style={{ color:"var(--muted)" }}>{education.faculty}</div>
                <div className="border-t pt-4 space-y-2.5" style={{ borderColor:"var(--border)" }}>
                  {[
                    { k:"Period", v:education.period },
                    { k:"GPA",    v:education.gpa, hl:true },
                  ].map(r=>(
                    <div key={r.k} className="flex justify-between font-mono text-xs">
                      <span style={{ color:"var(--dim)" }}>{r.k}</span>
                      <span style={{ color: r.hl?"#4ade80":"var(--muted)", fontWeight: r.hl?700:400 }}>{r.v}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between font-mono text-xs border-t pt-2.5" style={{ borderColor:"var(--border)" }}>
                    <span style={{ color:"var(--blue)" }}>🏆 {education.project}</span>
                    <span style={{ color:"#4ade80", fontWeight:700 }}>{education.projectGrade}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="sr d2">
              <span className="font-mono text-xs tracking-widest uppercase block mb-4" style={{ color:"var(--dim)" }}>Quick Facts</span>
              <div className="glass rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
                {[
                  { icon:"📍", k:"Location",   v:personal.location },
                  { icon:"🌐", k:"Languages",  v:"Arabic · English" },
                  { icon:"⚡", k:"Stack",      v:".NET Core + React" },
                  { icon:"🎯", k:"Seeking",    v:"Full-time / Freelance" },
                  { icon:"✅", k:"Available",  v:"Immediately" },
                ].map(f=>(
                  <div key={f.k} className="flex items-center gap-4 px-5 py-3">
                    <span className="text-sm">{f.icon}</span>
                    <span className="font-mono text-xs w-20" style={{ color:"var(--dim)" }}>{f.k}</span>
                    <span className="font-mono text-xs ml-auto" style={{ color:"var(--muted)" }}>{f.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="sr d3 grid grid-cols-2 gap-3">
              <a href={personal.github} target="_blank" rel="noopener noreferrer"
                className="glass rounded-xl flex items-center gap-2 px-4 py-3 font-mono text-xs transition-colors duration-200"
                style={{ color:"var(--muted)" }}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--blue)")}
                onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                className="glass rounded-xl flex items-center gap-2 px-4 py-3 font-mono text-xs"
                style={{ color:"#60a5fa" }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
