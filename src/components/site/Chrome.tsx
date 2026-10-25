import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  const overHero = path === "/" && !scrolled && !menu;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);
  useEffect(() => setMenu(false), [path]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
          overHero ? "text-paper" : "border-b border-border bg-paper/90 text-ink backdrop-blur-md"
        }`}
      >
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 md:h-20 md:px-10">
          <nav className="hidden gap-8 md:flex">
            {nav.slice(0, 2).map((n) => (
              <Link key={n.to} to={n.to} className="eyebrow link-line">{n.label}</Link>
            ))}
          </nav>
          <button className="eyebrow justify-self-start md:hidden" onClick={() => setMenu((m) => !m)} aria-label="Menu">
            {menu ? "Close" : "Menu"}
          </button>
          <Link to="/" aria-label="NEAT home" className="justify-self-center">
            <img
              src={logo.url}
              alt="NEAT"
              className={`h-8 w-auto transition-[filter] duration-700 md:h-11 ${overHero ? "brightness-0 invert" : ""}`}
            />
          </Link>
          <div className="flex items-center justify-end gap-8">
            {nav.slice(2).map((n) => (
              <Link key={n.to} to={n.to} className="eyebrow link-line hidden md:inline">{n.label}</Link>
            ))}
            <button onClick={() => setOpen(true)} className="eyebrow link-line">
              Bag <span className="tabular-nums">({count})</span>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-end bg-paper px-5 pb-12 transition-[clip-path] duration-700 ease-[var(--ease-lux)] md:hidden ${
          menu ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        {[{ to: "/", label: "Home" }, ...nav].map((n) => (
          <Link key={n.to} to={n.to} className="display border-b border-border py-3 text-5xl">
            {n.label}
          </Link>
        ))}
        <a href="https://www.instagram.com/iloveneat.co/" target="_blank" rel="noreferrer" className="eyebrow mt-8">Instagram @iloveneat.co</a>
      </div>
      <CartDrawer />
    </>
  );
}

function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, subtotal } = useCart();
  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper transition-transform duration-700 ease-[var(--ease-lux)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        data-lenis-prevent
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-6">
          <span className="eyebrow">Your bag</span>
          <button onClick={() => setOpen(false)} className="eyebrow link-line">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 && (
            <div className="py-20">
              <p className="serif-it text-4xl">Nothing here, yet.</p>
              <Link to="/shop" onClick={() => setOpen(false)} className="eyebrow link-line mt-6 inline-block">Discover the pieces</Link>
            </div>
          )}
          {lines.map((l, i) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <div key={i} className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 border-b border-border py-6">
                <img src={p.images[0]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
                <div className="flex min-w-0 flex-col">
                  <div className="flex justify-between gap-3">
                    <span className="truncate text-sm font-medium">{p.name}</span>
                    <span className="shrink-0 text-sm tabular-nums">{formatPrice(p.price * l.qty)}</span>
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">{l.colour} / {l.size}</span>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4 text-sm">
                      <button onClick={() => setQty(i, l.qty - 1)} aria-label="Decrease">−</button>
                      <span className="tabular-nums">{l.qty}</span>
                      <button onClick={() => setQty(i, l.qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <button onClick={() => remove(i)} className="eyebrow link-line text-muted-foreground">Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-border px-6 py-6">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
            <p className="mt-1 text-xs text-muted-foreground">Shipping calculated at checkout.</p>
            <Link to="/checkout" onClick={() => setOpen(false)} className="btn-lux mt-5 w-full">Checkout</Link>
          </div>
        )}
      </aside>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="grid gap-12 px-5 pb-10 pt-20 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="serif-it text-4xl leading-tight md:text-5xl">No excess.<br />All thought.</p>
          <form onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("p") as HTMLElement).textContent = "Thank you. You are on the list."; }} className="mt-10 max-w-sm">
            <label className="eyebrow opacity-60">Letters from the atelier</label>
            <div className="mt-2 flex border-b border-paper/30">
              <input type="email" required placeholder="Email address" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-paper/40" />
              <button className="eyebrow">Join</button>
            </div>
            <p className="mt-3 text-xs opacity-60" />
          </form>
        </div>
        {[
          { h: "House", l: [["/story", "Our Story"], ["/collections", "Collections"], ["/contact", "Contact"]] },
          { h: "Shop", l: [["/shop", "All pieces"], ["/collections", "The Menagerie"], ["/collections", "On Trial"]] },
        ].map((c) => (
          <div key={c.h}>
            <p className="eyebrow opacity-50">{c.h}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {(c.l as [string,string][]).map(([to, label]) => <li key={label}><a href={to} className="link-line">{label}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <p className="eyebrow opacity-50">Follow</p>
          <a href="https://www.instagram.com/iloveneat.co/" target="_blank" rel="noreferrer" className="link-line mt-5 inline-block text-sm">@iloveneat.co</a>
        </div>
      </div>
      <div className="display select-none px-3 text-[27vw] text-paper/[0.07] md:text-[24vw]" aria-hidden>NEAT</div>
      <div className="flex justify-between border-t border-paper/15 px-5 py-5 text-[11px] opacity-50 md:px-10">
        <span>© 2026 ILOVENEAT</span><span>No Excess All Thought</span>
      </div>
    </footer>
  );
}
