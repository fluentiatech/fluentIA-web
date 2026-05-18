"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, WhatsappLogo, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const MAX_LENGTHS = { nombre: 100, email: 254, empresa: 200, mensaje: 1000 };
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

function sanitize(str: string): string {
  return str.replace(/[<>"'`]/g, "").trim();
}

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useT();
  const c = t.contact;

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", mensaje: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

  function validateForm(form: Record<string, string>): Record<string, string> {
    const errs: Record<string, string> = {};
    const nombre = sanitize(form.nombre);
    const email = sanitize(form.email);
    const mensaje = sanitize(form.mensaje);

    if (!nombre) errs.nombre = c.errNameRequired;
    else if (nombre.length > MAX_LENGTHS.nombre) errs.nombre = c.errNameMax;

    if (!email) errs.email = c.errEmailRequired;
    else if (!EMAIL_RE.test(email)) errs.email = c.errEmailInvalid;
    else if (email.length > MAX_LENGTHS.email) errs.email = c.errEmailMax;

    if (form.empresa.length > MAX_LENGTHS.empresa) errs.empresa = c.errCompanyMax;

    if (!mensaje) errs.mensaje = c.errMessageRequired;
    else if (mensaje.length > MAX_LENGTHS.mensaje) errs.mensaje = c.errMessageMax;

    return errs;
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setSendError(false);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: sanitize(form.nombre),
          email: sanitize(form.email),
          empresa: sanitize(form.empresa),
          mensaje: sanitize(form.mensaje),
        }),
      });
      if (res.ok) setSent(true);
      else setSendError(true);
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  }

  const infoCards = [
    { icon: WhatsappLogo, color: "#10b981", bg: "bg-emerald-50", label: c.whatsappLabel, value: "+34 697 947 595" },
    { icon: MapPin,       color: "#d4145a", bg: "bg-pink-50",    label: c.locationLabel, value: "España" },
  ];

  return (
    <section id="contacto" className="pt-14 pb-14 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={ref} className="max-w-2xl mb-8 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            {c.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight mb-4"
          >
            {c.heading[0]}{" "}
            <span className="text-gradient-fuchsia">{c.heading[1]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#64748b] leading-relaxed"
          >
            {c.sub}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {infoCards.map(({ icon: Icon, color, bg, label, value }) => (
              <div key={label} className="flex items-center gap-4 p-5 bg-[#f8f9fc] rounded-2xl border border-[#e8edf5]">
                <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={22} weight="duotone" style={{ color }} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-[#0f172a]">{value}</p>
                </div>
              </div>
            ))}

            {/* Promise banner */}
            <div className="noise-bg relative bg-[#0e1a3d] rounded-2xl p-6 overflow-hidden mt-2">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4145a] opacity-10 blur-3xl rounded-full pointer-events-none" />
              <p className="relative z-10 text-sm font-bold text-white mb-3">{c.whyUs}</p>
              <ul className="relative z-10 flex flex-col gap-2">
                {c.whyItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                    <CheckCircle size={13} weight="fill" className="text-[#d4145a] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl border border-[#e8edf5] shadow-xl shadow-[#1a2b5f]/5 p-5 sm:p-7 lg:p-10"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center py-12 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                  <CheckCircle size={36} weight="fill" className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a]">{c.sentTitle}</h3>
                <p className="text-sm text-[#64748b] max-w-xs leading-relaxed">{c.sentDesc}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#475569]">{c.fieldName}</label>
                    <input
                      type="text"
                      placeholder={c.fieldNamePh}
                      value={form.nombre}
                      onChange={(e) => handleChange("nombre", e.target.value)}
                      maxLength={MAX_LENGTHS.nombre}
                      className={`px-4 py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#cbd5e1] bg-[#f8f9fc] focus:outline-none focus:ring-2 transition-all ${errors.nombre ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-[#e8edf5] focus:border-[#d4145a] focus:ring-[#d4145a]/10"}`}
                    />
                    {errors.nombre && <p className="text-[11px] text-red-500">{errors.nombre}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#475569]">{c.fieldEmail}</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      maxLength={MAX_LENGTHS.email}
                      className={`px-4 py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#cbd5e1] bg-[#f8f9fc] focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-[#e8edf5] focus:border-[#d4145a] focus:ring-[#d4145a]/10"}`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#475569]">{c.fieldCompany}</label>
                  <input
                    type="text"
                    placeholder={c.fieldCompanyPh}
                    value={form.empresa}
                    onChange={(e) => handleChange("empresa", e.target.value)}
                    maxLength={MAX_LENGTHS.empresa}
                    className={`px-4 py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#cbd5e1] bg-[#f8f9fc] focus:outline-none focus:ring-2 transition-all ${errors.empresa ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-[#e8edf5] focus:border-[#d4145a] focus:ring-[#d4145a]/10"}`}
                  />
                  {errors.empresa && <p className="text-[11px] text-red-500">{errors.empresa}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#475569]">{c.fieldMessage}</label>
                  <textarea
                    rows={4}
                    placeholder={c.fieldMessagePh}
                    value={form.mensaje}
                    onChange={(e) => handleChange("mensaje", e.target.value)}
                    maxLength={MAX_LENGTHS.mensaje}
                    className={`px-4 py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#cbd5e1] bg-[#f8f9fc] focus:outline-none focus:ring-2 transition-all resize-none ${errors.mensaje ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-[#e8edf5] focus:border-[#d4145a] focus:ring-[#d4145a]/10"}`}
                  />
                  {errors.mensaje && <p className="text-[11px] text-red-500">{errors.mensaje}</p>}
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#d4145a] text-white font-semibold text-sm shadow-lg shadow-[#d4145a]/25 hover:bg-[#b01049] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando…" : c.submit}
                  {!loading && <ArrowRight size={15} weight="bold" />}
                </motion.button>
                {sendError && (
                  <p className="text-[11px] text-red-500 text-center">{c.sendError ?? "Error al enviar. Inténtalo de nuevo."}</p>
                )}
                <p className="text-[11px] text-[#94a3b8] text-center">{c.responseTime}</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
