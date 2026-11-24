import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import VideoShowcase from "@/components/interactive/VideoShowcase";
import ProjectsShowcase from "@/components/interactive/ProjectsShowcase";
import AiWorkflowSection from "@/components/interactive/AiWorkflowSection";
import StackSection from "@/components/interactive/StackSection";
import TimelineSection from "@/components/interactive/TimelineSection";
import PhilosophySection from "@/components/interactive/PhilosophySection";
import ContactSection from "@/components/interactive/ContactSection";

export default function HomePage() {
  return (
    <div className="relative flex flex-col w-full">
      {/* Hero Section with Parallax Products & Stroke / Rotating Text */}
      <HeroSection />

      {/* 00 / Video Showcase: Craftwork (Ivan-STACK.mp4) & Agentic (Ivan-AGENTS.mp4) */}
      <VideoShowcase />

      {/* 01 / Proyectos Full-Stack & Sistemas de Producción */}
      <ProjectsShowcase />

      {/* 02 / Ingeniería Aumentada: Herramientas, Lenguajes, DBs y Agentes Locales con LLMs en Nube */}
      <AiWorkflowSection />

      {/* 03 / Stack Tecnológico */}
      <StackSection />

      {/* 04 / Trayectoria & Experiencia Profesional */}
      <TimelineSection />

      {/* 05 / Filosofía de Ingeniería: Código Limpio y Estructurado */}
      <PhilosophySection />

      {/* 06 / Conexión Directa & Credencial 3D Lanyard Interactiva */}
      <ContactSection />
    </div>
  );
}
