"use client";

import React from "react";
import StrokeText from "./StrokeText";
import RotatingText from "./RotatingText";

export default function HeroTitle() {
  const dynamicPillars = [
    "Sistemas con IA",
    "Model Context Protocol (MCP)",
    "APIs con FastAPI & Python",
    "RSC & Next.js Híbrido",
    "Ciberseguridad Defensiva",
  ];

  return (
    <div className="w-full flex flex-col items-start gap-1 sm:gap-2">
      <div className="w-full max-w-3xl">
        <StrokeText
          text="Arquitectura Web Robusta"
          strokeColor="#a855f7"
          strokeWidth={1.8}
          drawDuration={1.8}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mt-1">
        <span className="text-zinc-400 font-light">&amp;</span>
        <RotatingText
          texts={dynamicPillars}
          rotationInterval={3000}
          highlightColor="#c084fc"
        />
      </div>
    </div>
  );
}
