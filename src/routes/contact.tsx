import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { media } from "@/lib/products";
import { useReveals } from "@/lib/motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ILOVENEAT" },
      { name: "description", content: "Write to the house of NEAT for orders, fittings and press." },
      { property: "og:title", content: "Contact — ILOVENEAT" },
      { property: "og:description", content: "Write to the house of NEAT for orders, fittings and press." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("Orders");
  useReveals(root);
  return (
    <div ref={root} className="grid min-h-screen pt-16 md:grid-cols-2 md:pt-20">
      <div className="relative hidden overflow-hidden md:block">
        <img data-parallax="6" src={media.carpet} alt="NEAT dress on a red carpet" className="absolute inset-0 h-[112%] w-full object-cover" />
      </div>
      <div className="px-5 py-20 md:px-16 md:py-28">
        <h1 className="display text-[18vw] md:text-[8vw]" data-split>
          <span className="block overflow-hidden"><span data-line className="block">Write</span></span>
          <span className="block overflow-hidden"><span data-line className="serif-it block">to us</span></span>
        </h1>
        <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground" data-reveal>
          For orders, private fittings or press, send a note. Or find us on Instagram at <a className="link-line text-ink" href="https://www.instagram.com/iloveneat.co/" target="_blank" rel="noreferrer">@iloveneat.co</a>.
        </p>
        {sent ? (
          <div className="mt-16" data-reveal>
            <p className="serif-it text-4xl">Thank you. Your note is with us.</p>
            <button onClick={() => setSent(false)} className="eyebrow link-line mt-6">Send another</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-14 max-w-lg space-y-8" data-reveal>
            <div className="flex flex-wrap gap-6">
              {["Orders", "Fittings", "Press"].map((t) => (
                <button type="button" key={t} onClick={() => setTopic(t)} className={`eyebrow ${topic === t ? "" : "opacity-40"}`}>{t}</button>
              ))}
            </div>
            <input required placeholder="Name" className="field" />
            <input required type="email" placeholder="Email" className="field" />
            <textarea required rows={4} placeholder="Your message" className="field resize-none" />
            <button className="btn-lux">Send</button>
          </form>
        )}
      </div>
    </div>
  );
}
