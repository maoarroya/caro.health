import Link from "next/link";
import { PhotoMarquee } from "@/components/PhotoMarquee";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { defaultLanding, type LandingData } from "@/lib/landing";

/** One quiet rail of the strongest frames. No headline, no grid — just the work. */
export function Band({ data = defaultLanding.band }: { data?: LandingData["band"] }) {
  return (
    <section className="py-20 lg:py-24">
      {/* The printed claim, set like the poster: centred, ruled in gold. */}
      <div className="mx-auto mb-12 max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="display text-3xl leading-snug text-espresso lg:text-4xl">
            <Rich text={data.claim} />
          </p>
        </Reveal>
        <div className="rule-gold mx-auto mt-7 max-w-xs" />
        {data.link.label && (
          <Reveal delay={0.05}>
            <Link
              href={data.link.href}
              className="mono link-underline mt-6 inline-block text-xs uppercase tracking-[0.14em] text-slate hover:text-espresso"
            >
              {data.link.label} →
            </Link>
          </Reveal>
        )}
      </div>

      {data.photos.length > 0 && (
        <PhotoMarquee
          photos={data.photos}
          uniform
          baseVelocity={1.2}
          height="h-60 lg:h-80"
        />
      )}
    </section>
  );
}
