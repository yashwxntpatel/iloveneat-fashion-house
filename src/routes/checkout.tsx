import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ILOVENEAT" },
      { name: "description", content: "Complete your NEAT order." },
      { property: "og:title", content: "Checkout — ILOVENEAT" },
      { property: "og:description", content: "Complete your NEAT order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const steps = ["Information", "Delivery", "Payment"];

export function shippingFor(subtotal: number, express: boolean) {
  if (express) return 35;
  return subtotal >= 500 ? 0 : 15;
}

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [express, setExpress] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const ship = shippingFor(subtotal, express);

  if (done)
    return (
      <div className="flex min-h-screen flex-col items-start justify-center px-5 md:px-10">
        <p className="eyebrow text-muted-foreground">Order {done}</p>
        <h1 className="display mt-6 text-[16vw] md:text-[9vw]">Thank <span className="serif-it">you</span></h1>
        <p className="mt-6 max-w-md text-sm text-muted-foreground">Your pieces are being prepared in the atelier. A confirmation will follow by email.</p>
        <Link to="/shop" className="btn-lux mt-10">Continue</Link>
      </div>
    );

  if (!lines.length)
    return (
      <div className="flex min-h-screen flex-col items-start justify-center px-5 md:px-10">
        <h1 className="display text-7xl md:text-9xl">Your bag is <span className="serif-it">empty</span></h1>
        <Link to="/shop" className="btn-lux mt-10">Discover the pieces</Link>
      </div>
    );

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else { setDone(`NE${Math.floor(100000 + Math.random() * 900000)}`); clear(); }
  };

  return (
    <div className="grid min-h-screen pt-16 md:grid-cols-12 md:pt-20">
      <form onSubmit={next} className="px-5 py-16 md:col-span-7 md:px-10 md:py-24">
        <div className="flex gap-6">
          {steps.map((s, i) => (
            <button type="button" key={s} onClick={() => i < step && setStep(i)} className={`eyebrow ${i === step ? "" : "opacity-35"}`}>{s}</button>
          ))}
        </div>
        <h1 className="display mt-10 text-6xl md:text-8xl">{steps[step]}</h1>
        <div className="mt-12 grid max-w-xl gap-6 md:grid-cols-2">
          {step === 0 && (<>
            <input required type="email" placeholder="Email" className="field md:col-span-2" />
            <input required placeholder="First name" className="field" />
            <input required placeholder="Last name" className="field" />
            <input required placeholder="Address" className="field md:col-span-2" />
            <input required placeholder="City" className="field" />
            <input required placeholder="Postcode" className="field" />
            <input required placeholder="Country" className="field md:col-span-2" />
          </>)}
          {step === 1 && (
            <div className="md:col-span-2">
              {[{ e: false, t: "Standard", d: "Three to five working days", p: subtotal >= 500 ? "Complimentary" : formatPrice(15) },
                { e: true, t: "Express", d: "One to two working days", p: formatPrice(35) }].map((o) => (
                <label key={o.t} className={`flex cursor-pointer items-center justify-between border p-5 transition-colors ${express === o.e ? "border-ink" : "border-border"} ${o.e ? "border-t-0" : ""}`}>
                  <span className="flex items-center gap-4">
                    <input type="radio" name="ship" checked={express === o.e} onChange={() => setExpress(o.e)} className="accent-ink" />
                    <span><span className="block text-sm font-medium">{o.t}</span><span className="text-xs text-muted-foreground">{o.d}</span></span>
                  </span>
                  <span className="text-sm">{o.p}</span>
                </label>
              ))}
            </div>
          )}
          {step === 2 && (<>
            <input required placeholder="Card number" inputMode="numeric" className="field md:col-span-2" />
            <input required placeholder="Expiry MM/YY" className="field" />
            <input required placeholder="CVC" inputMode="numeric" className="field" />
            <input required placeholder="Name on card" className="field md:col-span-2" />
            <p className="text-xs text-muted-foreground md:col-span-2">Demonstration checkout. No payment is taken.</p>
          </>)}
        </div>
        <button className="btn-lux mt-12">{step < 2 ? "Continue" : `Pay ${formatPrice(subtotal + ship)}`}</button>
      </form>
      <aside className="bg-card px-5 py-16 md:col-span-5 md:px-10 md:py-24">
        <p className="eyebrow">Summary</p>
        <div className="mt-8 space-y-6">
          {lines.map((l, i) => {
            const p = getProduct(l.slug)!;
            return (
              <div key={i} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4">
                <img src={p.images[0]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
                <div className="min-w-0"><p className="truncate text-sm">{p.name}</p><p className="text-xs text-muted-foreground">{l.colour} / {l.size} × {l.qty}</p></div>
                <span className="text-sm tabular-nums">{formatPrice(p.price * l.qty)}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-10 space-y-3 border-t border-border pt-6 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span className="tabular-nums">{ship === 0 ? "Complimentary" : formatPrice(ship)}</span></div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-medium"><span>Total</span><span className="tabular-nums">{formatPrice(subtotal + ship)}</span></div>
        </div>
      </aside>
    </div>
  );
}
