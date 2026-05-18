import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "fluentIA — Identidad digital premium para figuras públicas",
  description:
    "fluentIA crea landing pages personales de alto impacto para futbolistas, actores, cantantes e influencers. Diseño premium, automatización con IA y gestión inteligente de tu presencia online.",
  keywords: ["landing page futbolistas", "web personal artistas", "identidad digital deportistas", "IA para figuras públicas", "web personal cantantes"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-[100dvh] flex flex-col bg-white text-[#0f172a]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
