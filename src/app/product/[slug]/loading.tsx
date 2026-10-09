export default function LoadingProductPage() {
  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-5 h-5 w-48 rounded bg-slate-200" />
        <div className="rounded-2xl border border-[#e3ebe4] bg-white p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="size-14 shrink-0 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-6 w-40 max-w-full rounded bg-slate-200 sm:h-7 sm:w-48" />
              <div className="h-4 w-32 max-w-full rounded bg-slate-200 sm:w-36" />
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-[#e3ebe4] bg-white p-4 sm:p-6">
          <div className="mb-4 h-6 w-40 rounded bg-slate-200" />
          <div className="grid gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-24 rounded-2xl bg-slate-100" />
            ))}
          </div>
          <div className="mt-6 h-64 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </main>
  );
}
