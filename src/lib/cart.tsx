import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export type CartLine = { slug: string; size: string; colour: string; qty: number };

type Ctx = {
  lines: CartLine[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (l: Omit<CartLine, "qty">) => void;
  setQty: (i: number, qty: number) => void;
  remove: (i: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "neat-cart";

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((s, l) => s + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
}

export function addLine(lines: CartLine[], l: Omit<CartLine, "qty">): CartLine[] {
  const i = lines.findIndex((x) => x.slug === l.slug && x.size === l.size && x.colour === l.colour);
  if (i >= 0) return lines.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x));
  return [...lines, { ...l, qty: 1 }];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value: Ctx = {
    lines,
    open,
    setOpen,
    add: (l) => {
      setLines((p) => addLine(p, l));
      setOpen(true);
    },
    setQty: (i, qty) => setLines((p) => (qty <= 0 ? p.filter((_, j) => j !== i) : p.map((x, j) => (j === i ? { ...x, qty } : x)))),
    remove: (i) => setLines((p) => p.filter((_, j) => j !== i)),
    clear: () => setLines([]),
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: cartSubtotal(lines),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
