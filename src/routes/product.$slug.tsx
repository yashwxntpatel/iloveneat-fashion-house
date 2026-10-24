import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { gsap, useReveals } from "@/lib/motion";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Unavailable — ILOVENEAT" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — ILOVENEAT` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — ILOVENEAT` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const root = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<string | null>(null);
  const [colour, setColour] = useState(p.colours[0].name);
  const [open, setOpen] = useState<string | null>("Details");
  const [warn, setWarn] = useState(false);
  const { add } = useCart();
  useReveals(root, [slug]);

  useEffect(() => {
    setSize(null);
    setColour(p.colours[0].name);
    const ctx = gsap.context(() => {
      gsap.from("[data-pdp-in]", { y: 30, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.08, delay: 0.1 });
    }, root);
    return () => ctx.revert();
  }, [slug, p.colours]);

  const others = products.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <div ref={root} className="pt-16 md:pt-20">
      <div className="md:grid md:grid-cols-12">
        <div className="md:col-span-7">
          {p.images.map((src, i) => (
            <div key={src} className={`overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-[4/5] md:ml-[20%] md:mt-6 md:w-4/5"}`} data-mask={i ? "" : undefined}>
              <img src={src} alt={`${p.name}, view ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <aside className="px-5 py-12 md:col-span-4 md:col-start-9 md:px-0 md:pr-10">
          <div className="md:sticky md:top-32">
            <Link to="/shop" className="eyebrow link-line text-muted-foreground" data-pdp-in>Back to shop</Link>
            <h1 className="display mt-8 text-5xl md:text-6xl" data-pdp-in>{p.name}</h1>
            <p className="serif-it mt-3 text-xl text-muted-foreground" data-pdp-in>{p.line}</p>
            <p className="mt-6 text-lg tabular-nums" data-pdp-in>{formatPrice(p.price)}</p>
            <p className="mt-8 text-sm leading-relaxed" data-pdp-in>{p.description}</p>

            <div className="mt-10" data-pdp-in>
              <p className="eyebrow">Colour <span className="ml-2 text-muted-foreground normal-case tracking-normal">{colour}</span></p>
              <div className="mt-3 flex gap-3">
                {p.colours.map((c) => (
                  <button key={c.name} onClick={() => setColour(c.name)} aria-label={c.name}
                    className={`h-8 w-8 border p-1 transition ${colour === c.name ? "border-ink" : "border-transparent"}`}>
                    <span className="block h-full w-full" style={{ background: c.swatch }} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8" data-pdp-in>
              <div className="flex justify-between">
                <p className={`eyebrow ${warn && !size ? "text-heart" : ""}`}>{warn && !size ? "Please choose a size" : "Size"}</p>
                <span className="eyebrow text-muted-foreground">Size guide</span>
              </div>
              <div className="mt-3 grid grid-cols-5 border-l border-t border-border">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`border-b border-r border-border py-3 text-sm transition-colors ${size === s ? "bg-ink text-paper" : "hover:bg-secondary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-lux mt-8 w-full" data-pdp-in
              onClick={() => { if (!size) return setWarn(true); add({ slug: p.slug, size, colour }); }}>
              Add to bag
            </button>
            <p className="mt-3 text-xs text-muted-foreground" data-pdp-in>Complimentary shipping on orders over €500.</p>

            <div className="mt-10 border-t border-border" data-pdp-in>
              {[
                { h: "Details", b: <ul className="space-y-1">{p.details.map((d) => <li key={d}>{d}</li>)}</ul> },
                { h: "Delivery and returns", b: <p>Dispatched within three working days. Returns accepted within fourteen days, unworn.</p> },
                { h: "Care", b: <p>Professional dry clean only. Store on a padded hanger, away from direct light.</p> },
              ].map((s) => (
                <div key={s.h} className="border-b border-border">
                  <button onClick={() => setOpen(open === s.h ? null : s.h)} className="flex w-full justify-between py-5 text-left">
                    <span className="eyebrow">{s.h}</span><span>{open === s.h ? "−" : "+"}</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ${open === s.h ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden text-sm text-muted-foreground"><div className="pb-5">{s.b}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <section className="px-5 py-28 md:px-10">
        <h2 className="display text-6xl md:text-8xl" data-reveal>Wear it <span className="serif-it">with</span></h2>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {others.map((o) => <div key={o.slug} data-reveal><ProductCard p={o} /></div>)}
        </div>
      </section>
    </div>
  );
}
