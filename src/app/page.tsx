import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-icon.png";
import Hero from "@/components/Hero";
import getProducts from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/lib/api";

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


export default async function Home() {
  const products = await getProducts();
  const risers = products
    .filter((p: Product) => p.change.dir === "up")
    .sort((a: Product, b: Product) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p: Product) => p.change.dir === "down")
    .sort((a: Product, b: Product) => a.change.pct - b.change.pct)
    .slice(0, 6);
  console.log("All products from home page", products);
  return (
    <div className=" bg-base-300 pt-5 grid gap-5">
      <Hero />
      <div className="mx-auto max-w-6xl space-y-14 px-4 mt-5">
        <section>
          <h2 className="mb-5 text-2xl font-bold text-success">আজ দাম বেড়েছে ▲</h2>
          {risers.length ? (
            <ProductGrid products={risers} />
          ) : (
            <p className="text-base-content/60">আজ কোনো পণ্যের দাম বাড়েনি।</p>
          )}
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold text-error">আজ দাম কমেছে ▼</h2>
          {fallers.length ? (
            <ProductGrid products={fallers} />
          ) : (
            <p className="text-base-content/60">আজ কোনো পণ্যের দাম কমেনি।</p>
          )}
        </section>

        <section id="সব-পণ্য" className="scroll-mt-32">
          <h2 className="text-2xl font-bold">সব পণ্য</h2>
          <p className="mb-5 mt-1 text-base-content/70">
            নিত্যপ্রয়োজনীয় সব পণ্যের আজকের দাম ও দামের পরিবর্তন।
          </p>
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <p className="text-base-content/60">পণ্যের তথ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>
          )}
        </section>
      </div>
    </div>
  )
}
