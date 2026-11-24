export interface StackSkill {
  name: string;
  category: string;
  filterKey: string;
  icon?: string;
  highlightProjects: string[]; // slugs of projects
}

export interface StackCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  skills: StackSkill[];
}

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    icon: "🎨",
    title: "Frontend & Web",
    description: "Interfaces reactivas, tipografía de precisión, componentes accesibles y renderizado híbrido.",
    skills: [
      { name: "Next.js", category: "frontend", filterKey: "nextjs", highlightProjects: ["sd-uneti"] },
      { name: "React", category: "frontend", filterKey: "react", highlightProjects: ["sd-uneti", "centinela"] },
      { name: "TypeScript", category: "frontend", filterKey: "typescript", highlightProjects: ["sd-uneti"] },
      { name: "Tailwind CSS", category: "frontend", filterKey: "tailwind", highlightProjects: ["sd-uneti", "centinela"] },
      { name: "Server-Sent Events", category: "frontend", filterKey: "sse", highlightProjects: ["centinela"] },
      { name: "HTML5 / CSS3", category: "frontend", filterKey: "html5", highlightProjects: ["sd-uneti", "sisu"] },
    ],
  },
  {
    id: "backend",
    icon: "⚙️",
    title: "Backend & APIs",
    description: "Servicios de alta velocidad, arquitecturas REST, microservicios y contratos desacoplados.",
    skills: [
      { name: "Python", category: "backend", filterKey: "python", highlightProjects: ["sisu", "centinela"] },
      { name: "FastAPI", category: "backend", filterKey: "fastapi", highlightProjects: ["sisu", "centinela"] },
      { name: "Node.js", category: "backend", filterKey: "node", highlightProjects: ["sd-uneti"] },
      { name: "WPGraphQL", category: "backend", filterKey: "graphql", highlightProjects: ["sd-uneti"] },
      { name: "OAuth 2.1 / JWT", category: "backend", filterKey: "oauth", highlightProjects: ["sisu"] },
      { name: "REST APIs", category: "backend", filterKey: "rest", highlightProjects: ["sisu", "centinela", "sd-uneti"] },
    ],
  },
  {
    id: "ai-systems",
    icon: "🤖",
    title: "Sistemas Agénticos & IA",
    description: "Protocolos de contexto (MCP), memoria semántica vectorial y copilotos locales.",
    skills: [
      { name: "Model Context Protocol (MCP)", category: "ai-systems", filterKey: "mcp", highlightProjects: ["sisu"] },
      { name: "RAG & Embeddings", category: "ai-systems", filterKey: "rag", highlightProjects: ["sisu"] },
      { name: "ChromaDB", category: "ai-systems", filterKey: "chromadb", highlightProjects: ["sisu"] },
      { name: "scikit-learn", category: "ai-systems", filterKey: "scikit-learn", highlightProjects: ["centinela"] },
      { name: "AI Guardrails", category: "ai-systems", filterKey: "ai-guardrails", highlightProjects: ["sisu"] },
      { name: "Ollama / Local LLMs", category: "ai-systems", filterKey: "local-llm", highlightProjects: ["sisu"] },
    ],
  },
  {
    id: "data-cache",
    icon: "🗄️",
    title: "Bases de Datos & Caché",
    description: "Almacenamiento relacional ACID, bases vectoriales y memoria de alta velocidad en caliente.",
    skills: [
      { name: "PostgreSQL", category: "data-cache", filterKey: "postgresql", highlightProjects: ["sisu", "centinela"] },
      { name: "MariaDB", category: "data-cache", filterKey: "mariadb", highlightProjects: ["sd-uneti"] },
      { name: "Redis", category: "data-cache", filterKey: "redis", highlightProjects: ["sisu"] },
      { name: "MongoDB", category: "data-cache", filterKey: "mongodb", highlightProjects: [] },
    ],
  },
  {
    id: "devops-security",
    icon: "🛡️",
    title: "DevOps & Ciberseguridad",
    description: "Contenerización reproducible, pentesting continuo, CI/CD y hardening de sistemas.",
    skills: [
      { name: "Docker & Compose", category: "devops-security", filterKey: "docker", highlightProjects: ["sisu", "centinela", "sd-uneti"] },
      { name: "GitHub Actions", category: "devops-security", filterKey: "ci-cd", highlightProjects: ["sd-uneti"] },
      { name: "Linux / Zsh", category: "devops-security", filterKey: "linux", highlightProjects: ["sisu", "centinela", "sd-uneti"] },
      { name: "OWASP Web Hardening", category: "devops-security", filterKey: "owasp", highlightProjects: ["sisu", "centinela", "sd-uneti"] },
      { name: "Pytest", category: "devops-security", filterKey: "pytest", highlightProjects: ["sisu", "centinela"] },
      { name: "Proxmox", category: "devops-security", filterKey: "proxmox", highlightProjects: [] },
    ],
  },
];
