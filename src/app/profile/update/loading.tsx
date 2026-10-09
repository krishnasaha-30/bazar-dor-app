export default function UpdateProfileLoading() {
  return (
    <main className="min-h-[60vh] bg-base-200 px-4 py-10 sm:py-16">
      <section
        aria-label="তথ্য আপডেট ফর্ম লোড হচ্ছে"
        className="mx-auto w-full max-w-xl animate-pulse rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8"
      >
        <div className="h-8 w-56 rounded bg-base-300" />
        <div className="mt-8 h-16 rounded-lg bg-base-200" />
        <div className="mt-6 h-12 w-52 rounded-lg bg-base-300" />
      </section>
    </main>
  );
}
