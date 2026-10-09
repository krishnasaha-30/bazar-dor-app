import Hero from "@/components/Hero";
import getProducts, { type Product } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { Suspense } from "react";

// "id": 1,
// "slug": "sorno-machi-chal",
// "nameBn": "স্বর্ণমাছি চাল",
// "category": "chal",
// "categoryNameBn": "চাল",
// "categoryIcon": "🍚",
// "unit": "kg",
// "image": "🍚",
// "today": 148,
// "yesterday": 145,
// "lastWeek": 142,
// "lastMonth": 138,
// "change": {
// "dir": "up",
// "pct": 2.1
// },


function ProductSectionsFallback() {
  return (
    <div
      className="mx-auto mt-2 w-full max-w-6xl space-y-10 px-4 sm:mt-5 sm:space-y-14"
      aria-live="polite"
    >
      <p className="text-sm text-base-content/60">পণ্যের দামের তথ্য লোড হচ্ছে...</p>
    </div>
  );
}

async function ProductSections() {
  const products = await getProducts();
  const risers = products
    .filter((p: Product) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p: Product) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  return (
    <div className="mx-auto mt-2 w-full max-w-6xl space-y-10 px-4 sm:mt-5 sm:space-y-14">
      <section>
        <h2 className="mb-4 text-xl font-bold text-success sm:mb-5 sm:text-2xl">আজ দাম বেড়েছে ▲</h2>
        {risers.length ? (
          <ProductGrid products={risers} />
        ) : (
          <p className="text-base-content/60">আজ কোনো পণ্যের দাম বাড়েনি।</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-error sm:mb-5 sm:text-2xl">আজ দাম কমেছে ▼</h2>
        {fallers.length ? (
          <ProductGrid products={fallers} />
        ) : (
          <p className="text-base-content/60">আজ কোনো পণ্যের দাম কমেনি।</p>
        )}
      </section>

      <section id="সব-পণ্য" className="scroll-mt-32">
        <h2 className="text-xl font-bold sm:text-2xl">সব পণ্য</h2>
        <p className="mb-5 mt-1 text-sm leading-6 text-base-content/70 sm:text-base">
          নিত্যপ্রয়োজনীয় সব পণ্যের আজকের দাম ও দামের পরিবর্তন।
        </p>
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-base-content/60">পণ্যের তথ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>
        )}
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <main className="grid gap-5 bg-base-300 pb-8 pt-1 sm:pb-12">
      <Hero />
      <Suspense fallback={<ProductSectionsFallback />}>
        <ProductSections />
      </Suspense>
    </main>
  );
}
