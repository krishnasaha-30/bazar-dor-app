export default function ProfileLoading() {
  return (
    <main className="min-h-[60vh] bg-base-200 px-4 py-10 sm:py-16">
      <section
        aria-label="প্রোফাইল লোড হচ্ছে"
        className="mx-auto w-full max-w-xl animate-pulse rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8"
      >
        <div className="h-8 w-48 rounded bg-base-300" />
        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-base-200" />
            <div className="h-6 w-48 rounded bg-base-300" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-base-200" />
            <div className="h-6 w-64 max-w-full rounded bg-base-300" />
          </div>
        </div>
        <div className="mt-7 h-12 w-44 rounded-lg bg-base-300" />
      </section>
    </main>
  );
}
