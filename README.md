# 🚀 Portafolio Web — Iván Vásquez (@IVasquezRui)

Plataforma híbrida de alto rendimiento construida con **Next.js (App Router)**, **React Server Components (RSC)**, **TypeScript**, animaciones aceleradas por hardware (**Framer Motion**, **Three.js**) y estilos atómicos con **Tailwind CSS**.

Optimizada para despliegues serverless y CDN en **Netlify** con compilación estática (**SSG**), latencia ultrabaja y Core Web Vitals en rango óptimo.

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js (App Router) + React Server Components
- **Tipado & Esquemas:** TypeScript + Contratos SDD
- **Estilos & Diseño:** Tailwind CSS + Tokens CSS nativos + Modo Oscuro
- **Animaciones & 3D:**
  - Hero Parallax con 3 niveles de profundidad
  - Efecto de trazo tipográfico (`StrokeText`) y rotación fluida (`RotatingText`)
  - Fondo dinámico de ondas líquidas estilo PS3 (`LiquidGlassBackground`)
  - Credencial interactiva 3D con física en tiempo real (`Lanyard` Three.js)
  - Efecto tornasol cromático en Navbar sincronizado con scroll
- **Arquitectura de Secciones:**
  - `00 / CRAFTWORK & AGENTIC:` Video showcase con reproductor modal cinematográfico
  - `01 / PROYECTOS FULL-STACK:` SISU, CENTINELA y SD-UNETI con pestañas de Demo, Arquitectura y Control de IA
  - `02 / WORKFLOW IA & AGENTES:` Metodología por contratos, herramientas de código y sinergia de agentes locales con LLMs en la nube
  - `03 / STACK TECNOLÓGICO:` Matriz interactiva de habilidades con filtrado reactivo de proyectos
  - `04 / TRAYECTORIA:` Línea de tiempo profesional y académica (UNETI, DEM-TSJ, Dyaca, Forage)
  - `05 / FILOSOFÍA & CRITERIO:` Código limpio, arquitectura por capas, monolítica y hexagonal
  - `06 / CONTACTO DIRECTO:` Tarjeta de comunicación directa y credencial interactiva 3D
- **Rutas Dinámicas Pre-renderizadas (SSG):**
  - `/projects/[slug]` con `generateStaticParams()` para análisis arquitectónico profundo sin consumo serverless por petición.

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── api/
│   │   └── contact/route.ts  # Endpoint stateless para contacto
│   ├── projects/[slug]/      # Vistas técnicas estáticas por proyecto (SSG)
│   ├── globals.css           # Tokens de diseño, variables CSS y utilidades
│   ├── layout.tsx            # Root Layout (Server Component + Metadata SEO)
│   └── page.tsx              # Vista principal (Server Component ensamblando islas)
├── components/
│   ├── interactive/          # Componentes cliente ("use client" aislados)
│   ├── sections/             # Secciones estructurales del portafolio
│   └── ui/                   # Primitivas reutilizables (HeroParallax, etc.)
├── data/                     # Datos tipados en TypeScript (projects, stack, etc.)
└── lib/                      # Utilidades y funciones auxiliares
```

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (SSG)
npm run build

# Iniciar servidor de producción
npm start
```

---

## 🌐 Despliegue en Netlify

El proyecto está configurado para compilación continua y despliegue automático en Netlify mediante `netlify.toml` con `@netlify/plugin-nextjs`.
