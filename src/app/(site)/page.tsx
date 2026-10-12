import { Landing } from "@/components/Landing";
import { getLanding } from "@/lib/landing-store";

// El contenido se edita en /builder; al publicar se regenera esta página.
export default async function Home() {
  return <Landing data={await getLanding()} />;
}
