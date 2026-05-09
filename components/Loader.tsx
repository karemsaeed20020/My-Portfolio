"use client";
import { useEffect, useState, useRef } from "react";

const FIRST = "Kareem";
const LAST  = "Saeed";
const ROLE  = "Full Stack Developer";

interface LoaderProps { onDone: () => void; }

export default function Loader({ onDone }: LoaderProps) {
  const [phase, setPhase] = useState<"idle"|"letters"|"bar"|"exit"|"done">("idle");
  const [pct, setPct] = useState(0);
  const [firstIn, setFirstIn] = useState<boolean[]>(Array(FIRST.length).fill(false));
  const [lastIn,  setLastIn]  = useState<boolean[]>(Array(LAST.length).fill(false));
  const [roleIn,  setRoleIn]  = useState(false);
  const [barIn,   setBarIn]   = useState(false);
  const [wipe,    setWipe]    = useState(false);
  const [hide,    setHide]    = useState(false);
  const pctRef = useRef(0);

  useEffect(() => {
    /* Step 1 — stagger letters in */
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase("letters"), 200));

    // First name letters
    FIRST.split("").forEach((_, i) => {
      timers.push(setTimeout(() => {
        setFirstIn(prev => { const n=[...prev]; n[i]=true; return n; });
      }, 300 + i * 80));
    });

    // Last name letters (after first name)
    LAST.split("").forEach((_, i) => {
      timers.push(setTimeout(() => {
        setLastIn(prev => { const n=[...prev]; n[i]=true; return n; });
      }, 300 + (FIRST.length + i) * 80 + 60));
    });

    // Role line
    timers.push(setTimeout(() => setRoleIn(true), 800));

    // Bar
    timers.push(setTimeout(() => { setBarIn(true); setPhase("bar"); }, 900));

    // Pct counter
    const interval = setInterval(() => {
      pctRef.current = Math.min(pctRef.current + 1, 100);
      setPct(pctRef.current);
      if (pctRef.current >= 100) clearInterval(interval);
    }, 22);

    // Wipe exit
    timers.push(setTimeout(() => {
      setPhase("exit");
      setWipe(true);
    }, 3200));

    // Hide loader
    timers.push(setTimeout(() => {
      setHide(true);
      onDone();
    }, 3900));

    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, [onDone]);

  if (hide) return null;

  return (
    <>
      {/* Wipe panels */}
      {wipe && (
        <>
          <div className="wipe-panel" style={{ left:0, right:"50%", transitionDelay:"0ms",   transition:"transform 0.6s cubic-bezier(0.16,1,0.3,1) 0ms",   transform:"scaleX(1)", transformOrigin:"left" }} />
          <div className="wipe-panel" style={{ left:"50%", right:0, transitionDelay:"60ms",  transition:"transform 0.6s cubic-bezier(0.16,1,0.3,1) 60ms",  transform:"scaleX(1)", transformOrigin:"right" }} />
        </>
      )}

      <div
        id="loader"
        style={{
          opacity: wipe ? 0 : 1,
          visibility: wipe ? "hidden" : "visible",
          transition: "opacity 0.3s ease 0.3s, visibility 0.3s ease 0.3s",
        }}
      >
        {/* Ambient glow */}
        <div className="blob" style={{ width:400, height:400, background:"rgba(59,130,246,0.08)", top:"20%", left:"30%", animationDelay:"0s" }} />
        <div className="blob" style={{ width:300, height:300, background:"rgba(34,211,238,0.05)", bottom:"20%", right:"25%", animationDelay:"2s" }} />

        {/* Name */}
        <div className="flex flex-col items-center gap-0">
          <div style={{ display:"flex", gap:"0.06em" }}>
            {FIRST.split("").map((ch, i) => (
              <span
                key={i}
                className="loader-letter"
                style={{
                  transform: firstIn[i] ? "translateY(0)" : "translateY(110%)",
                  opacity:   firstIn[i] ? 1 : 0,
                  transitionDelay: `${i * 0.04}s`,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(52px,8vw,100px)",
                  fontWeight: 800,
                  color: "#F0F4FF",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
          <div style={{ display:"flex", gap:"0.06em" }}>
            {LAST.split("").map((ch, i) => (
              <span
                key={i}
                className="loader-letter"
                style={{
                  transform: lastIn[i] ? "translateY(0)" : "translateY(110%)",
                  opacity:   lastIn[i] ? 1 : 0,
                  transitionDelay: `${i * 0.04}s`,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(52px,8vw,100px)",
                  fontWeight: 800,
                  background: "linear-gradient(135deg,#3B82F6,#22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Role */}
        <div
          className="loader-role"
          style={{ opacity: roleIn ? 1:0, transform: roleIn ? "translateY(0)":"translateY(10px)" }}
        >
          {ROLE}
        </div>

        {/* Bar */}
        <div
          className="loader-bar-wrap"
          style={{ opacity: barIn ? 1:0 }}
        >
          <div
            className="loader-bar"
            style={{ width: barIn ? `${pct}%` : "0%", transition:"width 2.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </div>

        {/* Pct */}
        <div
          className="loader-pct"
          style={{ opacity: barIn ? 1:0 }}
        >
          {String(pct).padStart(3,"0")}%
        </div>
      </div>
    </>
  );
}
