import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Github, Shield, Cpu, Activity, CheckCircle, ExternalLink, Terminal } from "lucide-react";
import { projectsData } from "@/data/projects";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Mandatory SSG: generateStaticParams() for pre-rendering at build time
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: `${project.name} | Arquitectura & Especificación Técnica`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — Caso de Estudio Técnico`,
      description: project.summary,
      images: ["/media/IvanHighTech.jpg"],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-28 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#proyectos"
          className="inline-flex items-center space-x-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Portafolio Principal</span>
        </Link>

        {/* Project Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950/85 border border-white/10 shadow-2xl backdrop-blur-xl mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-violet-950/80 text-violet-300 border border-violet-500/30">
              {project.badge}
            </span>

            <div className="flex items-center space-x-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repositorio GitHub</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {project.name}
          </h1>
          <p className="text-sm sm:text-base font-mono text-violet-400 mt-2">
            {project.tagline}
          </p>

          <p className="mt-6 text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Tech Badges */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 shadow-xl backdrop-blur-md"
            >
              <span className="text-xs font-mono text-zinc-400 block mb-1">
                {metric.label}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {metric.value}
              </p>
              <p className="text-xs text-zinc-500 mt-1">{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* Context & Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-7 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <span className="text-violet-400 font-mono">01.</span>
              <span>Contexto del Sistema</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.deepDive.context}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <span className="text-sky-400 font-mono">02.</span>
              <span>Desafío de Ingeniería</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.deepDive.challenge}
            </p>
          </div>
        </div>

        {/* Architectural Highlights & Diagram */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/85 border border-white/10 shadow-2xl backdrop-blur-xl mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center space-x-2.5">
            <Cpu className="w-5 h-5 text-violet-400" />
            <span>Decisiones Arquitectónicas Clave</span>
          </h3>

          <div className="space-y-4 mb-8">
            {project.deepDive.architectureDetails.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          {project.tabs.architecture.diagramAscii && (
            <div>
              <span className="text-xs font-mono text-zinc-400 block mb-2">
                // Diagrama de Componentes &amp; Flujo de Datos
              </span>
              <div className="p-5 rounded-2xl bg-black/90 border border-white/10 overflow-x-auto text-[11px] sm:text-xs font-mono text-emerald-400 leading-relaxed">
                <pre>{project.tabs.architecture.diagramAscii}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Security & Hardening */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/85 border border-white/10 shadow-2xl backdrop-blur-xl mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center space-x-2.5">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>Seguridad Defensiva &amp; Calidad en Producción</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.deepDive.securityHighlights.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 leading-relaxed"
              >
                {sec}
              </div>
            ))}
          </div>
        </div>

        {/* Code Specification Window */}
        <div className="rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/90 shadow-2xl mb-12">
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {project.deepDive.codeSnippet.filename}
            </span>
          </div>

          <div className="p-6 sm:p-8 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200 bg-zinc-950/70 leading-relaxed">
            <pre>
              <code>{project.deepDive.codeSnippet.code}</code>
            </pre>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="text-center pt-8 border-t border-white/10">
          <Link
            href="/#proyectos"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Portafolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
