import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { media } from "@/lib/products";
import { gsap, useReveals } from "@/lib/motion";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — ILOVENEAT" },
      { name: "description", content: "No Excess All Thought. The story behind the house of NEAT." },
      { property: "og:title", content: "Our Story — ILOVENEAT" },
      { property: "og:description", content: "No Excess All Thought. The story behind the house of NEAT." },
    ],
  }),
  component: Story,
});

const words = [
  { l: "No", r: "Nothing added that the piece does not need." },
  { l: "Excess", r: "Limited runs, so nothing is made to be thrown away." },
  { l: "All", r: "Every stitch, bead and button considered." },
  { l: "Thought", r: "One idea per garment, held with conviction and a little wit." },
];

function Story() {
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-acr]", start: "top top", end: "+=2400", scrub: 1, pin: true } });
        gsap.utils.toArray<HTMLElement>("[data-acr-word]").forEach((el, i) => {
          tl.fromTo(el, { opacity: 0.12 }, { opacity: 1, duration: 1 }, i);
          tl.fromTo(`[data-acr-img="${i}"]`, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1 }, i);
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section className="relative h-[100svh] overflow-hidden bg-ink text-paper">
        <img data-parallax="8" src={media.salon} alt="A velvet salon lit by chandeliers" className="absolute inset-0 h-[116%] w-full object-cover opacity-70" />
        <div className="relative flex h-full flex-col justify-end px-5 pb-12 md:px-10">
          <p className="eyebrow" data-reveal>Our story</p>
          <h1 className="display mt-6 text-[17vw] md:text-[10vw]" data-split>
            <span className="block overflow-hidden"><span data-line className="block">A quiet house</span></span>
            <span className="block overflow-hidden"><span data-line className="serif-it block">with a loud heart</span></span>
          </h1>
        </div>
      </section>

      <section className="grid gap-10 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <p className="serif-it text-4xl leading-tight md:col-span-7 md:text-6xl" data-reveal>
          NEAT began with a pair of shears and a refusal to make anything ordinary.
        </p>
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:mt-32">
          <p data-reveal>Our name is a promise spelled out: No Excess, All Thought. We design few pieces and make them in small numbers, by hand where it matters most.</p>
          <p data-reveal>We are drawn to old salons, red carpets and the elegance of big cats. Our garments borrow that drama, then edit it down until only the essential gesture remains: a beaded collar, a single embroidered leopard, a kiss on a pinstripe lapel.</p>
        </div>
      </section>

      <section data-acr className="relative bg-oxblood text-paper md:h-screen">
        <div className="grid h-full gap-10 px-5 py-24 md:grid-cols-12 md:items-center md:px-10 md:py-0">
          <div className="md:col-span-6">
            {words.map((w) => (
              <div key={w.l} data-acr-word className="border-b border-paper/20 py-4 md:opacity-10">
                <p className="display text-[16vw] md:text-[7vw]">{w.l}</p>
                <p className="mt-2 max-w-sm text-sm opacity-80">{w.r}</p>
              </div>
            ))}
          </div>
          <div className="relative hidden aspect-[4/5] md:col-span-4 md:col-start-8 md:block">
            {[media.scissors, media.dressFlat, media.carpet, media.tiger].map((src, i) => (
              <img key={i} data-acr-img={i} src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 px-5 py-28 md:grid-cols-12 md:gap-8 md:px-10 md:py-40">
        <div className="md:col-span-4 md:mt-40" data-mask><div className="aspect-[3/4] overflow-hidden"><img src={media.sofa} alt="" className="h-full w-full object-cover" /></div></div>
        <div className="md:col-span-5" data-mask><div className="aspect-[4/5] overflow-hidden"><img src={media.dressStanding} alt="" className="h-full w-full object-cover" /></div></div>
        <div className="flex flex-col justify-end md:col-span-3">
          <p className="serif-it text-3xl" data-reveal>Made to be remembered, not noticed.</p>
          <Link to="/shop" className="btn-lux mt-8 self-start" data-reveal>Discover the pieces</Link>
        </div>
      </section>
    </div>
  );
}
