"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, Menu, X, Copy, Check, ChevronRight } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const navLinks = [
    { href: "#videos", label: "Videos", num: "00" },
    { href: "#proyectos", label: "Proyectos", num: "01" },
    { href: "#ingenieria", label: "Workflow IA", num: "02" },
    { href: "#stack", label: "Stack Tecnológico", num: "03" },
    { href: "#trayectoria", label: "Historial Técnico", num: "04" },
    { href: "#sobre-mi", label: "Filosofía", num: "05" },
    { href: "#contacto", label: "Contacto", num: "06" },
  ];

  const isScrolled = scrollY > 50;

  return (
    <>
      {/* ================= FIXED TOP HEADER BAR ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Top-Left: Large Name & Role in Arial Bold with Automatic Chroma */}
          <Link
            href="#hero"
            className="flex items-center space-x-3 group cursor-pointer select-none"
          >
            {/* Avatar thumbnail icon */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-violet-500/50 shadow-lg shadow-violet-500/20 flex-shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/media/IvanHighTech.jpg"
                alt="Iván Vásquez"
                fill
                sizes="44px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Typography: Bold, Square-mold Arial as requested */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2">
              <span className="text-lg sm:text-xl md:text-2xl font-bold font-['Arial',sans-serif] text-white tracking-tight group-hover:text-violet-200 transition-colors drop-shadow-sm">
                Iván Vásquez
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-xs sm:text-sm md:text-base font-bold font-['Arial',sans-serif] text-zinc-300">
                  Software
                </span>
                {/* Automatic Chroma on Developer: pure CSS without scroll dependence or rectangle glitch */}
                <span className="text-xs sm:text-sm md:text-base font-bold font-['Arial',sans-serif] chroma-text">
                  Developer
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Center Navigation (Visible only at top of page, transforms into sidebar on scroll) */}
          <nav
            className={`hidden lg:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-zinc-400 transition-all duration-300 ${
              isScrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors hover:scale-105 transform duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Top-Right Actions when at top */}
          <div
            className={`hidden lg:flex items-center space-x-3 transition-all duration-300 ${
              isScrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <a
              href="https://github.com/IVasquezRui"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-violet-400/40 transition-all"
              title="GitHub (@IVasquezRui)"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ivan-manuel-vasquez-rui/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-violet-400/40 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:ivasquezrui@gmail.com"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-violet-400/40 transition-all"
              title="ivasquezrui@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-200 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR TRIGGER BUTTON (TOP-RIGHT FOR BOTH PC & MOBILE) ================= */}
      {/* In mobile always visible; in PC visible when scrolled (transformed into sidebar) or can be toggled */}
      <div className="fixed top-3.5 sm:top-4 right-4 sm:right-6 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border shadow-xl ${
            isScrolled || sidebarOpen
              ? "bg-violet-600 text-white border-violet-400 shadow-violet-600/30 scale-100 opacity-100"
              : "lg:opacity-0 lg:pointer-events-none bg-zinc-900/90 text-white border-white/20 hover:border-violet-400 hover:bg-violet-600"
          }`}
          aria-label={sidebarOpen ? "Cerrar menú lateral" : "Abrir menú lateral"}
          title="Menú de Navegación"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ================= ANIMATED SLIDE-IN SIDEBAR (PC & MOBILE) ================= */}
      {/* Backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        />
      )}

      {/* Slide-in Drawer */}
      <aside
        className={`fixed top-0 bottom-0 right-0 w-80 sm:w-96 bg-zinc-950/95 border-l border-white/10 shadow-2xl backdrop-blur-2xl z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Top: Brand */}
          <div className="flex items-center space-x-3 pb-6 border-b border-white/10 pr-12">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-violet-500/40">
              <Image
                src="/media/IvanHighTech.jpg"
                alt="Iván Vásquez"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-base font-bold font-['Arial',sans-serif] text-white">
                Iván Vásquez
              </p>
              <p className="text-xs font-bold font-['Arial',sans-serif] text-zinc-300">
                Software <span className="chroma-text">Developer</span>
              </p>
            </div>
          </div>

          {/* Navigation Links with Numbers */}
          <div className="py-6 space-y-1.5 font-mono text-xs">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-violet-600/20 text-zinc-300 hover:text-white border border-transparent hover:border-violet-500/30 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] text-violet-400 font-bold">
                    {item.num}
                  </span>
                  <span className="text-sm font-semibold font-sans">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Footer: Social & Direct Actions */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <button
            onClick={handleCopyEmail}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-violet-600/25 hover:bg-violet-600/40 border border-violet-500/40 text-violet-200 text-xs font-mono font-medium transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">¡Correo Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-violet-400" />
                <span>Copiar: ivasquezrui@gmail.com</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-around text-xs font-mono text-zinc-400">
            <a
              href="https://github.com/IVasquezRui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ivan-manuel-vasquez-rui/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:ivasquezrui@gmail.com"
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
