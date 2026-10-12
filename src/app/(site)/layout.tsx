import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

/** El sitio público: navegación, scroll suave y footer. El builder vive fuera. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
