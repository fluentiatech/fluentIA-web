"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Trophy,
  FilmSlate,
  MusicNote,
  DeviceMobile,
  Users,
} from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const icons = [Trophy, FilmSlate, MusicNote, DeviceMobile];
const gradients: [string, string][] = [
  ["#2563eb", "#60a5fa"],
  ["#d4145a", "#ff6b9d"],
  ["#7c3aed", "#a855f7"],
  ["#f59e0b", "#fbbf24"],
];
const emojis = ["⚽", "🎬", "🎵", "📱"];

export default function Benefits() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { t } = useT();
  const b = t.benefits;

  return (
    <section id="beneficios" className="relative py-14 md:py-24 lg:py-32 bg-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#fce7f3] to-transparent opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#e0ecff] to-transparent opacity-30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            {b.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight"
          >
            {b.heading[0]}{" "}
            <span className="text-[#94a3b8]">{b.heading[1]}</span>{" "}
            <span className="text-gradient-fuchsia">{b.heading[2]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-lg text-[#475569] leading-relaxed"
          >
            {b.sub}
          </motion.p>
        </div>

        {/* Audience cards — 2×2 grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10 md:mb-16">
          {b.items.map((item, i) => {
            const Icon = icons[i];
            const [gradFrom, gradTo] = gradients[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-2xl border border-[#e8edf5] p-7 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ boxShadow: `0 2px 20px ${gradFrom}10` }}
              >
                {/* Gradient top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${gradFrom}, ${gradTo})` }}
                />

                {/* Emoji + icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
                  >
                    <Icon size={24} weight="duotone" className="text-white" />
                  </div>
                  <span className="text-3xl">{emojis[i]}</span>
                </div>

                <h3 className="text-xl font-extrabold text-[#0f172a] mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{item.desc}</p>

                {/* Hover underline */}
                <motion.div
                  className="absolute bottom-0 left-7 right-7 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${gradFrom}, ${gradTo})` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Sección secundaria — empresas y autónomos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-16 border border-[#e8edf5] rounded-2xl px-6 py-5 bg-[#f8f9fc]"
        >
          <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-4">{b.businessLabel}</p>
          <div className="flex flex-wrap gap-2">
            {b.businessItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] px-3 py-1.5 rounded-full bg-white border border-[#e8edf5] shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4145a] shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Benefits / Mission banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="noise-bg relative bg-[#0e1a3d] rounded-3xl p-5 sm:p-8 lg:p-14 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4145a] opacity-10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-[#2563eb] opacity-10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="floating w-16 h-16 rounded-2xl bg-[#d4145a]/20 flex items-center justify-center shrink-0">
              <Users size={32} weight="duotone" className="text-[#d4145a]" />
            </div>
            <div className="flex-1">
              <p className="text-[#94a3b8] text-sm font-semibold mb-2 uppercase tracking-wide">
                {b.missionLabel}
              </p>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">
                {b.missionTitle}
              </h3>
              <p className="text-[#94a3b8] leading-relaxed max-w-xl">
                {b.missionDesc}
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:min-w-[260px]">
              {b.missionItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-[#94a3b8] leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4145a] mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
