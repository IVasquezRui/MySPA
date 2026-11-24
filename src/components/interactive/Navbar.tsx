"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, Menu, X, Copy, Check, ExternalLink } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard("ivasquezrui@gmail.com");
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate dynamic tornasol hue shift based on scroll position + time
  const dynamicHue = (scrollY * 0.45) % 360;

  return (
    <>
      {/* ================= DESKTOP & MOBILE HEADER ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 30
            ? "bg-zinc-950/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/30"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Top-Left: Brand & Animated Tornasol "Developer" */}
          <Link
            href="#hero"
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            {/* Mobile Avatar Icon (always visible on mobile & desktop) */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-violet-400/50 shadow-md flex-shrink-0">
              <Image
                src="/media/IvanHighTech.jpg"
                alt="Iván Vásquez"
                fill
                sizes="32px"
                className="object-cover object-top"
              />
            </div>

            <div className="flex items-baseline space-x-1.5 select-none">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                Iván Vásquez
              </span>
              <span className="text-zinc-500 text-xs hidden sm:inline">—</span>
              <span className="text-zinc-400 text-xs hidden sm:inline">Software</span>
              {/* Tornasol chromatic shimmer based on scroll */}
              <span
                className="text-xs font-bold font-mono tracking-wide px-1.5 py-0.5 rounded transition-all duration-150"
                style={{
                  background: `linear-gradient(${135 + dynamicHue * 0.5}deg, #c084fc, #38bdf8, #34d399, #f43f5e, #c084fc)`,
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `hue-rotate(${dynamicHue}deg) drop-shadow(0 0 6px rgba(168, 85, 247, 0.4))`,
                }}
              >
                Developer
              </span>
            </div>
          </Link>

          {/* Desktop Center: Anchor Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <Link
              href="#videos"
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              Videos
            </Link>
            <Link
              href="#proyectos"
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              Proyectos
            </Link>
            <Link
              href="#ingenieria"
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              Workflow IA
            </Link>
            <Link
              href="#stack"
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              Stack
            </Link>
            <Link
              href="#trayectoria"
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              Trayectoria
            </Link>
            <Link
              href="#sobre-mi"
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              Filosofía
            </Link>
            <Link
              href="#contacto"
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              Contacto
            </Link>
          </nav>

          {/* Desktop Top-Right: GitHub, LinkedIn, Email */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/IVasquezRui"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-violet-400/40 transition-all shadow-sm"
              aria-label="Perfil de GitHub"
              title="GitHub (@IVasquezRui)"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/ivan-manuel-vasquez-rui/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-violet-400/40 transition-all shadow-sm"
              aria-label="Perfil de LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="mailto:ivasquezrui@gmail.com"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-violet-400/40 transition-all shadow-sm"
              aria-label="Enviar correo"
              title="ivasquezrui@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-200 transition-all shadow-sm"
              aria-label="Copiar correo"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE FLOATING SIDEBAR / DOCK ================= */}
      {/* Fixed in bottom-right corner as instructed */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-14 h-14 rounded-full bg-violet-600/90 text-white shadow-2xl border border-violet-400/50 flex items-center justify-center backdrop-blur-xl hover:scale-105 active:scale-95 transition-transform"
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Slide-Up Action Sheet */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-4 bottom-24 p-6 rounded-3xl bg-zinc-950/95 border border-white/15 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-bottom-6 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-violet-400/50">
                  <Image
                    src="/media/IvanHighTech.jpg"
                    alt="Iván Vásquez"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Iván Vásquez</p>
                  <p className="text-[10px] font-mono text-zinc-400">Software Developer</p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copiado" : "Copiar"}</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-2 my-4 text-xs font-mono">
              <Link
                href="#videos"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-zinc-200 border border-white/5"
              >
                🎬 00 · Videos
              </Link>
              <Link
                href="#proyectos"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-zinc-200 border border-white/5"
              >
                🚀 01 · Proyectos
              </Link>
              <Link
                href="#ingenieria"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-zinc-200 border border-white/5"
              >
                🤖 02 · Workflow IA
              </Link>
              <Link
                href="#stack"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-zinc-200 border border-white/5"
              >
                🛠️ 03 · Stack
              </Link>
              <Link
                href="#trayectoria"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-zinc-200 border border-white/5"
              >
                📜 04 · Trayectoria
              </Link>
              <Link
                href="#sobre-mi"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-zinc-200 border border-white/5"
              >
                📐 05 · Filosofía
              </Link>
              <Link
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 col-span-2 rounded-xl bg-violet-600/30 text-violet-200 border border-violet-500/40 text-center font-bold"
              >
                ✉️ 06 · Contacto Directo
              </Link>
            </div>

            {/* Social Direct Icons */}
            <div className="flex items-center justify-around pt-3 border-t border-white/10">
              <a
                href="https://github.com/IVasquezRui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs text-zinc-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ivan-manuel-vasquez-rui/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs text-zinc-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:ivasquezrui@gmail.com"
                className="flex items-center space-x-1.5 text-xs text-zinc-300 hover:text-white"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
