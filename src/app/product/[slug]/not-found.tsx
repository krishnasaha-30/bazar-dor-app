import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f1f6f2] px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-[#e3ebe4] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#f1f6f2] text-3xl">
          🔎
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-800">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          পণ্যটি সরানো হয়েছে অথবা ঠিকানাটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
