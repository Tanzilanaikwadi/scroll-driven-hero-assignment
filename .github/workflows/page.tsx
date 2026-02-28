"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const movingObjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial Load Animation
    const tl = gsap.timeline();

    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "expo.out" 
        }
      );
    }

    if (statsRef.current && statsRef.current.children.length > 0) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=1" // Start earlier to create a smooth overlap with headline
      );
    }

    // 2. Scroll-Based Animation (Core Feature)
    // As user scrolls, the visual element moves, scales, and rotates smoothly
    if (movingObjectRef.current && heroRef.current) {
      gsap.to(movingObjectRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // 1.5 seconds of smoothing for that buttery "natural" feel
        },
        y: "50vh", // moves down nicely
        x: "10vw",
        scale: 1.8,
        rotate: 180,
        opacity: 0.2,
        ease: "none",
      });
    }

    // Secondary scroll effect on the headline itself
    if (headlineRef.current && heroRef.current) {
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: "20vh",
        opacity: 0,
        scale: 0.95,
        ease: "none",
      });
    }

    // Cleanup to prevent memory leaks in React strict mode
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-[200vh] font-sans selection:bg-indigo-500 selection:text-white">
      {/* Hero Section - Above the Fold */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4"
      >
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-tr from-indigo-900/20 via-purple-900/10 to-transparent blur-[120px] pointer-events-none" />

        {/* Scroll moving visual object */}
        <div
          ref={movingObjectRef}
          className="absolute top-[15%] right-[20%] w-32 h-32 md:w-64 md:h-64 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 mix-blend-screen blur-[2px] opacity-70 shadow-[0_0_100px_rgba(79,70,229,0.7)] rotate-12 pointer-events-none z-0"
          style={{ willChange: "transform, opacity" }}
        />
        
        {/* Additional decorative element */}
        <div className="absolute bottom-[20%] left-[10%] w-16 h-16 md:w-32 md:h-32 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-3xl pointer-events-none z-0" />

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-center tracking-[0.2em] sm:tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-16 z-10 opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          W E L C O M E I T Z F I Z Z
        </h1>

        {/* Impact Metrics / Statistics */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 md:gap-20 max-w-5xl mx-auto z-10 w-full px-8"
        >
          <div className="flex flex-col items-center opacity-0" style={{ willChange: "transform, opacity" }}>
            <span className="text-4xl md:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 mb-2">
              98%
            </span>
            <span className="text-zinc-400 text-xs md:text-sm uppercase tracking-widest text-center">
              Client Satisfaction
            </span>
          </div>

          <div className="flex flex-col items-center opacity-0" style={{ willChange: "transform, opacity" }}>
            <span className="text-4xl md:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300 mb-2">
              150+
            </span>
            <span className="text-zinc-400 text-xs md:text-sm uppercase tracking-widest text-center">
              Projects Delivered
            </span>
          </div>

          <div className="flex flex-col items-center opacity-0" style={{ willChange: "transform, opacity" }}>
            <span className="text-4xl md:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200 mb-2">
              10x
            </span>
            <span className="text-zinc-400 text-xs md:text-sm uppercase tracking-widest text-center">
              Performance Boost
            </span>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-zinc-500 pointer-events-none">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3">Scroll to explore</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      {/* spacer to prove scroll works smoothly */}
      <section className="min-h-screen relative flex flex-col items-center justify-center p-8 bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="max-w-3xl text-center z-10">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-wide">
            Beyond the Fold
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
            This secondary section demonstrates the fluid scroll interpolation. Notice how the visual element up top transitioned seamlessly via GSAP ScrollTrigger based purely on your scroll progress—no jarring layout shifts, just pure performance.
          </p>
        </div>
        
        {/* Subtle grid pattern for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </section>
    </div>
  );
}
