"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stackCategories, StackSkill } from "@/data/stack";

export default function StackSection() {
  const [selectedSkill, setSelectedSkill] = useState<StackSkill | null>(null);

  return (
    <section id="stack" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <span>03</span>
            <span>/</span>
            <span>ARQUITECTURA TECNOLÓGICA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Stack Tecnológico
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Sin barras porcentuales ficticias ni estimaciones arbitrarias. Herramientas de software reales implementadas en sistemas de producción.{" "}
            <span className="text-violet-400">
              Haz clic en cualquier tecnología para ver los proyectos que la integran.
            </span>
          </p>
        </div>

        {/* Selected Skill Notification Card */}
        {selectedSkill && (
          <div className="mb-8 p-4 rounded-2xl bg-violet-950/60 border border-violet-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div>
              <p className="text-xs font-mono text-violet-300">
                Tecnología seleccionada:{" "}
                <span className="font-bold text-white text-sm">{selectedSkill.name}</span>
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {selectedSkill.highlightProjects.length > 0
                  ? `Integrada activamente en: ${selectedSkill.highlightProjects.join(", ").toUpperCase()}`
                  : "Herramienta de infraestructura y soporte transversal."}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {selectedSkill.highlightProjects.map((slug) => (
                <Link
                  key={slug}
                  href={`/projects/${slug}`}
                  className="px-3 py-1 rounded-lg bg-violet-600 text-white text-xs font-mono font-medium hover:bg-violet-500 flex items-center gap-1 transition-colors"
                >
                  <span>Ver {slug.toUpperCase()}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              ))}
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
              >
                ✕ Limpiar
              </button>
            </div>
          </div>
        )}

        {/* Stack Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-violet-500/30 transition-colors"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                    {category.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                        isSelected
                          ? "bg-violet-600 text-white shadow-md shadow-violet-500/20 border border-violet-400"
                          : "bg-white/5 hover:bg-violet-600/20 text-zinc-300 hover:text-white border border-white/10 hover:border-violet-500/30"
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
