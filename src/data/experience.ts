export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  current?: boolean;
  type: "job" | "education" | "simulation";
  skills?: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "uneti-dev",
    period: "2026 — Actualidad",
    role: "Desarrollador de Software",
    organization: "Universidad Nacional Experimental de las Telecomunicaciones e Informática (UNETI)",
    description:
      "Desarrollo e ingeniería de la plataforma institucional desacoplada SD-UNETI (Next.js + WPGraphQL), diseño del agente conversacional institucional SISU con Model Context Protocol (MCP) y RAG en ChromaDB, y creación del Gateway defensivo CENTINELA (IDS/IPS con ML) en el Hackathon UNETI IA 2026.",
    current: true,
    type: "job",
    skills: ["Next.js", "Python", "FastAPI", "MCP", "Docker", "PostgreSQL", "ChromaDB"],
  },
  {
    id: "forage-sims",
    period: "2025 — 2026",
    role: "Simulaciones Laborales & Certificaciones",
    organization: "Forage Global Programs",
    description:
      "Datacom: Software Development Job Simulation (code reviews, depuración de incidencias y análisis de causa raíz). British Airways: Data Science Job Simulation (modelado predictivo de clientes y clasificación). Cybersecurity: Simulación de ataques de phishing y análisis de vulnerabilidades.",
    type: "simulation",
    skills: ["Code Review", "Data Science", "Cybersecurity", "Debugging", "Forensics"],
  },
  {
    id: "dyaca-it",
    period: "2024 — 2025",
    role: "Soporte IT & Sistemas",
    organization: "Inversiones Dyaca 1812, C.A.",
    description:
      "Mantenimiento, respaldo y consistencia de bases de datos relacionales en sistemas administrativos corporativos. Automatización de tareas rutinarias de infraestructura, diagnóstico de estaciones de trabajo y aseguramiento de la red de área local.",
    type: "job",
    skills: ["Bases de Datos", "Redes LAN", "Mantenimiento Preventivo", "Automatización"],
  },
  {
    id: "dem-tsj",
    period: "2022 — 2024",
    role: "Analista Profesional I (Dirección de Informática)",
    organization: "Tribunal Supremo de Justicia (DEM-TSJ) · Jurisdicción Disciplinaria Judicial",
    description:
      "Administración y soporte de servicios compartidos corporativos en servidores Linux (Samba), soporte a cableado estructurado, resolución de incidencias de red e implementación de políticas de acceso para garantizar alta disponibilidad de los servicios judiciales.",
    type: "job",
    skills: ["Linux Server", "Samba", "Infraestructura", "Cableado Estructurado", "Soporte Corporativo"],
  },
  {
    id: "uneti-student",
    period: "En Curso",
    role: "Estudiante de Ingeniería Informática",
    organization: "Universidad Nacional Experimental de las Telecomunicaciones e Informática (UNETI)",
    description:
      "Formación universitaria rigurosa en ciencias de la computación, arquitectura de software, bases de datos, redes y algoritmos, complementada de manera continua con proyectos de software desplegados en producción real.",
    current: true,
    type: "education",
    skills: ["Ingeniería de Software", "Algoritmos", "Estructuras de Datos", "Sistemas Distribuidos"],
  },
];
