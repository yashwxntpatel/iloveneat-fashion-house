import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useReveals } from "@/lib/motion";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — ILOVENEAT" },
      { name: "description", content: "Shop embroidered silk dresses, patch shirts and pinstripe tailoring from NEAT." },
      { property: "og:title", content: "Shop — ILOVENEAT" },
      { property: "og:description", content: "Embroidered silk dresses, patch shirts and playful tailoring." },
    ],
  }),
  component: Shop,
});

const filters = [
  { k: "all", l: "Everything" },
  { k: "menagerie", l: "The Menagerie" },
  { k: "on-trial", l: "On Trial" },
] as const;

function Shop() {
  const root = useRef<HTMLDivElement>(null);
  const [f, setF] = useState<(typeof filters)[number]["k"]>("all");
  const list = useMemo(() => (f === "all" ? products : products.filter((p) => p.collection === f)), [f]);
  useReveals(root, [f]);

  return (
    <div ref={root} className="px-5 pb-32 pt-32 md:px-10 md:pt-44">
      <div className="grid gap-8 md:grid-cols-12">
        <h1 className="display text-[22vw] md:col-span-8 md:text-[13vw]" data-split>
          <span className="block overflow-hidden"><span data-line className="block">The <span className="serif-it">pieces</span></span></span>
        </h1>
        <p className="self-end text-sm leading-relaxed text-muted-foreground md:col-span-3 md:col-start-10" data-reveal>
          A small wardrobe, made in limited runs. When a piece is gone, it is gone.
        </p>
      </div>
      <div className="sticky top-16 z-20 -mx-5 mt-14 flex gap-6 overflow-x-auto border-y border-border bg-paper/90 px-5 py-4 backdrop-blur md:top-20 md:-mx-10 md:px-10">
        {filters.map((x) => (
          <button key={x.k} onClick={() => setF(x.k)} className={`eyebrow shrink-0 transition-opacity ${f === x.k ? "" : "opacity-40 hover:opacity-100"}`}>
            {x.l}
          </button>
        ))}
        <span className="eyebrow ml-auto shrink-0 opacity-40">{list.length} pieces</span>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-3 md:gap-x-8">
        {list.map((p, i) => (
          <div key={p.slug} data-reveal data-delay={(i % 3) * 0.1} className={i % 3 === 1 ? "md:mt-28" : ""}>
            <ProductCard p={p} eager={i < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}
