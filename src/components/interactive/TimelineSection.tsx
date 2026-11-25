"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle } from "lucide-react";
import { experiencesData, ExperienceItem } from "@/data/experience";

function TimelineCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When item enters 20% into viewport, illuminate it on both PC and mobile
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="relative pl-7 sm:pl-12 group transition-all duration-500">
      {/* Dynamic Timeline Node Icon: Illuminates on Scroll in Both PC and Mobile */}
      <div
        className={`absolute -left-[18px] sm:-left-[19px] top-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
          isVisible
            ? "bg-violet-600 border-violet-300 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-110"
            : item.current
            ? "bg-violet-950 border-violet-400 text-violet-300 shadow-md"
            : "bg-zinc-950 border-white/20 text-zinc-500"
        }`}
      >
        {/* Glowing pulse ring when illuminated */}
        {isVisible && (
          <span className="absolute -inset-1 rounded-full bg-violet-500/30 animate-ping opacity-60 pointer-events-none" />
        )}

        {item.type === "job" && <Briefcase className="w-4 h-4" />}
        {item.type === "education" && <GraduationCap className="w-4 h-4" />}
        {item.type === "simulation" && <Award className="w-4 h-4" />}
      </div>

      {/* Card Container */}
      <div
        className={`p-6 sm:p-8 rounded-3xl bg-zinc-950/85 border transition-all duration-500 shadow-xl backdrop-blur-md ${
          isVisible
            ? "border-violet-500/40 shadow-[0_10px_30px_rgba(139,92,246,0.12)]"
            : "border-white/10 hover:border-violet-500/30"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-violet-400 uppercase">
            {item.period}
          </span>

          {/* Button Verde "ACTUAL" in Arial Bold with Enlarged Font and Padding */}
          {item.current && (
            <span className="self-start sm:self-auto px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-['Arial',sans-serif] font-bold tracking-wider uppercase bg-emerald-950/90 text-emerald-300 border-2 border-emerald-400 shadow-lg shadow-emerald-500/25 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTUAL</span>
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {item.role}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1 mb-4">
          {item.organization}
        </p>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
          {item.description}
        </p>

        {item.skills && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section id="trayectoria" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <span>04</span>
            <span>/</span>
            <span>HISTORIAL TÉCNICO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Historial Técnico &amp; Trayectoria
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Evolución profesional, soporte a infraestructuras corporativas críticas y desarrollo de soluciones de software en producción.
          </p>
        </div>

        {/* Timeline Items with dynamic illumination on both PC and Mobile */}
        <div className="relative border-l-2 border-violet-500/30 ml-4 sm:ml-8 space-y-12 max-w-4xl">
          {experiencesData.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
