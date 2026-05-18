import type { NextConfig } from "next";

const securityHeaders = [
  // Evita que la web se cargue en iframes (clickjacking)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Evita que el navegador adivine el tipo MIME (MIME sniffing)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Fuerza HTTPS durante 2 años, incluye subdominios
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Controla qué información de referrer se envía
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Deshabilita funciones del navegador no usadas
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Evita XSS en navegadores antiguos
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Content Security Policy: restringe de dónde se pueden cargar recursos
  // 'unsafe-inline' necesario para Tailwind/Framer Motion en Next.js App Router
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",   // unsafe-eval requerido por Framer Motion
      "style-src 'self' 'unsafe-inline'",                   // unsafe-inline requerido por Tailwind
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://formspree.io",
      "media-src 'none'",
      "object-src 'none'",
      "frame-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

// En GitHub Actions se inyecta NEXT_PUBLIC_BASE_PATH=/fluentIA-website
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Exportación estática para GitHub Pages
  output: "export",

  // Ruta base del repo en GitHub Pages (vacía en local/Vercel)
  basePath,

  // Necesario para que Next.js Image funcione sin servidor
  images: {
    unoptimized: true,
  },

  // Las cabeceras solo aplican cuando hay servidor (Vercel, etc.)
  // En GitHub Pages se ignoran (host estático sin server)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
