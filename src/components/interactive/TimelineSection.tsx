"use client";

import React from "react";
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle } from "lucide-react";
import { experiencesData } from "@/data/experience";

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
            Trayectoria &amp; Experiencia
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Evolución profesional, soporte a infraestructuras críticas corporativas y desarrollo de soluciones de software en producción.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-violet-500/30 ml-4 sm:ml-8 space-y-12">
          {experiencesData.map((item, index) => (
            <div key={item.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 ${
                  item.current
                    ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-500/50"
                    : "bg-zinc-950 border-white/20 text-zinc-400 group-hover:border-violet-400 group-hover:text-white"
                }`}
              >
                {item.type === "job" && <Briefcase className="w-3.5 h-3.5" />}
                {item.type === "education" && <GraduationCap className="w-4 h-4" />}
                {item.type === "simulation" && <Award className="w-4 h-4" />}
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-white/10 shadow-xl backdrop-blur-md hover:border-violet-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold tracking-wider text-violet-400 uppercase">
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                      ACTUAL
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.role}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5 mb-3">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
