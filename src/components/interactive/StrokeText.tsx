"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface StrokeTextProps {
  text: string;
  strokeColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fontSize?: number | string;
  fontWeight?: number | string;
  className?: string;
  hoverRedraw?: boolean;
}

export default function StrokeText({
  text,
  strokeColor = "#A78BFA",
  strokeWidth = 1.5,
  drawDuration = 1.6,
  fontSize = "inherit",
  fontWeight = 800,
  className = "",
  hoverRedraw = true,
}: StrokeTextProps) {
  const [key, setKey] = useState(0);

  const handleMouseEnter = () => {
    if (hoverRedraw) {
      setKey((prev) => prev + 1);
    }
  };

  return (
    <span
      className={`relative inline-block cursor-default select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{
        fontWeight,
      }}
    >
      <svg
        key={key}
        className="w-full h-auto overflow-visible block"
        viewBox="0 0 900 120"
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f3e8ff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>

        <motion.text
          x="0"
          y="85"
          fill="url(#fillGradient)"
          stroke="url(#strokeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            fontSize: "76px",
            fontFamily: "inherit",
            fontWeight: 800,
            letterSpacing: "-2px",
          }}
          initial={{
            strokeDasharray: 900,
            strokeDashoffset: 900,
            fillOpacity: 0,
          }}
          animate={{
            strokeDashoffset: 0,
            fillOpacity: 1,
          }}
          transition={{
            strokeDashoffset: {
              duration: drawDuration,
              ease: [0.16, 1, 0.3, 1],
            },
            fillOpacity: {
              duration: 0.8,
              delay: drawDuration * 0.45,
              ease: "easeOut",
            },
          }}
        >
          {text}
        </motion.text>
      </svg>
    </span>
  );
}
