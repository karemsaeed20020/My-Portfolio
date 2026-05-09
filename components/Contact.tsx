"use client";
import { useState } from "react";
import { personal } from "@/app/data";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true); setTimeout(()=>setCopied(false), 2000);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
    const b = encodeURIComponent(`Hi Kareem,\n\n${form.message}\n\nFrom: ${form.name}\nReply-to: ${form.email}`);
    window.location.href = `mailto:${personal.email}?subject=${s}&body=${b}`;
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,var(--border2),transparent)" }} />

      {/* Blobs */}
      <div className="blob" style={{ width:500, height:500, background:"rgba(59,130,246,0.05)", bottom:"-10%", left:"-5%", animationDelay:"0s" }} />
      <div className="blob" style={{ width:300, height:300, background:"rgba(34,211,238,0.04)", top:"10%", right:"-5%", animationDelay:"2s" }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="sr">
              <span className="sec-label block mb-4">05 — Contact</span>
              <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-6" style={{ color:"var(--text)" }}>
                Let's Build<br /><span className="grad">Together</span>
              </h2>
              <p className="text-base leading-relaxed max-w-md mb-10" style={{ color:"var(--muted)" }}>
                Open to full-time roles, freelance projects, and exciting collaborations. Reach out — I respond within 24 hours.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="sr d2 space-y-3 mb-10">
              {/* Email */}
              <div className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs mb-1" style={{ color:"var(--dim)" }}>Email</div>
                  <div className="font-mono text-sm" style={{ color:"var(--text)" }}>{personal.email}</div>
                </div>
                <button onClick={copy}
                  className="font-mono text-xs px-4 py-2 rounded-lg border transition-all duration-200"
                  style={{ color: copied?"#4ade80":"var(--muted)", borderColor: copied?"rgba(74,222,128,0.3)":"var(--border2)", background: copied?"rgba(74,222,128,0.06)":"transparent" }}
                >
                  {copied?"Copied ✓":"Copy"}
                </button>
              </div>

              {/* Phone */}
              <div className="glass rounded-xl p-4">
                <div className="font-mono text-xs mb-1" style={{ color:"var(--dim)" }}>Phone / WhatsApp</div>
                <a href={`tel:${personal.phone}`} className="font-mono text-sm transition-colors duration-200"
                  style={{ color:"var(--text)" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--blue)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--text)")}
                >
                  {personal.phone}
                </a>
              </div>

              {/* Location */}
              <div className="glass rounded-xl p-4">
                <div className="font-mono text-xs mb-1" style={{ color:"var(--dim)" }}>Location</div>
                <div className="font-mono text-sm" style={{ color:"var(--text)" }}>📍 {personal.location}</div>
              </div>
            </div>

            {/* Social */}
            <div className="sr d3 flex gap-4 flex-wrap">
              {[
                { label:"GitHub",   href:personal.github },
                { label:"LinkedIn", href:personal.linkedin },
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost rounded-lg text-xs py-2.5 px-5">
                  {s.label} ↗
                </a>
              ))}
              <a href={`mailto:${personal.email}`}
                className="btn btn-blue rounded-lg text-xs py-2.5 px-5">
                <span>Send Email</span><span>→</span>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="sr-r d1">
            <form onSubmit={submit} className="glass rounded-2xl p-8 space-y-5">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{ borderColor:"var(--border)" }}>
                <span className="font-mono text-xs" style={{ color:"var(--blue)" }}>→</span>
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color:"var(--muted)" }}>Send a Message</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color:"var(--dim)" }}>Name *</label>
                  <input type="text" required placeholder="Your name" value={form.name}
                    onChange={e=>setForm({...form,name:e.target.value})} className="inp" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color:"var(--dim)" }}>Email *</label>
                  <input type="email" required placeholder="your@email.com" value={form.email}
                    onChange={e=>setForm({...form,email:e.target.value})} className="inp" />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color:"var(--dim)" }}>Subject</label>
                <input type="text" placeholder="What's this about?" value={form.subject}
                  onChange={e=>setForm({...form,subject:e.target.value})} className="inp" />
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color:"var(--dim)" }}>Message *</label>
                <textarea required rows={5} placeholder="Tell me about your project or opportunity..."
                  value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  className="inp resize-none" />
              </div>

              <button type="submit" className="btn btn-blue w-full rounded-lg justify-center py-3.5">
                <span>Send Message</span>
                <span>→</span>
              </button>

              <p className="font-mono text-xs text-center" style={{ color:"var(--dim)" }}>
                Opens your email client · responds within 24h
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
