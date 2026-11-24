"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Mail, Copy, Check, Github, Linkedin, ExternalLink, MapPin, Send } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

// Dynamic import with SSR false for Three.js Lanyard component to optimize First Contentful Paint
const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] flex flex-col items-center justify-center rounded-3xl bg-zinc-950/60 border border-white/5 animate-pulse">
      <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin mb-4" />
      <span className="text-xs font-mono text-zinc-500">Cargando credencial 3D...</span>
    </div>
  ),
});

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "ivasquezrui@gmail.com";

  const handleCopy = async () => {
    const success = await copyToClipboard(emailAddress);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="contacto" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <span>06</span>
            <span>/</span>
            <span>CONEXIÓN DIRECTA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Hablemos de Ingeniería &amp; Producto
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Abierto a oportunidades remotas internacionales, consultoría técnica y proyectos desafiantes en equipos consolidados o startups de alto impacto.
          </p>
        </div>

        {/* Two-Column Layout: Left Compact Info Card, Right 3D Lanyard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Compact Information & Communication Card (Reduced size as requested) */}
          <div className="lg:col-span-6 p-7 sm:p-9 rounded-3xl bg-zinc-950/85 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-medium text-emerald-400">
                  Respuesta habitual en &lt; 24 horas
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                ¿Tienes una idea, arquitectura o sistema por construir?
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Escríbeme para colaborar en plataformas web híbridas, arquitecturas backend asíncronas con FastAPI, integración de agentes autónomos bajo MCP o ciberseguridad defensiva.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="my-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${emailAddress}`}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar un Correo</span>
              </a>

              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-mono text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Copiar dirección de correo"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">¡Copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>Copiar: {emailAddress}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links & Location Details */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/ivan-manuel-vasquez-rui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn ↗</span>
                </a>
                <a
                  href="https://github.com/IVasquezRui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub ↗</span>
                </a>
              </div>

              <div className="flex items-center space-x-1 text-zinc-500">
                <MapPin className="w-3 h-3 text-violet-400" />
                <span>Caracas, VE · Remoto</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Lanyard Component */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <div className="w-full max-w-md">
              <Lanyard cardImage="/media/IvanHighTech.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
