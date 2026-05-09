"use client";
import { useEffect } from "react";

export default function Effects({ ready }: { ready: boolean }) {
  useEffect(() => {
    if (!ready) return;

    /* ── Cursor ── */
    const cur  = document.getElementById("cur");
    const ring = document.getElementById("cur-ring");
    let mx = -200, my = -200, rx = -200, ry = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cur) { cur.style.left = mx+"px"; cur.style.top = my+"px"; }
    };
    const tick = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      if (ring) { ring.style.left = rx+"px"; ring.style.top = ry+"px"; }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    const addHover = (el: Element) => {
      el.addEventListener("mouseenter", () => { cur?.classList.add("hover"); ring?.classList.add("hover"); });
      el.addEventListener("mouseleave", () => { cur?.classList.remove("hover"); ring?.classList.remove("hover"); });
    };
    document.querySelectorAll("a,button,[role=button],.glass,.badge").forEach(addHover);

    /* ── Scroll reveal ── */
    const srObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); srObs.unobserve(e.target); } });
    }, { threshold: 0.06 });
    document.querySelectorAll(".sr,.sr-l,.sr-r,.sr-s").forEach(el => srObs.observe(el));

    /* ── Skill bars ── */
    const skObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".sk-fill").forEach(b => b.classList.add("in"));
          skObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".sk-section").forEach(el => skObs.observe(el));

    /* ── Active nav ── */
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("nav-active"));
          const id = e.target.getAttribute("id");
          if (id) document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add("nav-active");
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    document.querySelectorAll("section[id]").forEach(s => navObs.observe(s));

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      srObs.disconnect(); skObs.disconnect(); navObs.disconnect();
    };
  }, [ready]);

  return null;
}
