export interface ProjectDetail {
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  featured: boolean;
  summary: string;
  githubUrl: string;
  demoUrl?: string;
  technologies: string[];
  metrics: { label: string; value: string; desc: string }[];
  tabs: {
    demo: {
      title: string;
      description: string;
      highlights: { title: string; text: string }[];
    };
    architecture: {
      title: string;
      description: string;
      highlights: { title: string; text: string }[];
      diagramAscii?: string;
    };
    aiControl: {
      title: string;
      description: string;
      highlights: { title: string; text: string }[];
    };
  };
  deepDive: {
    context: string;
    challenge: string;
    architectureDetails: string[];
    securityHighlights: string[];
    codeSnippet: {
      language: string;
      filename: string;
      code: string;
    };
  };
}

export const projectsData: ProjectDetail[] = [
  {
    slug: "sisu",
    name: "SISU — Agente Virtual Académico",
    tagline: "Célula 04 · Asistente Oficial SIS-UNETI",
    badge: "Fase 1 Operativa · 235 FAQs",
    featured: true,
    summary:
      "Asistente conversacional institucional con arquitectura en 3 capas (FAQs deterministas, RAG autenticado y escalado a soporte humano) gobernado por el Model Context Protocol (MCP).",
    githubUrl: "https://github.com/IVasquezRui",
    demoUrl: "#",
    technologies: [
      "Python",
      "FastAPI",
      "MCP",
      "ChromaDB",
      "RAG",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    metrics: [
      { label: "Base de Conocimiento", value: "235 FAQs", desc: "Reglamentos y directrices académicas validadas" },
      { label: "Latencia P95", value: "< 180 ms", desc: "En consultas deterministas cacheadas con Redis" },
      { label: "Seguridad PII", value: "100%", desc: "Redacción criptográfica previa a llamadas a LLM" },
    ],
    tabs: {
      demo: {
        title: "Demo & Resumen Funcional",
        description:
          "Asistente conversacional oficial para el sistema universitario. Distingue estrictamente entre visitantes anónimos y estudiantes autenticados mediante JWT, consultando expedientes y reglamentos en tiempo real con capacidad de escalado humano.",
        highlights: [
          {
            title: "Gating en 3 Capas",
            text: "Capa 1 determinista (FAQs), Capa 2 con RAG seguro en ChromaDB, y Capa 3 para tickets con personal humano.",
          },
          {
            title: "Cero Fuga de Datos",
            text: "Redacción automática de PII y bloqueo de acceso a expedientes confidenciales si no existe sesión válida.",
          },
        ],
      },
      architecture: {
        title: "Arquitectura Técnica & Microservicios",
        description:
          "Arquitectura de microservicios con backend en FastAPI. Implementación del servidor interno mcp-sisu bajo el Model Context Protocol (MCP) sobre HTTP interno de Docker, con autenticación OAuth 2.1 y tokens RS256/JWKS con scopes por herramienta.",
        highlights: [
          {
            title: "Vector Search & Cache",
            text: "Indexación semántica de normativas en ChromaDB y memoria de tarea de alta velocidad en Redis.",
          },
          {
            title: "Entorno Reproducible",
            text: "Orquestación completa con Docker Compose y suites de validación automatizada con Pytest.",
          },
        ],
        diagramAscii: `
  [ Usuario / App ] ---> [ FastAPI Gateway :8000 ]
                               |
              +----------------+----------------+
              |                                 |
     [ Capa 1: Redis FAQ ]             [ Capa 2: MCP Server ]
       (Caché Determinista)             (Tools & Authorization)
                                                |
                               +----------------+----------------+
                               |                                 |
                      [ ChromaDB Vector Store ]       [ Local / Cloud LLM ]
                      (Normativas & RAG)              (Fallback Determ.)
        `,
      },
      aiControl: {
        title: "Supervisión Agéntica & AI Guardrails",
        description:
          "Bucle agéntico estructurado: Plan → Act → Observe → Verify → Respond. La IA no tiene libertad de ejecutar mutaciones destructivas: las consultas son auditadas y las respuestas pasan por filtros contra Prompt Injection.",
        highlights: [
          {
            title: "Respaldo Determinista",
            text: "Si la API externa de LLM experimenta latencia o falla de red, conmuta automáticamente a plantillas locales verificadas.",
          },
          {
            title: "Ingesta Criptográfica",
            text: "Validación de integridad de documentos normativos mediante comparación de hashes SHA-256 en base de datos relacional.",
          },
        ],
      },
    },
    deepDive: {
      context:
        "La UNETI requería un canal de atención unificado capaz de resolver miles de consultas recurrentes de estudiantes y aspirantes sin saturar al personal docente y administrativo.",
      challenge:
        "Evitar a toda costa que el modelo alucine reglamentos inexistentes o filtre datos personales de estudiantes protegidos por normativas de privacidad institucional.",
      architectureDetails: [
        "Gateway en FastAPI desacoplado que actúa como orquestador de seguridad antes de cualquier inferencia.",
        "Servidor MCP interno encapsulado en Docker que expone herramientas declaradas con contratos OpenAPI estrictos.",
        "Almacenamiento de embeddings en ChromaDB utilizando cosine similarity y thresholds de corte conservadores (score >= 0.82).",
        "Tokens OAuth 2.1 con claims específicos de herramientas que impiden llamadas no autorizadas entre servicios.",
      ],
      securityHighlights: [
        "Filtro regex y NER (Named Entity Recognition) para redacción de cédulas, correos y números telefónicos previo al prompt.",
        "Sanitización bidireccional contra Jailbreaks, indirect prompt injection y fugas de contexto del sistema.",
        "Logging de auditoría estructurado en JSON con trazabilidad de transacciones.",
      ],
      codeSnippet: {
        language: "python",
        filename: "mcp_tool_contract.py",
        code: `# Contrato Estricto para Herramienta MCP en FastAPI
from pydantic import BaseModel, Field
from typing import Literal, Optional

class StudentRecordQuery(BaseModel):
    student_id: str = Field(..., regex=r"^[V|E]-[0-9]{7,9}$")
    query_scope: Literal["grades", "enrollment", "regulations"]
    auth_token_hash: str
    requester_role: str = Field(default="student")

    class Config:
        frozen = True
        str_strip_whitespace = True

# El agente MCP solo puede ejecutar acciones que satisfagan este esquema validado`,
      },
    },
  },
  {
    slug: "centinela",
    name: "CENTINELA — Motor IDS/IPS Defensivo & Observatorio",
    tagline: "Hackathon UNETI IA 2026 · Defensiva Activa & Machine Learning",
    badge: "MVP en IDS/IPS",
    featured: true,
    summary:
      "Inline Gateway en FastAPI que inspecciona tráfico HTTP en <10 ms de CPU, ejecuta cuarentena automática en modo IPS y combina Random Forest con análisis forense asistido por IA.",
    githubUrl: "https://github.com/IVasquezRui",
    demoUrl: "#",
    technologies: [
      "Python",
      "FastAPI",
      "scikit-learn",
      "Random Forest",
      "React",
      "PostgreSQL",
      "Docker",
      "SSE",
    ],
    metrics: [
      { label: "Inspección Gateway", value: "< 10 ms", desc: "Tiempo de evaluación por paquete en capa de aplicación" },
      { label: "Precisión Clasificador", value: "97.4%", desc: "Modelo Random Forest entrenado sobre dataset NSL-KDD" },
      { label: "Cadena de Auditoría", value: "SHA-256", desc: "Hashes inmutables en PostgreSQL para peritaje legal" },
    ],
    tabs: {
      demo: {
        title: "Demo & Métricas en Vivo",
        description:
          "Puerta de enlace inline que analiza cada petición HTTP entrante. Si detecta patrones anómalos o firmas maliciosas, bloquea la IP en tiempo real y transmite el evento vía Server-Sent Events (SSE) a un panel SOC reactivo.",
        highlights: [
          {
            title: "Modo Dual IDS / IPS",
            text: "Capacidad de operar en modo pasivo de alerta (IDS) o en modo defensivo activo de corte inmediato (IPS).",
          },
          {
            title: "Dashboard SOC en Tiempo Real",
            text: "Consola de operaciones en React con gráficos de frecuencia, ranking de vectores de ataque y stream de telemetría.",
          },
        ],
      },
      architecture: {
        title: "Pipeline de Detección & Gateway",
        description:
          "Middleware asíncrono en FastAPI (:8080) con inspección de cabeceras, payloads y patrones de frecuencia. Ponderación híbrida entre reglas deterministas de corte instantáneo y evaluación de riesgo mediante scikit-learn.",
        highlights: [
          {
            title: "Pipeline de Inferencia Rápida",
            text: "Extracción vectorizada de 41 features del paquete y scoring probabilístico en menos de 10 ms de cómputo.",
          },
          {
            title: "Persistencia Auditada",
            text: "Almacenamiento relacional en PostgreSQL con firmas SHA-256 encadenadas para garantizar la inmutabilidad de la evidencia.",
          },
        ],
        diagramAscii: `
  [ Tráfico HTTP Cliente ] ---> [ Inline Gateway :8080 ]
                                       |
                   +-------------------+-------------------+
                   |                                       |
          [ Reglas Deterministas ]                [ Inferencia ML Random Forest ]
          (SQLi, XSS, Path Trav)                  (Scoring de Anomalía NSL-KDD)
                   |                                       |
                   +-------------------+-------------------+
                                       |
                       [ Decision Engine: IDS / IPS ]
                                       |
                   +-------------------+-------------------+
                   |                                       |
          [ DROP & Blacklist ]                    [ ALLOW & Forward ]
          (Notificación SSE al SOC)               (Servicio Destino)
        `,
      },
      aiControl: {
        title: "Copiloto Forense con Fallback",
        description:
          "Asistente forense que genera resúmenes ejecutivos y recomendaciones de mitigación para el operador del SOC. Si el LLM experimenta latencia, el sistema emite plantillas analíticas deterministas sin interrumpir la operación.",
        highlights: [
          {
            title: "Aislamiento de Decisión",
            text: "El modelo generativo jamás decide el bloqueo o desbloqueo; su función es estrictamente de síntesis analítica y forense.",
          },
          {
            title: "Hash Inmutable",
            text: "Cada reporte forense queda sellado criptográficamente vinculando el ID de incidente con su hash de payload.",
          },
        ],
      },
    },
    deepDive: {
      context:
        "Desarrollado y presentado en el Hackathon UNETI IA 2026 (Parque Tecnológico + Más Ciencia · IVIC) ante un jurado de especialistas en redes y seguridad de la información.",
      challenge:
        "Procesar tráfico HTTP continuo en una arquitectura de gateway sin inducir latencia perceptible a usuarios legítimos, neutralizando ataques dirigidos de denegación e inyección.",
      architectureDetails: [
        "Reverse proxy inverso desarrollado sobre Starlette/FastAPI con streaming asíncrono y buffers de memoria controlados.",
        "Modelo scikit-learn serializado en joblib de bajo overhead, cargado en memoria compartida al inicio del contenedor.",
        "Emisor de eventos Server-Sent Events (SSE) nativo con canalización hacia clientes conectados al SOC.",
        "Persistencia relacional en PostgreSQL con transacciones serializables y cálculo de hash SHA-256 pre-commit.",
      ],
      securityHighlights: [
        "Protección contra bypass de gateway mediante firmas de transporte interno seguras.",
        "Bloqueo automático de IP en iptables / lista en memoria con expiración paramétrica (rate limit dinámico).",
        "Validación exhaustiva de payloads JSON con Pydantic para neutralizar desbordamientos de buffer.",
      ],
      codeSnippet: {
        language: "python",
        filename: "gateway_interceptor.py",
        code: `# Interceptor Inline de Seguridad con Doble Verificación
async def inspect_incoming_traffic(request: Request) -> InspectionResult:
    payload_hash = hashlib.sha256(await request.body()).hexdigest()
    
    # 1. Fase Determinista (Zero latency regex & OWASP patterns)
    if is_deterministic_signature(request):
        return InspectionResult(action="DROP", reason="SIGNATURE_MATCH", hash=payload_hash)
        
    # 2. Inferencia ML Vectorizada (<10ms)
    features = extract_traffic_features(request)
    anomaly_score = rf_classifier.predict_proba([features])[0][1]
    
    if anomaly_score > DANGER_THRESHOLD:
        await quarantine_ip(request.client.host)
        return InspectionResult(action="QUARANTINE", score=anomaly_score, hash=payload_hash)
        
    return InspectionResult(action="ALLOW", hash=payload_hash)`,
      },
    },
  },
  {
    slug: "sd-uneti",
    name: "SD-UNETI — Portal Institucional Headless",
    tagline: "Secretaría Digital UNETI · Frontend Desacoplado & Headless CMS",
    badge: "Listo para Producción",
    featured: true,
    summary:
      "Frontend desacoplado de alta velocidad en Next.js, React y TypeScript con WPGraphQL, MariaDB y 10 flujos automatizados de CI/CD con pentesting en GitHub Actions.",
    githubUrl: "https://github.com/IVasquezRui/SD-UNETI",
    demoUrl: "#",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WPGraphQL",
      "MariaDB",
      "Docker",
      "CI/CD",
    ],
    metrics: [
      { label: "Lighthouse Performance", value: "99 / 100", desc: "Core Web Vitals óptimos con ISR y assets pre-renderizados" },
      { label: "Pipelines de CI/CD", value: "10 Flujos", desc: "Validación de tipos, tests unitarios y pentesting continuo" },
      { label: "Desacoplamiento", value: "100%", desc: "CMS administrativo aislado del tráfico público de visitantes" },
    ],
    tabs: {
      demo: {
        title: "Demo & Arquitectura Desacoplada",
        description:
          "Plataforma institucional moderna que separa radicalmente la gestión de contenidos de la capa de entrega al usuario final. El backend WordPress funciona exclusivamente como API GraphQL privada, mientras que el frontend compila estáticamente con revalidación incremental (ISR).",
        highlights: [
          {
            title: "Carga Ultrarrápida (ISR)",
            text: "Páginas servidas en milisegundos desde CDN global, actualizándose en segundo plano ante cambios en el CMS.",
          },
          {
            title: "Superficie de Ataque Reducida",
            text: "El WordPress no está expuesto a Internet público; solo el frontend Next.js recibe tráfico de los visitantes.",
          },
        ],
      },
      architecture: {
        title: "Arquitectura Headless & Pipelines",
        description:
          "Frontend en Next.js (App Router) comunicándose vía WPGraphQL tipado con TypeScript. Entorno orquestado en Docker Compose con MariaDB optimizada y caché de consultas para evitar sobrecarga en la base de datos.",
        highlights: [
          {
            title: "10 Flujos de CI/CD",
            text: "Workflows en GitHub Actions que ejecutan linters, build tests, pruebas unitarias y análisis estático de seguridad.",
          },
          {
            title: "Pentesting Automatizado",
            text: "Escaneos de vulnerabilidades periódicos con Nuclei y WPScan antes de cualquier despliegue a producción.",
          },
        ],
        diagramAscii: `
  [ Usuario Final ] ---> [ Next.js Frontend (Edge CDN) ]
                                    | (ISR Fetch / WPGraphQL)
                                    v
                    [ WordPress Headless API (Privado) ]
                                    |
                    [ MariaDB Conexión Segura ]
        `,
      },
      aiControl: {
        title: "Calidad de Código & Automatización",
        description:
          "Scripts idempotentes en Python para sincronización de assets, optimización de imágenes en formatos modernos y verificación de integridad de enlaces rotos.",
        highlights: [
          {
            title: "Tipado Estricto de GraphQL",
            text: "Generación automática de tipos TypeScript a partir del esquema GraphQL para evitar inconsistencias en runtime.",
          },
          {
            title: "Hardening Defensivo",
            text: "Políticas de seguridad de contenido (CSP), prevención de inyección en cabeceras y sanitización estricta de HTML.",
          },
        ],
      },
    },
    deepDive: {
      context:
        "La Secretaría Digital de la UNETI requería un portal moderno, accesible y altamente confiable para publicar resoluciones, cronogramas y noticias académicas a miles de usuarios simultáneos.",
      challenge:
        "Mantener la facilidad de edición para los redactores de contenido en WordPress, pero eliminar por completo las vulnerabilidades comunes de WordPress y sus problemas de rendimiento en servidores compartidos.",
      architectureDetails: [
        "Next.js App Router con Server Components para renderizar todo el contenido estático sin JavaScript innecesario en el cliente.",
        "Capa de consultas GraphQL optimizadas solicitando únicamente los campos requeridos para cada vista.",
        "Revalidación bajo demanda (On-demand ISR) mediante webhooks seguros activados al publicar o editar contenido.",
        "Contenerización completa en Docker con volúmenes persistentes y red interna aislada.",
      ],
      securityHighlights: [
        "WordPress bloqueado para tráfico externo: acceso administrativo restringido por IP y proxy inverso con autenticación.",
        "Auditoría continua con Nuclei y WPScan en cada pull request para detectar plugins obsoletos o malas configuraciones.",
        "Sanitización de HTML y renderizado seguro de fragmentos mediante librerías de parseo con cero scripts permitidos.",
      ],
      codeSnippet: {
        language: "typescript",
        filename: "graphql_client.ts",
        code: `// Cliente GraphQL Tipado con Revalidación ISR en Next.js
interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function fetchFromHeadlessCMS<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidateTime = 3600
): Promise<T> {
  const res = await fetch(process.env.WORDPRESS_API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: revalidateTime, tags: ["cms-content"] },
  });

  const json: GraphQLResponse<T> = await res.json();
  if (json.errors?.length) {
    throw new Error(\`GraphQL Error: \${json.errors[0].message}\`);
  }
  return json.data;
}`,
      },
    },
  },
];
