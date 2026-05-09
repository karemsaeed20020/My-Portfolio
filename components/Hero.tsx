"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { personal, stats, techBadges } from "@/app/data";

const ROLES = ["Full Stack Developer","  .NET Core Engineer","React & Angular Dev","Clean Architecture"];

export default function Hero({ visible }: { visible: boolean }) {
  const [ri, setRi] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const cur = ROLES[ri];
    let t: ReturnType<typeof setTimeout>;
    if (typing) {
      if (ci < cur.length) {
        t = setTimeout(() => { setText(cur.slice(0, ci+1)); setCi(c=>c+1); }, 60);
      } else {
        t = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (ci > 0) {
        t = setTimeout(() => { setText(cur.slice(0, ci-1)); setCi(c=>c-1); }, 30);
      } else {
        setRi(r => (r+1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(t);
  }, [visible, typing, ci, ri]);

  const delay = (ms: number) => `${ms}ms`;

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient blobs */}
      <div className="blob" style={{ width:600, height:600, background:"rgba(59,130,246,0.06)", top:"-10%", right:"-5%", animationDelay:"0s" }} />
      <div className="blob" style={{ width:400, height:400, background:"rgba(34,211,238,0.04)", bottom:"10%", left:"-5%", animationDelay:"3s" }} />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage:"linear-gradient(var(--border2) 1px,transparent 1px),linear-gradient(90deg,var(--border2) 1px,transparent 1px)",
        backgroundSize:"60px 60px"
      }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">

          {/* ── Left ── */}
          <div>
            {/* Available badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-8"
              style={{
                borderColor:"rgba(34,197,94,0.3)",
                background:"rgba(34,197,94,0.06)",
                color:"#4ade80",
                opacity: visible?1:0,
                transform: visible?"translateY(0)":"translateY(20px)",
                transition:`opacity 0.8s ease ${delay(100)}, transform 0.8s ease ${delay(100)}`,
              }}
            >
              <span className="dot-glow" />
              Available for opportunities
            </div>

            {/* Name */}
            <div style={{ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(40px)", transition:`opacity 0.9s ease ${delay(200)}, transform 0.9s ease ${delay(200)}` }}>
              <h1 className="font-display font-extrabold leading-[1.05] tracking-tight mb-2"
                  style={{ fontSize:"clamp(42px,6vw,76px)" }}>
                <span style={{ color:"var(--text)" }}>Kareem </span>
                <span className="grad">Saeed</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div
              className="flex items-center gap-2 mb-6"
              style={{ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(30px)", transition:`opacity 0.9s ease ${delay(350)}, transform 0.9s ease ${delay(350)}` }}
            >
              <div className="w-0.5 h-6 rounded" style={{ background:"var(--blue)" }} />
              <span className="font-mono text-lg" style={{ color:"var(--muted)", minWidth:"280px" }}>
                {text}<span className="tw-cursor">|</span>
              </span>
            </div>

            {/* Bio */}
            <p
              className="text-base leading-relaxed max-w-xl mb-8"
              style={{ color:"var(--muted)", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(30px)", transition:`opacity 0.9s ease ${delay(450)}, transform 0.9s ease ${delay(450)}` }}
            >
              {personal.bio}
            </p>

            {/* CTA */}
            <div
              className="flex flex-wrap gap-3 mb-12"
              style={{ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(30px)", transition:`opacity 0.9s ease ${delay(550)}, transform 0.9s ease ${delay(550)}` }}
            >
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
                className="btn btn-blue rounded-lg">
                <span>View Projects</span>
                <span>↓</span>
              </button>
              <a href={`mailto:${personal.email}`} className="btn btn-ghost rounded-lg">
                Get In Touch
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost rounded-lg font-mono text-xs">
                GitHub ↗
              </a>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-4 gap-0 border-t"
              style={{ borderColor:"var(--border)", opacity:visible?1:0, transition:`opacity 0.9s ease ${delay(650)}` }}
            >
              {stats.map((s,i) => (
                <div key={i} className={`pt-5 pr-4 ${i<3?"border-r":""}`} style={{ borderColor:"var(--border)" }}>
                  <div className="num text-2xl font-bold mb-1" style={{ color:"var(--text)" }}>{s.num}</div>
                  <div className="font-mono text-xs leading-tight" style={{ color:"var(--dim)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Avatar ── */}
          <div
            className="flex flex-col items-center"
            style={{ opacity:visible?1:0, transform:visible?"translateX(0)":"translateX(40px)", transition:`opacity 1s ease ${delay(300)}, transform 1s ease ${delay(300)}` }}
          >
            <div className="relative" style={{ width:280, height:280 }}>
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-dashed"
                style={{ borderColor:"rgba(59,130,246,0.15)", animation:"spin 20s linear infinite" }} />
              <div className="absolute inset-[-16px] rounded-full border border-dashed"
                style={{ borderColor:"rgba(34,211,238,0.08)", animation:"spin 30s linear infinite reverse" }} />

              {/* Orbit dots */}
              <div className="orbit-dot" style={{ background:"var(--blue)", boxShadow:"0 0 8px var(--blue)" }} />
              <div className="orbit-dot2" style={{ background:"var(--cyan)", boxShadow:"0 0 6px var(--cyan)" }} />

              {/* Photo */}
              <div
                className="relative rounded-full overflow-hidden"
                style={{ width:280, height:280, border:"2px solid var(--border2)", background:"var(--card2)" }}
              >
                <Image
                  src={personal.avatar}
                  alt="Kareem Saeed"
                  fill
                  className="object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display="none"; }}
                  priority
                />
                               {/* Overlay shimmer */}
                <div className="absolute inset-0 rounded-full" style={{
                  background:"linear-gradient(135deg,rgba(59,130,246,0.12) 0%,transparent 60%)"
                }} />
              </div>

              {/* Floating cards */}
              <div
                className="absolute glass rounded-xl px-4 py-2.5 shadow-xl"
                style={{ top:16, right:-56, animation:"float 5s ease-in-out infinite", animationDelay:"0s" }}
              >
                <div className="font-mono text-xs" style={{ color:"var(--muted)" }}>Primary</div>
                <div className="font-display text-sm font-bold" style={{ color:"var(--text)" }}>.NET Core</div>
              </div>
              <div
                className="absolute glass rounded-xl px-4 py-2.5 shadow-xl"
                style={{ bottom:32, left:-60, animation:"float 6s ease-in-out infinite", animationDelay:"1.5s" }}
              >
                <div className="font-mono text-xs" style={{ color:"var(--muted)" }}>Frontend</div>
                <div className="font-display text-sm font-bold grad">React · Next.js</div>
              </div>
              <div
                className="absolute glass rounded-xl px-3 py-2 shadow-xl"
                style={{ bottom:8, right:-48, animation:"float 7s ease-in-out infinite", animationDelay:"0.8s" }}
              >
                <div className="font-mono text-xs" style={{ color:"var(--cyan)" }}>Clean Arch ✓</div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-5 mt-8">
              {[
                { label:"GitHub",   href:personal.github },
                { label:"LinkedIn", href:personal.linkedin },
                { label:"Email",    href:`mailto:${personal.email}` },
              ].map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith("mailto")?"_self":"_blank"}
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                  style={{ color:"var(--dim)" }}
                  onMouseEnter={e => (e.currentTarget.style.color="var(--blue)")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--dim)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden border-t border-b py-3" style={{ borderColor:"var(--border)" }}>
        <div className="mq-track">
          {[...techBadges, ...techBadges].map((t,i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="font-mono text-xs tracking-widest uppercase whitespace-nowrap" style={{ color:"var(--dim)" }}>{t}</span>
              <span style={{ color:"var(--blue)", opacity:0.4 }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-2 py-6">
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color:"var(--dim)" }}>scroll</span>
        <div className="w-px h-10" style={{ background:"linear-gradient(180deg,var(--blue) 0%,transparent 100%)" }} />
      </div>
    </section>
  );
}
