"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface LanyardProps {
  cardImage?: string;
  className?: string;
}

export default function Lanyard({
  cardImage = "/media/IvanHighTech.jpg",
  className = "",
}: LanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 550;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2.5, 20);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-3, 2, 2);
    scene.add(rimLight);

    // 3. Create ID Badge Texture
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = cardImage;
    img.onload = () => {
      if (!ctx) return;
      // Draw luxury badge front
      ctx.fillStyle = "#0c0d14";
      ctx.fillRect(0, 0, 512, 768);

      // Card Header gradient
      const headerGrad = ctx.createLinearGradient(0, 0, 512, 0);
      headerGrad.addColorStop(0, "#7c3aed");
      headerGrad.addColorStop(1, "#2563eb");
      ctx.fillStyle = headerGrad;
      ctx.fillRect(0, 0, 512, 90);

      // UNETI / Developer Header text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText("UNETI · INGENIERÍA", 40, 55);

      // Clip Slot cutout indicator at top center
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.roundRect(220, 20, 72, 16, 8);
      ctx.fill();

      // Card Photo Frame
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(56, 120, 400, 360, 20);
      ctx.clip();
      ctx.drawImage(img, 56, 120, 400, 360);
      ctx.restore();

      // Holographic security badge border
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.8)";
      ctx.strokeRect(56, 120, 400, 360);

      // Info Block
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px sans-serif";
      ctx.fillText("IVÁN VÁSQUEZ", 56, 530);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 22px monospace";
      ctx.fillText("SOFTWARE DEVELOPER", 56, 568);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "16px sans-serif";
      ctx.fillText("Full-Stack · AI Systems · FastAPI · Next.js", 56, 604);

      // Barcode simulation
      ctx.fillStyle = "#ffffff";
      for (let x = 56; x < 456; x += 6) {
        const barWidth = Math.random() > 0.4 ? 4 : 2;
        ctx.fillRect(x, 650, barWidth, 40);
      }
      ctx.font = "14px monospace";
      ctx.fillStyle = "#64748b";
      ctx.fillText("VERIFIED ID // 2026-DEV-0042", 56, 715);

      texture.needsUpdate = true;
    };

    // 4. Card Mesh Geometry
    const cardGeo = new THREE.BoxGeometry(2.1, 3.2, 0.04);
    const cardMat = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;

    // Metal Clip at Top
    const clipGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16);
    const clipMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const clipMesh = new THREE.Mesh(clipGeo, clipMat);
    clipMesh.rotation.z = Math.PI / 2;
    clipMesh.position.y = 1.68;
    cardMesh.add(clipMesh);

    scene.add(cardMesh);

    // 5. Strap Ribbon (Curve connecting anchor at top to card)
    const anchorY = 3.6;
    const strapCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, anchorY, -0.2),
      new THREE.Vector3(0, (anchorY + 1.68) / 2, 0),
      new THREE.Vector3(0, 1.68, 0),
    ]);
    const strapGeo = new THREE.TubeGeometry(strapCurve, 20, 0.06, 8, false);
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.8,
    });
    const strapMesh = new THREE.Mesh(strapGeo, strapMat);
    scene.add(strapMesh);

    // 6. Physics Simulation State
    const pos = { x: 0, y: -0.2, z: 0 };
    const vel = { x: 0, y: 0, z: 0 };
    const targetPos = { x: 0, y: -0.2, z: 0 };
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cardMesh);

      if (intersects.length > 0) {
        isDragging = true;
        setIsInteractive(true);
        prevPointer = { x: e.clientX, y: e.clientY };
        renderer.domElement.setPointerCapture(e.pointerId);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = (e.clientX - prevPointer.x) * 0.012;
      const dy = -(e.clientY - prevPointer.y) * 0.012;

      pos.x += dx;
      pos.y += dy;
      vel.x = dx * 15;
      vel.y = dy * 15;

      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          renderer.domElement.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 7. Render Loop
    let time = 0;
    let animId: number;

    const animate = () => {
      time += 0.03;

      if (!isDragging) {
        // Natural gentle pendulum breeze
        const breezeX = Math.sin(time * 1.4) * 0.12;
        const breezeZ = Math.cos(time * 0.9) * 0.08;

        // Spring force towards anchor target
        const fx = (targetPos.x + breezeX - pos.x) * 0.08;
        const fy = (targetPos.y - pos.y) * 0.08;
        const fz = (targetPos.z + breezeZ - pos.z) * 0.08;

        vel.x += fx;
        vel.y += fy;
        vel.z += fz;

        // Damping (friction)
        vel.x *= 0.92;
        vel.y *= 0.92;
        vel.z *= 0.92;

        pos.x += vel.x;
        pos.y += vel.y;
        pos.z += vel.z;
      }

      cardMesh.position.set(pos.x, pos.y, pos.z);

      // Natural tilt proportional to displacement & velocity
      cardMesh.rotation.z = -pos.x * 0.45;
      cardMesh.rotation.y = pos.x * 0.35 + Math.sin(time * 0.8) * 0.05;
      cardMesh.rotation.x = -pos.z * 0.5 - 0.05;

      // Update strap points dynamically
      const strapTop = new THREE.Vector3(0, anchorY, -0.2);
      const strapMid = new THREE.Vector3(pos.x * 0.4, (anchorY + pos.y + 1.68) / 2, pos.z * 0.3);
      const strapBottom = new THREE.Vector3(pos.x, pos.y + 1.68, pos.z);

      const newCurve = new THREE.CatmullRomCurve3([strapTop, strapMid, strapBottom]);
      strapMesh.geometry.dispose();
      strapMesh.geometry = new THREE.TubeGeometry(newCurve, 20, 0.06, 8, false);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 550;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      cardGeo.dispose();
      cardMat.dispose();
      clipGeo.dispose();
      clipMat.dispose();
      strapGeo.dispose();
      strapMat.dispose();
      texture.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [cardImage]);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <div
        ref={containerRef}
        className="w-full h-[520px] sm:h-[580px] cursor-grab active:cursor-grabbing touch-none"
      />
      <div className="absolute bottom-4 flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-[11px] font-mono text-zinc-400 backdrop-blur-md pointer-events-none shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
        <span>Arrastra la credencial para interactuar</span>
      </div>
    </div>
  );
}
