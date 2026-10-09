import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatPrice, formatUnit } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block w-full min-w-0 rounded-[28px] border border-[#e5e7eb] bg-[#f3f4f6] p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-5"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#f3e27e] text-2xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] sm:mb-5 sm:size-14 sm:text-3xl">
        {product.image}
      </div>

      <div className="space-y-1">
        <h3 className="break-words text-lg font-semibold leading-tight text-[#1f2937] sm:text-[1.15rem]">{product.nameBn}</h3>
        <p className="text-sm text-[#6b7280]">{formatUnit(product.unit)}</p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2 border-t border-dashed border-[#d9dde3] pt-3">
        <div className="min-w-0">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.04em] text-[#6b7280]">
            আজকের দাম
          </p>
          <p className="mt-1 text-xl font-bold leading-tight text-[#111827] sm:text-[1.7rem]">
            {formatPrice(product.today)}
          </p>
        </div>

        <ChangeBadge percent={product.change.pct} />
      </div>
    </Link>
  );
}
