import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ p, aspect = "aspect-[4/5]", eager = false }: { p: Product; aspect?: string; eager?: boolean }) {
  const alt = p.images[1] ?? p.images[0];
  return (
    <Link to="/product/$slug" params={{ slug: p.slug }} className="group block" data-card>
      <div className={`relative overflow-hidden bg-card ${aspect}`}>
        <img
          src={p.images[0]}
          alt={p.name}
          loading={eager ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.06] group-hover:opacity-0"
        />
        <img
          src={alt}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-[transform,opacity] duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-100 group-hover:opacity-100"
        />
        <span className="eyebrow absolute bottom-4 left-4 translate-y-3 bg-paper px-3 py-2 text-ink opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          View the look
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-medium tracking-tight">{p.name}</h3>
          <p className="mt-1 truncate text-xs text-muted-foreground">{p.line}</p>
        </div>
        <span className="shrink-0 text-sm tabular-nums">{formatPrice(p.price)}</span>
      </div>
    </Link>
  );
}
