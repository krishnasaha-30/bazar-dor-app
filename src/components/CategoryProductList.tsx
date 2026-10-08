"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import ProductGrid from "./ProductGrid";

type SortOrder = "default" | "price-ascending" | "price-descending";

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") return products;

    return [...products].sort((first, second) =>
      sortOrder === "price-ascending"
        ? first.today - second.today
        : second.today - first.today
    );
  }, [products, sortOrder]);

  return (
    <>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <label htmlFor="category-sort" className="text-sm font-medium text-slate-600">
          সাজান
        </label>
        <div className="relative w-full sm:w-56">
          <select
            id="category-sort"
            value={sortOrder}
            onChange={(event) => {
              const value = event.target.value;
              if (
                value === "default" ||
                value === "price-ascending" ||
                value === "price-descending"
              ) {
                setSortOrder(value);
              }
            }}
            className="w-full appearance-none rounded-xl border border-[#dce5dd] bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-ascending">দাম: কম থেকে বেশি</option>
            <option value="price-descending">দাম: বেশি থেকে কম</option>
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </div>
      </div>
      {sortedProducts.length ? (
        <ProductGrid products={sortedProducts} />
      ) : (
        <div className="rounded-2xl border border-dashed border-[#dce5dd] bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-slate-700">
            এই বিভাগে কোনো পণ্য পাওয়া যায়নি
          </p>
          <p className="mt-2 text-sm text-slate-500">
            অন্য কোনো বিভাগ থেকে পণ্য দেখুন।
          </p>
        </div>
      )}
    </>
  );
}
