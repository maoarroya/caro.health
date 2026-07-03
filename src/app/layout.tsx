import type { Metadata } from "next";
import { Host_Grotesk, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

const host = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
  display: "swap",
});

const fragment = Fragment_Mono({
  variable: "--font-fragment",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://caro.health"),
  title: {
    default: "Caro · Pilates Master — Movimiento consciente",
    template: "%s · Caro Pilates",
  },
  description:
    "Caro es instructora master de Pilates. Programas y cursos online para reconectar con tu cuerpo, ganar fuerza y moverte con intención — desde donde estés.",
  keywords: [
    "pilates",
    "pilates online",
    "instructora master pilates",
    "cursos pilates",
    "movimiento consciente",
    "caro health",
  ],
  openGraph: {
    title: "Caro · Pilates Master",
    description:
      "Programas y cursos online de Pilates para moverte con fuerza e intención.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${host.variable} ${fragment.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-cream text-ink flex flex-col">
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
