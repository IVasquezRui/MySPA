"use client";

import React, { useState } from "react";
import { Terminal, Cpu, Database, CloudLightning, CheckCircle2, Code2 } from "lucide-react";

interface WorkflowPillar {
  id: string;
  badge: string;
  title: string;
  summary: string;
  icon: React.ReactNode;
  details: string[];
  snippetTitle: string;
  snippetCode: string;
}

export default function AiWorkflowSection() {
  const [activeTab, setActiveTab] = useState<string>("agentic-tools");

  const pillars: WorkflowPillar[] = [
    {
      id: "agentic-tools",
      badge: "Pilar 01 · Metodología",
      title: "Cómo Programo con IA & Herramientas de Código",
      summary:
        "No uso la IA como un generador ciego de código, sino como un acelerador de entrega guiado por especificaciones estrictas (Schema-Driven Development).",
      icon: <Terminal className="w-5 h-5 text-violet-400" />,
      details: [
        "Definición previa de contratos: interfaces TypeScript, esquemas Pydantic y modelos de datos antes de generar cualquier función.",
        "Uso intensivo de agentes de código para exploración de librerías, generación de fixtures de test y refactorización de lógica boilerplate.",
        "Validación sintáctica y verificación estricta de tipos: si el código generado no pasa el linter y los tests unitarios, no entra al repositorio.",
        "Supervisión humana rigurosa: el criterio arquitectónico, la seguridad y el modelo de negocio permanecen 100% bajo control del ingeniero.",
      ],
      snippetTitle: "contract_driven_workflow.py",
      snippetCode: `# Desarrollo Guiado por Contratos (SDD) con Pydantic y FastAPI
from pydantic import BaseModel, Field
from typing import Literal, Optional
from datetime import datetime

class ToolExecutionSpec(BaseModel):
    transaction_id: str = Field(..., description="UUID inmutable del evento")
    action_type: Literal["READ_METRICS", "EXECUTE_SANDBOX", "DISPATCH_ALERT"]
    parameters: dict[str, str]
    max_execution_time_ms: int = Field(default=250, le=1000)
    requires_human_approval: bool = False

# La IA solo puede invocar acciones que satisfagan este contrato estricto`,
    },
    {
      id: "languages-stack",
      badge: "Pilar 02 · Ecosistema",
      title: "Dominio de Lenguajes de Programación & Librerías",
      summary:
        "Especialización en lenguajes de alto rendimiento y ecosistemas modernos para construir desde microservicios hasta interfaces reactivas.",
      icon: <Code2 className="w-5 h-5 text-sky-400" />,
      details: [
        "Python (FastAPI, Pydantic, scikit-learn, Pytest): APIs asíncronas de bajísima latencia, pipelines de Machine Learning para ciberseguridad y suites de pruebas automatizadas.",
        "TypeScript & JavaScript (Next.js App Router, React 19, Tailwind CSS): Arquitectura frontend desacoplada, React Server Components (RSC) y diseño responsive sin colisiones globales.",
        "SQL (PostgreSQL, MariaDB): Modelado relacional normalizado, transacciones ACID serializables y optimización de índices.",
        "Bash & Linux Scripting: Automatización de tareas de infraestructura, pipelines CI/CD y despliegues idempotentes en servidores Debian/Ubuntu.",
      ],
      snippetTitle: "language_capabilities.ts",
      snippetCode: `// Arquitectura Híbrida en Next.js App Router con TypeScript
import { cache } from "react";

export interface SystemTelemetry {
  readonly serviceId: string;
  readonly cpuLoadPercent: number;
  readonly activeAgentSessions: number;
  readonly status: "HEALTHY" | "DEGRADED" | "CRITICAL";
}

// React Server Component Data Fetching con Caché Deduplicada
export const getSystemHealth = cache(async (): Promise<SystemTelemetry> => {
  // Conexión segura con microservicio FastAPI
  const res = await fetch("http://gateway-internal:8080/health", {
    next: { revalidate: 60 }
  });
  return res.json();
});`,
    },
    {
      id: "databases-state",
      badge: "Pilar 03 · Almacenamiento",
      title: "Bases de Datos & Gestión de Memoria",
      summary:
        "Orquestación de persistencia híbrida combinando almacenamiento relacional ACID, bases vectoriales semánticas y caché en caliente.",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      details: [
        "PostgreSQL: Base relacional principal para modelos de datos complejos y registros de auditoría forense con firmas SHA-256 inmutables.",
        "ChromaDB (Vector Database): Almacenamiento de embeddings semánticos para sistemas RAG con similitud coseno y filtrado estricto por metadatos institucionales.",
        "Redis: Almacén en RAM de ultra alta velocidad (< 5ms) para rate limiting, tokens JWT en lista negra y memoria transitoria de sesiones agénticas.",
        "MariaDB: Base de datos transaccional optimizada para backends Headless con WPGraphQL y gestión de contenidos.",
      ],
      snippetTitle: "vector_and_cache_store.py",
      snippetCode: `# Sinergia: ChromaDB (Vector Store) + Redis (High-Speed Session)
import redis.asyncio as aioredis
from chromadb.utils import embedding_functions

async def retrieve_semantic_context(student_query: str, session_id: str) -> list[str]:
    # 1. Chequeo de caché ultra-rápida en Redis (< 3ms)
    redis_client = aioredis.from_url("redis://localhost:6379")
    cached_context = await redis_client.get(f"session:{session_id}:last_ctx")
    if cached_context:
        return [cached_context.decode("utf-8")]

    # 2. Búsqueda vectorial en ChromaDB con score threshold estricto
    results = vector_collection.query(
        query_texts=[student_query],
        n_results=3,
        where={"access_level": "public"}
    )
    return results["documents"][0]`,
    },
    {
      id: "agent-cloud-synergy",
      badge: "Pilar 04 · Arquitectura IA",
      title: "Sinergia: Agente Local de IA con LLM en la Nube",
      summary:
        "Arquitectura híbrida donde un agente local en Docker gestiona herramientas y filtra datos confidenciales, combinándose con modelos en la nube para razonamiento avanzado.",
      icon: <CloudLightning className="w-5 h-5 text-amber-400" />,
      details: [
        "Agente Local en Docker: Ejecuta Model Context Protocol (MCP) y modelos ligeros locales (Ollama / Llama / Mistral) para procesar datos sensibles sin que salgan de la red institucional.",
        "Redacción Automática de PII: El agente local filtra cédulas, correos y contraseñas antes de consultar APIs externas.",
        "Orquestación de LLMs en la Nube: Conexión mediante API con proveedores externos (Claude, OpenAI, Gemini) para tareas de síntesis compleja y razonamiento abstracto.",
        "Tolerancia Total a Fallos (Deterministic Fallback): Si la API en la nube sufre latencia o corte de conexión, el agente local conmuta automáticamente a plantillas deterministas validadas.",
      ],
      snippetTitle: "hybrid_agent_orchestrator.py",
      snippetCode: `# Orquestador Híbrido: Agente Local (MCP) + LLM Cloud con Fallback
class HybridAgentOrchestrator:
    def __init__(self, mcp_client: MCPClient, cloud_llm_client: CloudAPI):
        self.mcp = mcp_client
        self.cloud = cloud_llm_client

    async def execute_task(self, prompt: str, user_claims: dict) -> AgentResponse:
        # 1. Filtro local de privacidad (PII Redaction en CPU interna)
        clean_prompt = self.redact_sensitive_pii(prompt)
        
        # 2. Intento de inferencia en LLM Nube con timeout estricto (2.5s)
        try:
            cloud_plan = await asyncio.wait_for(
                self.cloud.generate_plan(clean_prompt), timeout=2.5
            )
            # 3. El agente local valida y ejecuta las herramientas seguras vía MCP
            return await self.mcp.execute_scoped_tools(cloud_plan, user_claims)
        except (asyncio.TimeoutError, CloudAPIException):
            # 4. Fallback determinista automático en servidor local
            return self.mcp.execute_deterministic_fallback(clean_prompt)`,
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section id="ingenieria" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
            <span>02</span>
            <span>/</span>
            <span>INGENIERÍA AUMENTADA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Herramientas, Agentes Locales y Modelos Cloud
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">
            Cómo desarrollo software con IA: sin atajos ni alucinaciones. Dominio de lenguajes, bases de datos y la orquestación precisa entre agentes locales en contenedores y modelos en la nube.
          </p>
        </div>

        {/* 4 Pillars Interactive Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {pillars.map((pillar) => {
            const isSelected = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-violet-950/40 border-violet-500/60 shadow-lg shadow-violet-500/10"
                    : "bg-zinc-950/70 border-white/5 hover:border-white/20 hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {pillar.icon}
                  </span>
                  <span
                    className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {pillar.badge.split(" · ")[0]}
                  </span>
                </div>
                <div>
                  <h4
                    className={`text-sm font-bold tracking-tight mb-1 ${
                      isSelected ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Dive (Two-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Left Column: Detailed Principles */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider mb-2">
                {currentPillar.badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentPillar.title}
              </h3>
              <p className="mt-3 text-zinc-300 text-sm leading-relaxed">
                {currentPillar.summary}
              </p>
            </div>

            <div className="space-y-3">
              {currentPillar.details.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Specification Display */}
          <div className="lg:col-span-6 flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/90 shadow-inner">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {currentPillar.snippetTitle}
              </span>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed text-zinc-200 bg-zinc-950/60 flex-1">
              <pre className="whitespace-pre">
                <code>{currentPillar.snippetCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
