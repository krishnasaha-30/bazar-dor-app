import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatPrice, formatUnit } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block w-[340px] rounded-[28px] border border-[#e5e7eb] bg-[#f3f4f6] p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e27e] text-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]">
        {product.image}
      </div>

      <div className="space-y-1">
        <h3 className="text-[1.15rem] font-semibold leading-tight text-[#1f2937]">{product.nameBn}</h3>
        <p className="text-sm text-[#6b7280]">{formatUnit(product.unit)}</p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-dashed border-[#d9dde3] pt-3">
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.04em] text-[#6b7280]">
            আজকের দাম
          </p>
          <p className="mt-1 text-[1.7rem] font-bold leading-none text-[#111827]">
            {formatPrice(product.today)}
          </p>
        </div>

        <ChangeBadge percent={product.change.pct} />
      </div>
    </Link>
  );
}
