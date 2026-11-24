"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, RotateCcw } from "lucide-react";

export default function HeroAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setVideoEnded(true);
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);

    // Auto-play safely
    video.play().catch(() => {
      // If autoplay policy blocks it, show the high-tech avatar directly
      setVideoEnded(true);
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  const handleReplay = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setVideoEnded(false);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <div className="relative group/avatar inline-block">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-sky-500 to-indigo-600 rounded-3xl blur-md opacity-40 group-hover/avatar:opacity-75 transition duration-500 group-hover/avatar:duration-200" />

      {/* Frame container */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/15 bg-zinc-950/90 shadow-2xl backdrop-blur-xl">
        {/* Background Image: IvanHighTech.jpg */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            videoEnded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src="/media/IvanHighTech.jpg"
            alt="Iván Vásquez — Software Developer"
            fill
            sizes="(max-width: 768px) 192px, 224px"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Video Element: Ivan-HELLO.mp4 */}
        <video
          ref={videoRef}
          src="/media/Ivan-HELLO.mp4"
          playsInline
          muted
          autoPlay
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoEnded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Subtle grid HUD overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:12px_12px]"
          aria-hidden="true"
        />

        {/* Corner tech reticles */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-violet-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-violet-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-violet-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-violet-400 pointer-events-none" />

        {/* Replay action badge */}
        {videoEnded && (
          <button
            onClick={handleReplay}
            className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-zinc-900/80 hover:bg-violet-600/80 border border-white/10 text-white/80 hover:text-white transition-all text-xs flex items-center gap-1 shadow-lg backdrop-blur-md"
            title="Repetir saludo en video"
            aria-label="Repetir saludo en video"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-[10px] font-mono pr-0.5">Video</span>
          </button>
        )}
      </div>

      {/* Online indicator badge */}
      <div className="absolute -bottom-2 -left-2 px-2.5 py-1 rounded-full bg-zinc-900/95 border border-white/10 shadow-lg flex items-center space-x-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-mono tracking-wider text-zinc-300">
          DISPONIBLE
        </span>
      </div>
    </div>
  );
}
