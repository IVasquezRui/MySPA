"use client";

import React, { useEffect, useRef } from "react";

/**
 * LiquidGlassBackground
 * Recreates the iconic fluid flowing ribbons / liquid glass wave aesthetic (PS3 Wave style)
 * using an optimized HTML5 Canvas 2D/WebGL ribbon renderer that smoothly reacts to time and scroll.
 */
export default function LiquidGlassBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    // Define 4 liquid glass ribbons with different frequencies, phases, and colors
    const ribbons = [
      {
        baseY: 0.35,
        speed: 0.008,
        wavelength: 0.0018,
        amplitude: 70,
        gradientStart: "rgba(168, 85, 247, 0.12)", // Violet
        gradientMid: "rgba(56, 189, 248, 0.08)",   // Sky blue
        gradientEnd: "rgba(99, 102, 241, 0.0)",
        thickness: 140,
        speedPhase: 0,
      },
      {
        baseY: 0.5,
        speed: 0.006,
        wavelength: 0.0014,
        amplitude: 90,
        gradientStart: "rgba(56, 189, 248, 0.10)", // Sky blue
        gradientMid: "rgba(139, 92, 246, 0.06)",   // Purple
        gradientEnd: "rgba(14, 165, 233, 0.0)",
        thickness: 180,
        speedPhase: 1.5,
      },
      {
        baseY: 0.65,
        speed: 0.009,
        wavelength: 0.0022,
        amplitude: 60,
        gradientStart: "rgba(99, 102, 241, 0.12)", // Indigo
        gradientMid: "rgba(236, 72, 153, 0.05)",   // Pink subtle
        gradientEnd: "rgba(168, 85, 247, 0.0)",
        thickness: 120,
        speedPhase: 3.0,
      },
      {
        baseY: 0.78,
        speed: 0.005,
        wavelength: 0.0012,
        amplitude: 100,
        gradientStart: "rgba(147, 51, 234, 0.08)", // Deep Purple
        gradientMid: "rgba(34, 211, 238, 0.07)",   // Cyan
        gradientEnd: "rgba(30, 27, 75, 0.0)",
        thickness: 200,
        speedPhase: 4.5,
      },
    ];

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Subtle scroll influence on ribbons (parallax float)
      const scrollOffset = scrollY * 0.15;

      ribbons.forEach((ribbon) => {
        const currentBaseY = (ribbon.baseY * height) - (scrollOffset % height);
        // Normalize position if off screen
        const wrappedY = ((currentBaseY % height) + height) % height;

        ctx.save();
        ctx.beginPath();

        // Top line of ribbon
        ctx.moveTo(0, wrappedY);
        for (let x = 0; x <= width; x += 15) {
          const yOffset =
            Math.sin(x * ribbon.wavelength + time * ribbon.speed + ribbon.speedPhase) *
              ribbon.amplitude +
            Math.cos(x * ribbon.wavelength * 0.6 - time * ribbon.speed * 0.8) *
              (ribbon.amplitude * 0.4);
          ctx.lineTo(x, wrappedY + yOffset);
        }

        // Bottom line of ribbon back to start
        for (let x = width; x >= 0; x -= 15) {
          const yOffset =
            Math.sin(x * ribbon.wavelength + time * ribbon.speed + ribbon.speedPhase) *
              ribbon.amplitude +
            Math.cos(x * ribbon.wavelength * 0.6 - time * ribbon.speed * 0.8) *
              (ribbon.amplitude * 0.4) +
            ribbon.thickness +
            Math.sin((x + time * 2) * 0.003) * 20;
          ctx.lineTo(x, wrappedY + yOffset);
        }

        ctx.closePath();

        // Shimmering Liquid Glass Gradient
        const grad = ctx.createLinearGradient(0, wrappedY - ribbon.amplitude, width, wrappedY + ribbon.thickness);
        grad.addColorStop(0, ribbon.gradientStart);
        grad.addColorStop(0.5, ribbon.gradientMid);
        grad.addColorStop(1, ribbon.gradientEnd);

        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "screen";
        ctx.filter = "blur(18px)";
        ctx.fill();

        // High-gloss refractive rim light on the edge
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
