import type { Metadata } from "next";
import { blog } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "El blog de caro.health: nutrición, Pilates, Yoga, Barre y mente. Ciencia clara y rituales para vivir en tu frecuencia más alta.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow={blog.eyebrow}
        title={
          <>
            Ideas para vivir en tu <em>frecuencia más alta</em>.
          </>
        }
        body={blog.body}
      />
      <BlogGrid />
      <FinalCta />
    </>
  );
}
