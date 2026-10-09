export default function LoadingCategoryPage() {
  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-7 flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-7 w-36 rounded bg-slate-200" />
          </div>
        </div>
        <div className="mb-5 flex justify-end">
          <div className="h-11 w-full rounded-xl bg-slate-200 sm:w-56" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-56 rounded-2xl bg-white" />
          ))}
        </div>
    </div>
    </main>
  );
}
