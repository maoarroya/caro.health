import { FinalCta } from "@/components/sections/FinalCta";
import { getLanding } from "@/lib/landing-store";

/** El llamado final tal como quedó publicado en el builder, para las páginas interiores. */
export async function SiteCta() {
  return <FinalCta data={(await getLanding()).cta} />;
}
