import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import hero from "@/assets/hero.mp4.asset.json";
import { gsap, ScrollTrigger, useReveals } from "@/lib/motion";
import { media, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ILOVENEAT — No Excess All Thought" },
      { name: "description", content: "Hand embroidered silks, beaded collars and playful tailoring from the house of NEAT." },
      { property: "og:title", content: "ILOVENEAT — No Excess All Thought" },
      { property: "og:description", content: "Hand embroidered silks, beaded collars and playful tailoring from the house of NEAT." },
    ],
  }),
  component: Home,
});

const manifesto = "We make few things, slowly. Each piece carries one idea and nothing more than it needs.";

function Home() {
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", { yPercent: 110, duration: 1.6, ease: "expo.out", stagger: 0.12, delay: 0.2 });
      gsap.to("[data-hero-media]", {
        scale: 1.15, yPercent: 12, ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-type]", {
        yPercent: -40, opacity: 0, ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "70% top", scrub: true },
      });
      gsap.to("[data-word]", {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: "[data-manifesto]", start: "top 70%", end: "bottom 45%", scrub: true },
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = document.querySelector<HTMLElement>("[data-track]");
        if (!track) return;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]", start: "top top", end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1, pin: true, invalidateOnRefresh: true,
          },
        });
      });
      gsap.from("[data-card]", {
        y: 80, opacity: 0, duration: 1.4, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: "[data-grid]", start: "top 80%" },
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const look = [
    { img: media.carpet, t: "The red carpet", s: "Leopard Column Dress" },
    { img: media.sofa, t: "The salon", s: "Bengal Lounge Dress" },
    { img: media.tiger, t: "The study", s: "Tiger Patch Shirt" },
    { img: media.suitStanding, t: "The trial", s: "Kiss Pinstripe Suit" },
    { img: media.dressFlat, t: "The atelier", s: "Hand embroidery" },
  ];

  return (
    <div ref={root}>
      <section data-hero className="relative h-[100svh] overflow-hidden bg-ink text-paper">
        <div data-hero-media className="absolute inset-0">
          <video src={hero.url} autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-ink/25" />
        <div data-hero-type className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10 md:pb-10">
          <div className="mb-6 flex items-end justify-between gap-6">
            <p className="serif-it max-w-xs overflow-hidden text-xl leading-snug md:text-2xl">
              <span data-hero-line className="block">No excess.</span>
              <span data-hero-line className="block">All thought.</span>
            </p>
            <Link to="/shop" className="eyebrow link-line hidden md:inline">Enter the collection</Link>
          </div>
          <h1 className="display overflow-hidden text-[30vw] leading-[0.78] md:text-[26vw]">
            <span data-hero-line className="block">NEAT</span>
          </h1>
        </div>
      </section>

      <section data-manifesto className="px-5 py-32 md:px-10 md:py-48">
        <p className="eyebrow mb-10 text-muted-foreground">The house</p>
        <p className="max-w-6xl text-[9vw] font-medium leading-[1.02] tracking-[-0.04em] md:text-[5.4vw]">
          {manifesto.split(" ").map((w, i) => (
            <span key={i} data-word className="opacity-15">{w} </span>
          ))}
        </p>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4 md:col-start-8">
            <p className="text-sm leading-relaxed text-muted-foreground" data-reveal>
              Black satin, garnet beads, leopards in bronze thread. A suit with a sense of humour. NEAT is a quiet house with a loud heart, dressing people who would rather be remembered than noticed.
            </p>
            <Link to="/story" className="eyebrow link-line mt-6 inline-block" data-reveal>Read our story</Link>
          </div>
        </div>
      </section>

      <section data-pin className="relative overflow-hidden bg-oxblood text-paper md:h-screen">
        <div className="flex items-end justify-between px-5 pt-20 md:absolute md:inset-x-0 md:top-0 md:z-10 md:px-10 md:pt-28">
          <h2 className="display text-[15vw] md:text-[8vw]">The <span className="serif-it">Menagerie</span></h2>
          <Link to="/collections" className="eyebrow link-line hidden md:inline">View collection</Link>
        </div>
        <div data-track className="flex gap-4 overflow-x-auto px-5 py-10 md:h-full md:items-end md:gap-8 md:overflow-visible md:px-10 md:pb-14 md:pl-[38vw]">
          {look.map((l, i) => (
            <figure key={i} className={`shrink-0 ${i % 2 ? "md:mb-24" : ""}`}>
              <div className="h-[60vh] w-[72vw] overflow-hidden md:h-[58vh] md:w-[30vw]">
                <img src={l.img} alt={l.s} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-lux)] hover:scale-105" />
              </div>
              <figcaption className="mt-4 flex justify-between gap-4">
                <span className="serif-it text-2xl">{l.t}</span>
                <span className="eyebrow self-end opacity-70">{l.s}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display text-[14vw] md:text-[7vw]" data-split>
            <span className="block overflow-hidden"><span data-line className="block">Pieces</span></span>
            <span className="block overflow-hidden"><span data-line className="serif-it block">to keep</span></span>
          </h2>
          <Link to="/shop" className="btn-ghost self-start md:self-end">Shop all</Link>
        </div>
        <div data-grid className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-2 md:col-span-6"><ProductCard p={products[0]} aspect="aspect-[4/5]" /></div>
          <div className="col-span-1 md:col-span-4 md:col-start-9 md:mt-48"><ProductCard p={products[1]} aspect="aspect-[3/4]" /></div>
          <div className="col-span-1 md:col-span-3 md:col-start-2 md:-mt-10"><ProductCard p={products[3]} aspect="aspect-[3/4]" /></div>
          <div className="col-span-2 md:col-span-5 md:col-start-7 md:mt-24"><ProductCard p={products[2]} aspect="aspect-[4/5]" /></div>
        </div>
      </section>

      <section className="relative h-[110vh] overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 overflow-hidden">
          <img data-parallax="10" src={media.suitStanding} alt="Ivory pinstripe suit in a stone arch" className="h-[120%] w-full object-cover opacity-80" />
        </div>
        <div className="relative flex h-full flex-col justify-between px-5 py-24 md:px-10">
          <p className="eyebrow" data-reveal>On Trial</p>
          <div>
            <h2 className="display max-w-5xl text-[13vw] md:text-[7.5vw]" data-split>
              <span className="block overflow-hidden"><span data-line className="block">Too playful</span></span>
              <span className="block overflow-hidden"><span data-line className="block">for a <span className="serif-it">serious</span></span></span>
              <span className="block overflow-hidden"><span data-line className="block">suit?</span></span>
            </h2>
            <Link to="/product/$slug" params={{ slug: "kiss-pinstripe-suit" }} className="eyebrow link-line mt-10 inline-block" data-reveal>
              Decide for yourself
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-10 px-5 py-28 md:grid-cols-12 md:gap-8 md:px-10 md:py-40">
        <div className="md:col-span-5" data-mask>
          <div className="aspect-[4/5] overflow-hidden"><img src={media.scissors} alt="Tailoring shears on cloth" className="h-full w-full object-cover" /></div>
        </div>
        <div className="flex flex-col justify-end md:col-span-5 md:col-start-7">
          <p className="eyebrow text-muted-foreground" data-reveal>The atelier</p>
          <p className="serif-it mt-6 text-4xl leading-tight md:text-6xl" data-reveal>Every leopard is placed by hand. None of them in the same spot twice.</p>
          <div className="mt-10 max-w-xs" data-mask>
            <div className="aspect-square overflow-hidden"><img src={media.dressFlat} alt="Embroidered dress laid flat" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t border-border py-16">
        <a href="https://www.instagram.com/iloveneat.co/" target="_blank" rel="noreferrer" className="flex w-max marquee items-center gap-10">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-10">
              {[media.sofa, media.carpet, media.tiger, media.trial, media.salon, media.scissors].map((src, i) => (
                <div key={i} className="flex items-center gap-10">
                  <img src={src} alt="" className="h-40 w-32 object-cover md:h-56 md:w-44" loading="lazy" />
                  <span className="display text-6xl md:text-8xl">@iloveneat.co</span>
                </div>
              ))}
            </div>
          ))}
        </a>
      </section>
    </div>
  );
}
