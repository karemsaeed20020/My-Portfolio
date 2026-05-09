import { personal } from "@/app/data";
export default function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl font-extrabold grad">KS</span>
          <span className="font-mono text-xs" style={{ color:"var(--dim)" }}>· Kareem Saeed · Full Stack Developer</span>
        </div>
        <span className="font-mono text-xs" style={{ color:"var(--dim)" }}>
          Built with Next.js · Tailwind · © {new Date().getFullYear()}
        </span>
        <div className="flex gap-5">
          {[
            { label:"GitHub",   href:personal.github },
            { label:"LinkedIn", href:personal.linkedin },
          ].map(s=>(
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color:"var(--dim)" }}
              onMouseEnter={e=>(e.currentTarget.style.color="var(--blue)")}
              onMouseLeave={e=>(e.currentTarget.style.color="var(--dim)")}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
