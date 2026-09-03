import { marquee } from "@/lib/content";

/** Looping ribbon of claims. Defaults to the brand marquee; pass `items` to reuse it elsewhere. */
export function Marquee({ items: source = marquee }: { items?: string[] }) {
  const items = [...source, ...source];
  return (
    <div className="relative overflow-hidden border-y border-line bg-espresso py-4 text-porcelain">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="display text-2xl lg:text-3xl">{item}</span>
            <span className="text-sand" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
