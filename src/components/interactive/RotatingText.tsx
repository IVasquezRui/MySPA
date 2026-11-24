"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  highlightColor?: string;
  className?: string;
}

export default function RotatingText({
  texts,
  rotationInterval = 2800,
  highlightColor = "#a855f7",
  className = "",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[index];

  return (
    <span
      className={`relative inline-flex items-center overflow-hidden py-1 ${className}`}
      style={{ verticalAlign: "middle" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block font-extrabold tracking-tight px-3 py-1 rounded-xl bg-violet-950/40 border border-violet-500/30 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]"
          style={{
            color: highlightColor,
          }}
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
