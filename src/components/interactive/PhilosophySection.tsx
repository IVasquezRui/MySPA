"use client";

import React from "react";
import { Layers, Shield, Sparkles, Terminal, Cpu } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section id="sobre-mi" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <span>05</span>
            <span>/</span>
            <span>FILOSOFÍA &amp; CRITERIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Filosofía de Ingeniería &amp; Forma de Trabajo
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Principios rigurosos que guían cada decisión de diseño, cada arquitectura de datos y cada commit en producción.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: Arquitectura antes que Código al Azar (col 12 / 8) */}
          <div className="md:col-span-7 p-7 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-violet-500/30 transition-all">
            <div className="mb-6">
              <span className="p-3 rounded-2xl bg-violet-600/20 border border-violet-500/30 text-violet-300 inline-block mb-4">
                📐
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Arquitectura antes que Código al Azar
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                No empiezo a programar sin entender primero el problema y definir los contratos. El software que perdura se basa en esquemas claros, tipos estrictos, modularidad y límites bien trazados entre capas.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Schema-Driven</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Tipado Estricto</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Cero Código Huérfano</span>
            </div>
          </div>

          {/* Bento Card 2: El Desarrollador Aumentado (col 12 / 5) */}
          <div className="md:col-span-5 p-7 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-violet-500/30 transition-all">
            <div className="mb-6">
              <span className="p-3 rounded-2xl bg-sky-600/20 border border-sky-500/30 text-sky-300 inline-block mb-4">
                ⚡
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                El Desarrollador Aumentado
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Un ingeniero que no usa agentes de código se vuelve lento. Utilizo la IA como mi segundo cerebro para acelerar la entrega, pero el criterio y la validación son míos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Velocidad 5x</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Criterio Crítico</span>
            </div>
          </div>

          {/* Bento Card 3: Seguridad por Diseño (col 12 / 5) */}
          <div className="md:col-span-5 p-7 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-violet-500/30 transition-all">
            <div className="mb-6">
              <span className="p-3 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 inline-block mb-4">
                🛡️
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Seguridad por Diseño
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Cero confianza en entradas de usuario. Desde sanitización de PII y cabeceras defensivas (CSP, HSTS) hasta validación criptográfica y defensas contra inyecciones SQL y prompt injection.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Zero Trust</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">OWASP Hardening</span>
            </div>
          </div>

          {/* Bento Card 4: Código Limpio y Estructurado (col 12 / 7) — per instruction 9 */}
          <div className="md:col-span-7 p-7 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-violet-500/30 transition-all">
            <div className="mb-6">
              <span className="p-3 rounded-2xl bg-amber-600/20 border border-amber-500/30 text-amber-300 inline-block mb-4">
                📦
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Código Limpio y Estructurado
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                Implementación estricta de metodologías de desarrollo por capas, arquitecturas monolíticas desacopladas y arquitectura hexagonal (puertos y adaptadores), aislando el dominio de negocio de dependencias externas.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Adherencia rigurosa a principios Clean Code (SOLID, DRY, inmutabilidad y pruebas automatizadas deterministas), garantizando bases de código legibles, mantenibles y preparadas para escalar.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Arquitectura Hexagonal</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Desarrollo por Capas</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">Clean Code &amp; SOLID</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
