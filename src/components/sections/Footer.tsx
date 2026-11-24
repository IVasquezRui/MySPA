import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 relative z-10 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <p>
          © {new Date().getFullYear()} Iván Vásquez. Diseñado y construido con Next.js (App Router), React 19, TypeScript &amp; Tailwind CSS.
        </p>

        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/IVasquezRui/MySPA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            Código Fuente ↗
          </a>
          <Link
            href="#hero"
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <span>Subir al Inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
