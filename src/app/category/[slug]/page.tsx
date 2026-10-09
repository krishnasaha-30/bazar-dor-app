import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProductList from "@/components/CategoryProductList";
import { getCategory, getProductsByCategory } from "@/lib/api";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
              {category.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500">পণ্যের বিভাগ</p>
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {category.nameBn}
              </h1>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-green-800 transition hover:text-green-950"
          >
            ← সব পণ্য দেখুন
          </Link>
        </div>

        <section aria-label={`${category.nameBn} বিভাগের পণ্য`}>
          <CategoryProductList products={products} />
        </section>
      </div>
    </main>
  );
}
