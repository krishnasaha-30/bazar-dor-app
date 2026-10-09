import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UserAvatar from "@/components/UserAvatar";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল | বাজার দর",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  return (
    <main className="min-h-[65vh] bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-slate-800">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-slate-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <section className="flex items-center gap-3 rounded-xl border border-[#e2e9e3] bg-white/80 p-4 sm:gap-4 sm:p-5">
          <UserAvatar
            image={session.user.image}
            name={session.user.name}
            size="large"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-semibold text-slate-800">
              {session.user.name}
            </h2>
            <p className="truncate text-sm text-slate-500">
              {session.user.email}
            </p>
          </div>
          <Link
            className="btn btn-outline btn-error btn-sm shrink-0"
            href="/profile/update"
          >
            প্রোফাইল এডিট
          </Link>
        </section>

        <UpdateProfileForm initialName={session.user.name} />
      </div>
    </main>
  );
}
