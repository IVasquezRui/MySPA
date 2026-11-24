"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroProduct } from "@/data/heroProducts";

export const HeroParallax = ({
  products,
  children,
}: {
  products: HeroProduct[];
  children?: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [18, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-600, 300]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[280vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="max-w-7xl relative mx-auto py-12 md:py-24 px-4 w-full left-0 top-0 z-20">
        {children}
      </div>

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="pointer-events-auto"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 mb-12">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-8 mb-12">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: HeroProduct;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -15,
      }}
      key={product.title}
      className="group/product h-72 w-[22rem] sm:w-[26rem] relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md bg-zinc-950/80 transition-shadow duration-300 hover:shadow-violet-500/20"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-25 group-hover/product:opacity-40 transition-opacity duration-500`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />

      {/* Futuristic Grid Reticle */}
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      <div className="relative h-full flex flex-col justify-between p-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl p-2 rounded-lg bg-white/5 border border-white/10 shadow-inner">
              {product.icon}
            </span>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-violet-300/80 block">
                {product.category}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                {product.badge}
              </span>
            </div>
          </div>
          <Link
            href={product.link}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover/product:text-white group-hover/product:bg-violet-600/40 transition-colors"
            aria-label={`Ver más sobre ${product.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white tracking-tight group-hover/product:text-violet-300 transition-colors">
            {product.title}
          </h3>
          <p className="mt-2 text-xs text-zinc-300/80 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
