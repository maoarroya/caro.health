import type { Metadata } from "next";
import { Host_Grotesk, Fragment_Mono, Cormorant_Garamond } from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
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
    default: "caro.health — Nutrición, Pilates, Yoga, Barre & Meditación",
    template: "%s · caro.health",
  },
  description:
    "El CH Method: nutrición clínica integral fusionada con movimiento consciente. Libro, certificaciones de Pilates, clases virtuales en casa, asesorías nutricionales, conferencias, retiros wellness y blog.",
  keywords: [
    "nutrición clínica",
    "nutricionista",
    "CH Method",
    "pilates online",
    "certificación pilates",
    "conferencias wellness",
    "retiros wellness",
    "yoga",
    "barre",
    "meditación",
    "wellness de lujo",
    "caro health",
  ],
  openGraph: {
    title: "caro.health",
    description:
      "Nutrición clínica integral y movimiento consciente. La disciplina como el acto definitivo de amor propio.",
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
      className={`${host.variable} ${fragment.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-cream text-espresso flex flex-col">
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
