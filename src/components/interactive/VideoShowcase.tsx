"use client";

import React, { useState } from "react";
import { Play, X, Volume2, Maximize2 } from "lucide-react";

interface VideoPillar {
  id: string;
  tag: string;
  title: string;
  pillarName: string;
  description: string;
  videoSrc: string;
}

export default function VideoShowcase() {
  const [activeModal, setActiveModal] = useState<VideoPillar | null>(null);

  const pillars: VideoPillar[] = [
    {
      id: "craftwork",
      tag: "01 · CRAFTWORK",
      title: "Desarrollo de Software & Arquitectura Limpia",
      pillarName: "CRAFTWORK",
      description:
        "Construcción de microservicios robustos, diseño hexagonal por capas, contratos desacoplados y soluciones web escalables para producción sin atajos técnicos.",
      videoSrc: "/media/Ivan-STACK.mp4",
    },
    {
      id: "agentic",
      tag: "02 · AGENTIC",
      title: "Sistemas Agénticos & Orquestación con IA",
      pillarName: "AGENTIC",
      description:
        "Multiplicación de velocidad con agentes autónomos supervisados mediante Model Context Protocol (MCP), prompts guiados por contratos y validación sintáctica estricta.",
      videoSrc: "/media/Ivan-AGENTS.mp4",
    },
  ];

  return (
    <section id="videos" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <span>00</span>
            <span>/</span>
            <span>INGENIERÍA EN MOVIMIENTO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Craftwork &amp; Agentic en Acción
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Dos dimensiones centrales de mi práctica técnica. Reproducción ambiental fluida en bucle sin sonido.{" "}
            <span className="text-violet-400 font-medium">
              Haz clic en cualquier video para abrir la experiencia cinematográfica en pantalla completa con audio.
            </span>
          </p>
        </div>

        {/* Video Grid: 2 Columns (Craftwork and Agentic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => setActiveModal(pillar)}
              className="group/card cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-md hover:border-violet-500/40 hover:shadow-violet-500/15 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Video Thumbnail with Video Playing Muted Loop */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <video
                  src={pillar.videoSrc}
                  loop
                  muted
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

                {/* Badge top-left */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/70 border border-white/10 backdrop-blur-md text-[11px] font-mono tracking-wider font-bold text-violet-300">
                  {pillar.tag}
                </div>

                {/* Play Hint overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <div className="px-4 py-2 rounded-full bg-violet-600/90 border border-violet-400/50 text-white font-mono text-xs flex items-center space-x-2 shadow-2xl transform scale-95 group-hover/card:scale-100 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Reproducir con Audio</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover/card:text-violet-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-violet-400 text-xs font-mono font-medium">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ver experiencia completa ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinema Video Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/60">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {activeModal.pillarName}
                </span>
                <h4 className="text-sm font-semibold text-white">
                  {activeModal.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Cerrar reproductor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeModal.videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-900/40 text-xs text-zinc-400">
              <p>{activeModal.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
