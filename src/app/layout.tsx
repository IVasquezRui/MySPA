import type { Metadata, Viewport } from "next";
import Navbar from "@/components/interactive/Navbar";
import Footer from "@/components/sections/Footer";
import BackgroundWrapper from "@/components/interactive/BackgroundWrapper";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ivanvasquez.dev"),
  title: "Iván Vásquez — Software Developer | Next.js, Python & AI Systems",
  description:
    "Portafolio profesional de Iván Vásquez (@IVasquezRui). Software Developer especializado en Next.js (App Router), FastAPI (Python), Model Context Protocol (MCP) y Ciberseguridad Defensiva.",
  keywords: [
    "Iván Vásquez",
    "Software Developer",
    "Next.js App Router",
    "FastAPI",
    "Python",
    "Model Context Protocol",
    "MCP",
    "ChromaDB",
    "RAG",
    "PostgreSQL",
    "Docker",
    "UNETI",
  ],
  authors: [{ name: "Iván Vásquez", url: "https://github.com/IVasquezRui" }],
  creator: "Iván Vásquez",
  openGraph: {
    title: "Iván Vásquez — Software Developer",
    description:
      "Arquitectura Web Robusta, Microservicios con FastAPI y Sistemas Agénticos con Model Context Protocol.",
    url: "https://github.com/IVasquezRui/MySPA",
    siteName: "Iván Vásquez Portfolio",
    images: [
      {
        url: "/media/IvanHighTech.jpg",
        width: 1200,
        height: 630,
        alt: "Iván Vásquez — Software Developer",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iván Vásquez — Software Developer",
    description:
      "Arquitectura Web Robusta & Sistemas con IA. Especialista en Next.js, FastAPI y Agentes Autónomos.",
    images: ["/media/IvanHighTech.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-[#090a0f] text-slate-100 font-sans antialiased selection:bg-violet-600 selection:text-white">
        <BackgroundWrapper />
        <Navbar />
        <main className="min-h-screen relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
