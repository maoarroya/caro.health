import { marquee } from "@/lib/content";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden border-y border-ink/15 bg-ink py-4 text-cream">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="display text-2xl lg:text-3xl">{item}</span>
            <span className="text-amber" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
