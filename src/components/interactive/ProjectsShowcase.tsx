"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, ShieldCheck, Sparkles, Cpu } from "lucide-react";
import { projectsData, ProjectDetail } from "@/data/projects";

function ProjectCard({ project }: { project: ProjectDetail }) {
  const [activeTab, setActiveTab] = useState<"demo" | "architecture" | "aiControl">("demo");

  // 3D Card Tilt Animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-3xl p-6 sm:p-9 bg-zinc-950/85 border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] flex flex-col justify-between"
    >
      {/* Glow on hover */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-600/15 via-transparent to-sky-600/15 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

      <div>
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-violet-400 mt-1">
              {project.tagline}
            </p>
          </div>
          <span className="self-start sm:self-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono font-semibold bg-violet-950/80 text-violet-300 border border-violet-500/40 shadow-sm whitespace-nowrap">
            {project.badge}
          </span>
        </div>

        {/* Emil Kowalski Tabs Nav */}
        <div className="flex items-center space-x-2 my-6 p-1.5 rounded-2xl bg-zinc-900/90 border border-white/5 max-w-md">
          <button
            onClick={() => setActiveTab("demo")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === "demo"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Demo / Resumen
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === "architecture"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Arquitectura
          </button>
          <button
            onClick={() => setActiveTab("aiControl")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === "aiControl"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Control de IA
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[140px] text-zinc-300 text-sm leading-relaxed mb-6">
          {activeTab === "demo" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-sm sm:text-base text-zinc-300">
                {project.tabs.demo.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {project.tabs.demo.highlights.map((h, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-xs font-mono font-bold text-violet-300 uppercase block mb-1">
                      {h.title}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-normal">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-sm sm:text-base text-zinc-300">
                {project.tabs.architecture.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {project.tabs.architecture.highlights.map((h, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-xs font-mono font-bold text-sky-300 uppercase block mb-1">
                      {h.title}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-normal">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "aiControl" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-sm sm:text-base text-zinc-300">
                {project.tabs.aiControl.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {project.tabs.aiControl.highlights.map((h, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-xs font-mono font-bold text-emerald-300 uppercase block mb-1">
                      {h.title}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-normal">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Tech Badges & CTA */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Technology Badges */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Deep Dive Page Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-violet-600/30 hover:bg-violet-600 text-violet-200 hover:text-white border border-violet-500/40 text-xs sm:text-sm font-mono font-semibold transition-all shadow-md self-start sm:self-auto group/btn flex-shrink-0"
        >
          <span>Arquitectura &amp; Métricas</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  return (
    <section id="proyectos" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <span>01</span>
            <span>/</span>
            <span>INGENIERÍA END-TO-END</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Proyectos Full-Stack &amp; Sistemas de Producción
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Soluciones de software construidas desde el diseño arquitectónico hasta el despliegue serverless y contenerizado.
            Haz clic en cada vista técnica para explorar contratos, decisiones de ingeniería y diagramas del sistema.
          </p>
        </div>

        {/* Sequential Projects Stack (One after another, spacious and unconstrained) */}
        <div className="flex flex-col space-y-10 max-w-4xl mx-auto w-full">
          {projectsData.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
