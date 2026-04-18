// components/RoadmapSection.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";

export default function RoadmapSection() {
  const phases = [
    {
      phase: "Phase 1",
      time: "Foundation Setup",
      title: "Office-Like Labs",
      desc:
        "Learn in high-tech classrooms equipped like an AI startup's R&D lab. You'll work in teams on fixed schedules, just like a real AI development cycle.",
      image:
        "/Nigapepic/1.webp",
    },
    {
      phase: "Phase 2",
      time: "Mentorship & Guidance",
      title: "Professional Mentors",
      desc:
        "Every class is led by instructors who have worked in the AI industry. They guide you through projects, give one-on-one feedback, and teach you to think like AI engineers.",
      image:
        "/Nigapepic/2.webp",
    },
    {
      phase: "Phase 3",
      time: "Practical Application",
      title: "Iterative Projects",
      desc:
        "Courses follow a Learn → Apply → Showcase model. You learn a concept, immediately apply it to a mini-project, and then present it for review – replicating corporate sprints.",
      image:
        "/Nigapepic/3.webp",
    },
    {
      phase: "Phase 4",
      time: "Industry Experience",
      title: "Real-World Problem Solving",
      desc:
        "Assignments are derived from actual industry challenges. You won't build 'toy' examples; you'll tackle case studies and use real datasets under expert guidance.",
      image:
        "/Nigapepic/4.webp",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = container.offsetHeight;

      const scrollMiddle =
        window.scrollY + window.innerHeight / 2 - 150;

      const phaseHeight = height / phases.length;

      let index = Math.floor((scrollMiddle - top) / phaseHeight);
      index = Math.max(0, Math.min(phases.length - 1, index));

      setActiveIndex(index);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [phases.length]);

  const currentPhase = phases[activeIndex];

  return (
    <section className="relative bg-black text-white">
      {/* HEADER */}
      <div className="max-w-[1350px] mx-auto px-6 py-10 text-center">
        <span className="inline-block mb-4 px-4 py-2 text-xs uppercase tracking-wider rounded-full border border-[#FF40EB]/40 bg-[#FF40EB]/20">
          Learning Journey
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Our <span className="text-[#FF40EB]">AI Roadmap</span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          A structured, industry-aligned path from zero to job-ready AI engineer.
        </p>
      </div>

      {/* MOBILE/TABLET LAYOUT */}
      <div className="lg:hidden max-w-[1350px] mx-auto px-6 space-y-8 pb-20">
        {phases.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="relative pl-14">
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white bg-[#FF40EB] shadow-[0_0_16px_rgba(146,52,235,0.7)]">
                <span className="text-black font-bold">{index + 1}</span>
              </div>

              <div className="bg-black/60 backdrop-blur-xl border border-[#FF40EB]/40 rounded-2xl p-6">
                <div className="text-[#FF40EB] text-sm font-semibold mb-1">
                  {item.phase}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/60 mb-2">
                  {item.time}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP LAYOUT - UNCHANGED */}
      <div className="hidden lg:block">
        <div className="max-w-[1350px] mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* LEFT — PHASES */}
          <div ref={containerRef}>
            {phases.map((item, index) => (
              <div
                key={index}
                className={`min-h-screen flex items-center transition-all duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white bg-[#FF40EB] shadow-[0_0_16px_rgba(146,52,235,0.7)]">
                    <span className="text-black font-bold">{index + 1}</span>
                  </div>

                  <div className="bg-black/60 backdrop-blur-xl border border-[#FF40EB]/40 rounded-2xl p-8 max-w-lg">
                    <div className="text-[#FF40EB] text-sm font-semibold mb-1">
                      {item.phase}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/60 mb-2">
                      {item.time}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — STICKY IMAGE */}
          <div className="hidden lg:block">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="w-full h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={currentPhase.image}
                  alt={currentPhase.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}