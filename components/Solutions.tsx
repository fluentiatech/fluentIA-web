"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  ShoppingCart,
  Receipt,
  CalendarCheck,
  Robot,
  Star,
  Desktop,
} from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const icons = [Desktop, Receipt, Robot, CalendarCheck, ShoppingCart, Star];
const gradients: [string, string][] = [
  ["#0891b2", "#22d3ee"],
  ["#d4145a", "#ff6b9d"],
  ["#7c3aed", "#a855f7"],
  ["#10b981", "#34d399"],
  ["#2563eb", "#60a5fa"],
  ["#f59e0b", "#fbbf24"],
];
const images = [
  "/imac-screen-mockup.png",
  "/facturas.png",
  "/iapropia.png",
  "/movilbot.png",
  "/pedidos.png",
  "/relojreseñas.png",
];

// Índice a partir del cual comienzan los servicios para empresas
const BUSINESS_START = 1;

type Phase = "above" | "stuck" | "below";

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useT();
  const s = t.solutions;
  const n = s.items.length;

  const [phase, setPhase] = useState<Phase>("above");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      if (rect.top > 0) {
        setPhase("above");
        setActiveIndex(0);
      } else if (rect.bottom <= window.innerHeight) {
        setPhase("below");
        setActiveIndex(n - 1);
      } else {
        setPhase("stuck");
        const scrolled = -rect.top;
        const total = rect.height - window.innerHeight;
        if (total > 0) {
          const progress = Math.max(0, Math.min(1, scrolled / total));
          setActiveIndex(Math.min(Math.floor(progress * n), n - 1));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [n]);

  const item = s.items[activeIndex];
  const Icon = icons[activeIndex];
  const [gradFrom, gradTo] = gradients[activeIndex];
  const img = images[activeIndex];

  const panelClass =
    phase === "stuck"
      ? "fixed top-0 left-0 right-0 h-screen z-40"
      : phase === "below"
      ? "absolute bottom-0 left-0 right-0 h-screen"
      : "absolute top-0 left-0 right-0 h-screen";

  return (
    <section id="soluciones" className="bg-[#0a1628]">

      {/* Cabecera */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
        >
          {s.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight"
        >
          {s.heading[0]}{" "}
          <span className="text-gradient-fuchsia">{s.heading[1]}</span>{" "}
          {s.heading[2]}
        </motion.h2>
      </div>

      {/* Contenedor que crea el espacio de scroll */}
      <div ref={containerRef} style={{ height: `${n * 100}vh` }} className="relative">

        {/* Panel visual */}
        <div className={`${panelClass} bg-[#0a1628] flex flex-col lg:justify-center`}>

          {/* ── Móvil: columna (texto arriba, imagen abajo) ── */}
          <div className="flex flex-col h-full lg:hidden">

            {/* Texto — mitad superior */}
            <div className="flex flex-col justify-center px-5 pt-20 pb-3 overflow-y-auto" style={{ flex: "0 0 52%" }}>
              <div className="flex gap-2 mb-6">
                {s.items.map((_, i) => (
                  <div
                    key={i}
                    className="h-[3px] rounded-full transition-all duration-500"
                    style={{
                      width: activeIndex === i ? "24px" : "6px",
                      background: activeIndex === i
                        ? `linear-gradient(90deg, ${gradients[i][0]}, ${gradients[i][1]})`
                        : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
              {activeIndex >= BUSINESS_START && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">— También para empresas —</p>
              )}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest mb-3 px-2.5 py-0.5 rounded-full" style={{ color: gradFrom, background: `${gradFrom}28` }}>
                    {item.badge}
                  </span>
                  <h3 className="text-xl font-extrabold text-white leading-snug mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">{item.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/80">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-[8px] font-black" style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Imagen — mitad inferior */}
            <div className="flex items-center justify-center px-4 pb-5" style={{ flex: "1 1 0", minHeight: 0 }}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-xl border-4 border-white shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden bg-[#0f1f40]"
                  style={{ aspectRatio: "16/9" }}
                >
                  {img ? (
                    <div className="relative w-full h-full">
                      <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${img}`} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon size={40} weight="duotone" className="text-white/20" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Desktop: grid lado a lado ── */}
          <div className="hidden lg:block max-w-7xl mx-auto px-8 w-full">
            <div className="grid grid-cols-[5fr_7fr] gap-12 items-start">

              {/* Izquierda — texto */}
              <div>
                <div className="flex gap-2 mb-10">
                  {s.items.map((_, i) => (
                    <div
                      key={i}
                      className="h-[3px] rounded-full transition-all duration-500"
                      style={{
                        width: activeIndex === i ? "28px" : "8px",
                        background: activeIndex === i
                          ? `linear-gradient(90deg, ${gradients[i][0]}, ${gradients[i][1]})`
                          : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>
                {activeIndex >= BUSINESS_START && (
                  <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">— También para empresas —</p>
                )}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1 rounded-full" style={{ color: gradFrom, background: `${gradFrom}28` }}>
                      {item.badge}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-extrabold text-white leading-snug mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-white/60 text-base leading-relaxed mb-8">{item.desc}</p>
                    <ul className="flex flex-col gap-3">
                      {item.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-black" style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Derecha — imagen */}
              <div className="flex items-center justify-center mt-16">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-2xl border-[6px] border-white shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden bg-[#0f1f40]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    {img ? (
                      <div className="relative w-full h-full">
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${img}`} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon size={56} weight="duotone" className="text-white/20" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
