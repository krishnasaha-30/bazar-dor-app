export default function SignUpLoading() {
  return (
    <main className="min-h-[60vh] bg-base-200 px-4 py-10 sm:py-16">
      <section
        aria-label="সাইন আপ পেজ লোড হচ্ছে"
        className="mx-auto w-full max-w-md animate-pulse rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8"
      >
        <div className="mx-auto mb-3 h-8 w-56 rounded bg-base-300" />
        <div className="mx-auto mb-7 h-4 w-64 max-w-full rounded bg-base-200" />
        <div className="space-y-4">
          <div className="h-16 rounded-lg bg-base-200" />
          <div className="h-16 rounded-lg bg-base-200" />
          <div className="h-16 rounded-lg bg-base-200" />
          <div className="h-12 rounded-lg bg-base-300" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="h-12 rounded-lg bg-base-200" />
          <div className="h-12 rounded-lg bg-base-200" />
        </div>
      </section>
    </main>
  );
}
