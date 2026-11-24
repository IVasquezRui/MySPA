"use client";

import dynamic from "next/dynamic";

const LiquidGlassBackground = dynamic(
  () => import("./LiquidGlassBackground"),
  { ssr: false }
);

export default function BackgroundWrapper() {
  return <LiquidGlassBackground />;
}
