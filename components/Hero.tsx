"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useRef } from "react";
import { useT } from "@/lib/i18n";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const { t } = useT();
  const h = t.hero;

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative flex flex-col md:block md:min-h-[100dvh] md:flex md:items-center overflow-hidden bg-white pt-20 sm:pt-24"
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 20);
        mouseY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 20);
      }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid-light pointer-events-none" />

      {/* Aurora wash */}
      <div className="absolute inset-0 aurora-bg opacity-70 pointer-events-none" />

      {/* Background blobs */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-10 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#e8f0fe] via-[#f0f7ff] to-[#fce7f3] opacity-70 blur-3xl pointer-events-none floating-slow"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute -bottom-20 left-0 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#fdf2f8] via-[#ffe4ee] to-[#e0ecff] opacity-55 blur-3xl pointer-events-none floating"
      />

      {/* Desktop — imagen derecha full-height */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute right-0 top-0 w-1/2 h-full hidden md:block"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/inicio.png`}
          alt="fluentIA"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
      </motion.div>

      {/* Texto */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-8 md:pt-8 md:pb-20 lg:pt-12 lg:pb-28">
        <div className="grid md:grid-cols-2 items-center">
          <div className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-fluid-hero font-extrabold text-[#0f172a] leading-[1.04] tracking-tight mb-4 md:mb-6"
            >
              {h.headline[0]}{" "}
              <span className="text-gradient-fuchsia">{h.headline[1]}</span>{" "}
              {h.headline[2]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-base lg:text-[1.1rem] text-[#475569] leading-relaxed mb-6 md:mb-10"
            >
              {h.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 mb-6 md:mb-12"
            >
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary-glow inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-xl bg-[#d4145a] text-white font-semibold text-sm shadow-lg shadow-[#d4145a]/30"
              >
                {h.cta1}
                <ArrowRight size={16} weight="bold" />
              </motion.a>
              <motion.a
                href="#soluciones"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-xl border border-[#e8edf5] text-[#334155] font-semibold text-sm hover:border-[#1a2b5f] hover:text-[#1a2b5f] transition-colors bg-white"
              >
                {h.cta2}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2.5"
            >
              {h.pills.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] px-3 py-1.5 rounded-full bg-[#f8f9fc] border border-[#e8edf5]"
                >
                  <CheckCircle size={12} weight="fill" className="text-[#d4145a]" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      {/* Móvil — imagen debajo del texto */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 md:hidden w-full"
        style={{ height: "52vw", minHeight: 220, maxHeight: 360 }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/inicio.png`}
          alt="fluentIA"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Degradado superior para fusionar con el texto */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}
