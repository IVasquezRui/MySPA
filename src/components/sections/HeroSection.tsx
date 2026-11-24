"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Play, Github } from "lucide-react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { heroProducts } from "@/data/heroProducts";
import HeroTitle from "@/components/interactive/HeroTitle";
import HeroAvatar from "@/components/interactive/HeroAvatar";

export default function HeroSection() {
  return (
    <section id="hero" className="relative z-10">
      <HeroParallax products={heroProducts}>
        <div className="flex flex-col items-start gap-8 max-w-5xl">
          {/* Hero Badge per instruction: only 'Software Developer' */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono backdrop-blur-md shadow-md">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-zinc-300">Software Developer</span>
          </div>

          {/* Hero Avatar Presentation (Video greeting transitioning to IvanHighTech) */}
          <div className="flex items-center gap-6">
            <HeroAvatar />
            <div className="hidden sm:flex flex-col text-xs font-mono text-zinc-400 space-y-1">
              <span className="text-white font-semibold">Iván Vásquez</span>
              <span>UNETI · Caracas, Venezuela</span>
              <span className="text-violet-400">Next.js · FastAPI · Agentes MCP</span>
            </div>
          </div>

          {/* Animated Hero Title: StrokeText + RotatingText */}
          <HeroTitle />

          {/* Hero Description (Deep Graphite & Indigo Copilot removed as instructed) */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Desarrollo de plataformas full-stack modernas, arquitecturas backend asíncronas y agentes de IA autónomos bajo el Model Context Protocol (MCP). Rigor técnico, buenas prácticas defensivas y software preparado para producción.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#proyectos"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explorar Proyectos</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="#videos"
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-mono text-xs font-medium transition-all hover:border-violet-500/30"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Videos en Acción</span>
            </Link>

            <a
              href="https://github.com/IVasquezRui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-mono text-xs font-medium transition-all hover:border-violet-500/30"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub (@IVasquezRui)</span>
            </a>
          </div>
        </div>
      </HeroParallax>
    </section>
  );
}
