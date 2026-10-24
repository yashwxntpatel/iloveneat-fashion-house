import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { collections, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useReveals } from "@/lib/motion";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — ILOVENEAT" },
      { name: "description", content: "The Menagerie and On Trial: two collections from the house of NEAT." },
      { property: "og:title", content: "Collections — ILOVENEAT" },
      { property: "og:description", content: "The Menagerie and On Trial, from the house of NEAT." },
    ],
  }),
  component: Collections,
});

function Collections() {
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);
  return (
    <div ref={root} className="pt-32 md:pt-44">
      <h1 className="display px-5 text-[20vw] md:px-10 md:text-[12vw]" data-split>
        <span className="block overflow-hidden"><span data-line className="block">Collections</span></span>
      </h1>
      {collections.map((c, idx) => {
        const items = products.filter((p) => p.collection === c.slug);
        const flip = idx % 2 === 1;
        return (
          <section key={c.slug} className="border-t border-border px-5 py-24 md:px-10 md:py-36">
            <div className={`grid gap-10 md:grid-cols-12 md:gap-8 ${flip ? "" : ""}`}>
              <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]" data-mask>
                  <img data-parallax="6" src={c.cover} alt={c.title} className="h-[112%] w-full object-cover" />
                </div>
              </div>
              <div className={`flex flex-col justify-between md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                <div>
                  <p className="eyebrow text-muted-foreground" data-reveal>Collection</p>
                  <h2 className="display mt-4 text-6xl md:text-8xl" data-reveal>{c.title.split(" ").map((w, i) => i === 1 ? <span key={i} className="serif-it"> {w}</span> : <span key={i}>{w}</span>)}</h2>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground" data-reveal>{c.line}</p>
                </div>
                <div className="mt-10 aspect-[3/4] w-2/3 overflow-hidden" data-mask>
                  <img src={c.alt} alt="" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-8">
              {items.map((p) => <div key={p.slug} data-reveal><ProductCard p={p} /></div>)}
              <Link to="/shop" className="col-span-1 flex aspect-[4/5] items-end border border-border p-6 transition-colors hover:bg-ink hover:text-paper" data-reveal>
                <span className="serif-it text-3xl">See every piece</span>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
