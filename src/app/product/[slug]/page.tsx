import Link from "next/link";
import { notFound } from "next/navigation";
import type { Product } from "@/lib/api";
import getProducts from "@/lib/api";
import { formatBn, formatChange, formatPrice, formatUnit } from "@/lib/bn";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function PriceSummary({
  label,
  price,
  tone,
  unit,
}: {
  label: string;
  price: number;
  tone: "green" | "red" | "neutral";
  unit: string;
}) {
  const color =
    tone === "green"
      ? "text-green-700"
      : tone === "red"
        ? "text-red-700"
        : "text-slate-800";

  return (
    <div className="rounded-2xl border border-[#e6ece7] bg-[#fbfdfb] p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${color}`}>{formatPrice(price)}</p>
      <p className="mt-1 text-xs text-slate-500">{formatUnit(unit)}</p>
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products: Product[] = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const marketPrices = product.markets.map((market) => (market.min + market.max) / 2);
  const minPrice = product.markets.length
    ? Math.min(...product.markets.map((market) => market.min))
    : product.today;
  const maxPrice = product.markets.length
    ? Math.max(...product.markets.map((market) => market.max))
    : product.today;
  const averagePrice = marketPrices.length
    ? marketPrices.reduce((total, price) => total + price, 0) / marketPrices.length
    : product.today;
  const changeTone =
    product.change.pct > 0
      ? "bg-red-100 text-red-700"
      : product.change.pct < 0
        ? "bg-green-100 text-green-700"
        : "bg-slate-100 text-slate-600";

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8 text-slate-800 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>
          <span className="mx-2">›</span>
          <span>{product.categoryNameBn}</span>
          <span className="mx-2">›</span>
          <span className="text-slate-700">{product.nameBn}</span>
        </nav>

        <section className="flex flex-col gap-5 rounded-2xl border border-[#e3ebe4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#f1f6f2] text-4xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
              <p className="mt-1 text-sm text-slate-500">
                {formatUnit(product.unit)} <span className="mx-1">·</span>{" "}
                {product.markets.length}টি বাজারের তথ্য
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="text-sm text-slate-500">
                  বিভিন্ন বাজারের আজকের দামের সারসংক্ষেপ
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-5 rounded-2xl bg-[#f3f7f3] px-5 py-3 sm:block sm:text-center">
            <div>
              <p className="text-xs text-slate-500">আজকের দাম</p>
              <p className="text-2xl font-bold">{formatBn(product.today)}</p>
              <p className="text-xs text-slate-500">{formatUnit(product.unit)}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${changeTone}`}>
              {formatChange(product.change.pct)}
            </span>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-[#e3ebe4] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <PriceSummary label="সর্বনিম্ন দাম" price={minPrice} tone="green" unit={product.unit} />
            <PriceSummary label="সর্বোচ্চ দাম" price={maxPrice} tone="red" unit={product.unit} />
            <PriceSummary label="গড় দাম" price={averagePrice} tone="neutral" unit={product.unit} />
          </div>

          <div className="mt-6">
            <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
            {product.markets.length ? (
              <div className="overflow-x-auto rounded-2xl border border-[#e4eae5]">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead className="bg-[#f5f8f5] text-slate-600">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">বাজার</th>
                      <th scope="col" className="px-4 py-3 font-semibold">বিভাগ</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">সর্বোচ্চ</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8ede9]">
                    {product.markets.map((market) => (
                      <tr key={`${market.market}-${market.division}`} className="hover:bg-[#fafcfa]">
                        <th scope="row" className="px-4 py-3 font-medium text-slate-800">
                          {market.market}
                        </th>
                        <td className="px-4 py-3 text-slate-600">{market.division}</td>
                        <td className="px-4 py-3 text-right">{formatPrice(market.min)}</td>
                        <td className="px-4 py-3 text-right">{formatPrice(market.max)}</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {formatPrice((market.min + market.max) / 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
