"use client";
import { useState, useCallback } from "react";
import Loader     from "@/components/Loader";
import Effects    from "@/components/Effects";
import Navbar     from "@/components/Navbar";
import Hero       from "@/components/Hero";
import Skills     from "@/components/Skills";
import Projects   from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";

export default function Page() {
  const [ready, setReady] = useState(false);

  const onLoaderDone = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div id="cur"  style={{ opacity: ready?1:0, transition:"opacity 0.5s" }} />
      <div id="cur-ring" style={{ opacity: ready?1:0, transition:"opacity 0.5s" }} />

      {/* Loader — always mounted until it hides itself */}
      <Loader onDone={onLoaderDone} />

      {/* Effects run only after loader done */}
      <Effects ready={ready} />

      {/* Main content fades in */}
      <div style={{ opacity: ready?1:0, transition:"opacity 0.8s ease 0.2s" }}>
        <Navbar    visible={ready} />
        <Hero      visible={ready} />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
